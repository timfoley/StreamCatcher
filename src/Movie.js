import React, { Component } from 'react';
// import './Movie.css'

class Movie extends Component {
  movieStyle = {
    backgroundImage: `url('${this.props.movie.movie.poster_240x342}')`,
    backgroundSize: 'cover',
    width: '20vw',
    height: '28.5vw',
  }

  render() {
    return (
      <div className="movie" style={this.movieStyle}>
        {/* <h2>{this.props.movie.movie.title}</h2> */}
        {/* <img src={this.props.movie.movie.poster_240x342} /> */}
      </div>
    )
  }
}

export default Movie
