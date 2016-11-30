import React, { Component } from 'react';
import './MovieDetails.css'

class MovieDetails extends Component {
  render() {
    let streamingLinks = <p>this is where the links would appear!</p>
    let clickForLinks = <a href='#' onClick={e => this.props.onGetStreamingLinks(this)}>Get streaming links</a>

    return (
      <div className="movie-details">
        <h1>{this.props.movie.movie.title} ({this.props.movie.movie.release_year})</h1>
        <p className="actors">{this.props.movie.omdbInfo.Actors}</p>
        <p>{this.props.movie.omdbInfo.Plot}</p>
        <p className="rt-score"><strong>RT Score:</strong> <a href={this.props.movie.omdbInfo.tomatoURL}>{this.props.movie.omdbInfo.tomatoMeter}</a></p>
        <p className="rt-consensus"><strong>RT Consensus:</strong> {this.props.movie.omdbInfo.tomatoConsensus}</p>
        {this.props.movie.moreInfo ? streamingLinks : clickForLinks}
      </div>
    )
  }
}

export default MovieDetails
