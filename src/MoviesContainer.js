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
    }
  }

  moviesStyle = {
    display: 'flex',
  }

  // when refresh is clicked
  // mark all unlocked movies as skipped: true
  // get a new batch of movies (skipped: false) numbering 5 - lockedMovies


  onRefresh(e) {
    e.preventDefault()

    let newBatch = this.props.handleRefreshMovies().map((movie, i) => {
      if (this.state.movies[i].locked) {
        return this.state.movies[i]
      } else {
        return movie
      }
    })

    this.setState({movies: newBatch, selectedMovie: null}, _ => {
      this.props.handleSkippedMovies(this.state.movies)
      // this.props.handleSkippedMovies(oldBatch)
    })
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
    this.setState({selectedMovie: component.props.movie})
  }

  getOneMovie(id) {
    return axios.get(`http://localhost:4000/api/movie/${id}`)
      .then(res => {
        return res.data
      })
  }


  handleGetStreamingLinks(movie) {
    this.getOneMovie(movie.props.movie.movie.id)
      .then(res => {
        this.setState({
          selectedMovie: update(this.state.selectedMovie, {moreInfo: {$set: res}})
        })
      })
  }


  render() {
    let movieDetails = <MovieDetails movie={this.state.selectedMovie} onGetStreamingLinks={this.handleGetStreamingLinks.bind(this)}/>
    let noMovie = <p>Hover over a movie for more info!</p>

    return (

      <div className="movieContainer">
        <h2>MOVIES!</h2>
        <a href='#' onClick={e => this.onRefresh(e)}>refresh</a>
        <br />
        <div className="movies"  style={this.moviesStyle}>
          {this.state.movies.map( (movie, i) => {
            return <Movie
              key={i}
              movie={movie}
              locked={movie.locked}
              handleClick={this.toggleLock.bind(this)}
              onSelect={this.handleSelect.bind(this)}
            />
          } )}
        </div>
        {this.state.selectedMovie ? movieDetails : noMovie}
      </div>
    )
  }
}

export default MoviesContainer
