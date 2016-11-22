import React, { Component } from 'react';
import Movie from './Movie'


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
    // handleRefreshMovies returns a new set of movies,
    // as well as updates the original pool to keep track of skipped/locked movies
    this.props.handleSkippedMovies(this.state.movies)
    this.setState({movies: this.props.handleRefreshMovies()})
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
