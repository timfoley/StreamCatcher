import React, { Component } from 'react';
import Movie from './Movie'
import MovieDetails from './MovieDetails'
import update from 'immutability-helper';
import axios from 'axios'
import './MoviesContainer.css';



class MoviesContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: this.props.movies,
      selectedMovie: null,
    }
  }

  moviesStyle = {
    display: 'flex',
  }

  // when refresh is clicked
  // mark all unlocked movies as skipped: true
  // get a new batch of movies (skipped: false) numbering 5 - lockedMovies


  onRefresh(e) {
    if (e) e.preventDefault()


    let newBatch = this.props.handleRefreshMovies().map((movie, i) => {
      if (this.state.movies[i].locked) {
        return this.state.movies[i] // keep locked movies right where they are
      } else {
        return movie
      }
    })

    this.setState({movies: newBatch, selectedMovie: null}, _ => {
      this.props.handleSkippedMovies(this.state.movies)
      this.pressingSpace = false // do I still need this? Check and refactor!
    })
  }

  handleClick(e, component) {
    if (this.props.os === "unknown") {
      // if it's not Windows, iOS, or Android, just toggle the lock status
      this.toggleLock(e, component)
    } else if (this.state.selectedMovie === null) {
      //if there is no selected movie, select it
      this.handleSelect(e, component)
    } else if (this.state.selectedMovie.title === component.props.movie.title) {
      // if it's already been selected, then lock it
      this.toggleLock(e, component)
    } else {
      // otherwise, select it
      this.handleSelect(e, component)
    }
  }

  toggleLock(e, component) {
    let index = this.state.movies.findIndex(movie => movie === component.props.movie)
    if (component.props.movie.locked) {
      //then unlock
      this.setState({
        movies: update(this.state.movies, {[index]: {locked: {$set: false}}})
      })
    } else {
      //lock it
      this.setState({
        movies: update(this.state.movies, {[index]: {locked: {$set: true}}})
      })
    }
  }

  handleSelect(e, component) {
    // ignore mousenter events on mobile devices
    if (e.type === "mouseenter" && this.props.os !== "unknown") {
      return
    }
    this.setState({selectedMovie: component.props.movie})
  }

  sourceMap = {
    hulu_plus: 'subscription',
    hbo: 'tv_everywhere',
    hbo_now: 'subscription',
    amazon_prime: 'subscription',
    hulu_free: 'free',
    youtube: 'free',
  }

  processStreamingLinks(movie) {
    // let sources = Object.keys(this.state.filters.sources).filter(source => this.state.filters.sources[source]).join(',')

    let processedLinks = Object.keys(this.props.filters.sources).filter(source => this.props.filters.sources[source]).reduce( (memo, source) => {
      // only worry about web sources for now. Later, we can check if they're on a mobile OS and serve that link
      let longName = `${this.sourceMap[source]}_web_sources`
      let sourceObject = movie[longName].find(service => service.source === source)
      if (sourceObject) { memo.push(sourceObject) }
      return memo
    }, [])
    return processedLinks
  }

  getOneMovie(id) {
    // return axios.get(`http://localhost:4000/api/movie/${id}`)
    return axios.get(`https://streampick-server-lxscczopcp.now.sh/api/movie/${id}`)
      .then(res => {
        return res.data
      })
  }


  handleGetStreamingLinks(e, movie) {
    e.preventDefault()
    let index = this.state.movies.findIndex(mov => mov.title === movie.props.movie.title)
    this.getOneMovie(movie.props.movie.movie.id)
      .then(res => {
        let streamingLinks = this.processStreamingLinks(res)
        this.setState({
          movies: update(this.state.movies, {[index]: {moreInfo: {$set: res}, links: {$set: streamingLinks}}}),
          selectedMovie: update(this.state.selectedMovie, {moreInfo: {$set: res}, links: {$set: streamingLinks}}, _ => {
            // console.log(this.state.selectedMovie);
          })
        })
      })
  }

  pressingSpace = false
  handleSpacebar(e) {
    if (e.key === ' ' && !this.pressingSpace) {
      this.pressingSpace = true
      this.onRefresh()
    }
  }


  render() {
    let movieDetails = <MovieDetails movie={this.state.selectedMovie} onGetStreamingLinks={this.handleGetStreamingLinks.bind(this)} filters={this.props.filters}/>
    let noMovie = <p className="hover-sign"><strong>Hover over a movie for more info!</strong></p>

    return (

      <div className="movieContainer">
        <div className="movies"  style={this.moviesStyle}>
          {this.state.movies.map( (movie, i) => {
            return <Movie
              key={i}
              movie={movie}
              locked={movie.locked}
              handleClick={this.handleClick.bind(this)}
              onSelect={this.handleSelect.bind(this)}
            />
          } )}
        </div>
        <p><a href='#' className="refresh-button button" onClick={e => this.onRefresh(e)}>more movies!</a></p>
        {this.state.selectedMovie ? movieDetails : noMovie}
      </div>
    )
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleSpacebar.bind(this))
  }
}

export default MoviesContainer
