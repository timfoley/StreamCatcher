import React, { Component } from 'react';
import Movie from './Movie'

class MoviesContainer extends Component {
  moviesStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  }



  render() {
    return (
      <div className="movieContainer">
        <h2>MOVIES!</h2>
        <div className="movies"  style={this.moviesStyle}>
          {this.props.movies.map( (movie, i) => {
            return <Movie
              key={i}
              movie={movie}
            />
          } )}
        </div>
      </div>
    )
  }
}

export default MoviesContainer


// {this.state.results.map( (movie, i) => {
//   return <div className="movie" key={i}>
//     <h2>{movie.Title}</h2>
//     <img src={movie.Poster} />
//   </div>
// } )}
