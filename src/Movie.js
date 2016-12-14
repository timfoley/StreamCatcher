import React, { Component } from 'react';
// import './Movie.css'

class Movie extends Component {

  render() {

    // definitely going to refactor this into separate CSS file or something...
    let movieStyle = {
      backgroundImage: `url('${this.props.movie.movie.poster_240x342}')`,
      backgroundSize: 'cover',
      cursor: 'pointer',
      width: '25vw',
      height: '35.63vw',
      color: 'white',
      boxSizing: 'border-box',
    }

    let lockedStyle = {
      backgroundImage: `url('${this.props.movie.movie.poster_240x342}')`,
      backgroundSize: 'cover',
      cursor: 'pointer',
      width: '25vw',
      height: '35.63vw',
      color: 'white',
      borderBottom: '15px solid #FF0000',
      boxSizing: 'border-box',
    }

    return (
      <div className="movie"
        // title={this.props.movie.movie.title} //this is actually kinda annoying!
        style={this.props.locked ? lockedStyle : movieStyle}
        onMouseEnter={e => this.props.onSelect(e, this)}
        onClick={e => this.props.handleClick(e, this)}>
      </div>
    )
  }
}

export default Movie
