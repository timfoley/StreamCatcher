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

    let lockedStyle = {
      backgroundImage: `url('${this.props.movie.movie.poster_240x342}')`,
      backgroundSize: 'cover',
      width: '20vw',
      height: '28.5vw',
      color: 'white',
      outline: '2px solid red',
    }

    return (
      <div className="movie" style={this.props.locked ? lockedStyle : movieStyle} onClick={e => this.props.handleClick(e, this)}>
      </div>
    )
  }
}

export default Movie
