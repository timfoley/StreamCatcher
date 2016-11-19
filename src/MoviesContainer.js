import React, { Component } from 'react';
import Movie from './Movie'

class MoviesContainer extends Component {
  moviesStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  }

  onRefreshMovies() {

  }

  render() {

    const movies = (<div className="movies"  style={this.moviesStyle}>
              {this.props.movies.map( (movie, i) => {
                return <Movie
                  key={i}
                  movie={movie}
                />
              } )}
            </div>)

    const noMovies = <p>No movies yet!</p>

    return (
      <div className="movieContainer">
        <h2>MOVIES!</h2>
        {this.props.movies[0] ? movies : noMovies}
      </div>
    )
  }
}

export default MoviesContainer
