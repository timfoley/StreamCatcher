import React, { Component } from 'react';
// import './Movie.css'

class Movie extends Component {

  render() {
    let movieStyle = {
      backgroundImage: `url('${this.props.movie.movie.poster_240x342}')`,
      backgroundSize: 'cover',
      width: '25vw',
      height: '35.63vw',
      color: 'white',
      boxSizing: 'border-box',
    }

    let lockedStyle = {
      backgroundImage: `url('${this.props.movie.movie.poster_240x342}')`,
      backgroundSize: 'cover',
      width: '25vw',
      height: '35.63vw',
      color: 'white',
      borderBottom: '10px solid #FF0000',
      boxSizing: 'border-box',
    }

    return (
      <div className="movie"
        title={this.props.movie.movie.title}
        style={this.props.locked ? lockedStyle : movieStyle}
        onMouseEnter={e => this.props.onSelect(e, this)}
        onClick={e => this.props.handleClick(e, this)}>
      </div>
    )
  }
}

export default Movie
