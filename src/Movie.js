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
      boxSizing: 'border-box',
    }

    let lockedStyle = {
      backgroundImage: `url('${this.props.movie.movie.poster_240x342}')`,
      backgroundSize: 'cover',
      width: '20vw',
      height: '28.5vw',
      color: 'white',
      border: '3px dashed tomato',
      boxSizing: 'border-box',
    }

    return (
      <div className="movie"
        style={this.props.locked ? lockedStyle : movieStyle}
        onMouseEnter={e => this.props.onSelect(e, this)}
        onClick={e => this.props.handleClick(e, this)}>
      </div>
    )
  }
}

export default Movie
