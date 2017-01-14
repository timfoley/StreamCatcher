import React, { Component } from 'react';
// import './Movie.css'
import Radium from 'radium';

class Movie extends Component {
  movieStyles = {
    base: {
      cursor: 'pointer',
      width: '25%',
      height: 'auto',
      color: 'white',
      boxSizing: 'border-box',
      position: 'relative',
      ':hover': {}
    },

    icon: {
      position: 'absolute',
      left: '40%',
      top: '70%',
      color: '#FF0000'
    },

    hidden: {
      display: 'none',
    },

    image: {
      width: '100%',
    }

  }

  displayIcon(){
    if (this.props.locked) {
      return   (<i className="fa fa-lock fa-3x" aria-hidden="true" style={[
          this.movieStyles.icon,
        ]}></i>)
    } else if (Radium.getState(this.state, this.key, ':hover')) {
      return (
        <i className="fa fa-unlock-alt fa-3x" aria-hidden="true" style={[this.movieStyles.icon]}></i>
      )
    }
  }

  render() {

    return (
      <div className="movie"
        // title={this.props.movie.movie.title} //this is actually kinda annoying!
        style={this.movieStyles.base}
        onMouseEnter={e => this.props.onSelect(e, this)}
        onClick={e => this.props.handleClick(e, this)}>
        <img src={this.props.movie.movie.poster_240x342} style={this.movieStyles.image}></img>
        {this.displayIcon()}
      </div>
    )
  }
}

export default Radium(Movie)
