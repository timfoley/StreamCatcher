import React, { Component } from 'react';
// import './Movie.css'

class Movie extends Component {

  render() {
    let movieStyle = {
      backgroundImage: `url('${this.props.movie.movie.poster_240x342}')`,
      backgroundSize: 'cover',
      width: '20vw',
      height: '28.5vw',
      color: 'white',
    }

    return (
      <div className="movie" style={movieStyle}>
      </div>
    )
  }
}

export default Movie
