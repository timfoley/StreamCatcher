import React, { Component } from 'react';
import Movie from './Movie'
import update from 'immutability-helper';
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

    let oldBatch = Object.assign({}, this.state.movies)

    let newBatch = this.props.handleRefreshMovies().map((movie, i) => {
      if (this.state.movies[i].locked) {
        return this.state.movies[i]
      } else {
        return movie
      }
    })

    this.setState({movies: newBatch}, _ => {
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

  render() {

    return (
      <div className="movieContainer">
        <h2>MOVIES!</h2>
        <div className="movies"  style={this.moviesStyle}>
          {this.state.movies.map( (movie, i) => {
            return <Movie
              key={i}
              movie={movie}
              locked={movie.locked}
              handleClick={this.toggleLock.bind(this)}
            />
          } )}
        </div>
        <a href='#' onClick={e => this.onRefresh(e)}>refresh</a>
        <br />
      </div>
    )
  }
}

export default MoviesContainer
