import React, { Component } from 'react';
import './MovieDetails.css'

class MovieDetails extends Component {

  render() {
    return (
      <div className="movie-details">
        <h1>{this.props.movie.movie.title} ({this.props.movie.movie.release_year})</h1>
        <p className="actors">{this.props.movie.omdbInfo.Actors}</p>
        <p>{this.props.movie.omdbInfo.Plot}</p>
        <p className="rt-score"><strong>RT Score:</strong> <a href={this.props.movie.omdbInfo.tomatoURL}>{this.props.movie.omdbInfo.tomatoMeter}</a></p>
        <p className="rt-consensus"><strong>RT Consensus:</strong> {this.props.movie.omdbInfo.tomatoConsensus}</p>
      </div>
    )
  }
}

export default MovieDetails
