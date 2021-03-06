import React, { Component } from 'react';
import './MovieDetails.css'

class MovieDetails extends Component {

  showLinks() {
    if (this.props.movie.links) {
      return this.props.movie.links.map( link => {
        return <p><a href={link.link} className={`${link.source} button`} target="_blank">Stream on {link.display_name}</a></p>
      })
    } else {
      return <p><a href='#' className="button" onClick={e => this.props.onGetStreamingLinks(e, this)}>Click for streaming links</a></p>
    }
  }

  showConsensus() {
    if (this.props.movie.omdbInfo.tomatoConsensus === "N/A") {
      return;
    } else {
      return <p className="rt-consensus"><strong>RT Consensus:</strong> {this.props.movie.omdbInfo.tomatoConsensus}</p>
    }
  }

  render() {
    return (
      <div className="movie-details">
        <h1>{this.props.movie.movie.title} ({this.props.movie.movie.release_year})</h1>
        <p className="actors">{this.props.movie.omdbInfo.Actors}</p>
        <p>{this.props.movie.omdbInfo.Plot}</p>
        <p className="rt-score"><strong>RT Score:</strong> <a className="button" href={this.props.movie.omdbInfo.tomatoURL} target="_blank">{this.props.movie.omdbInfo.tomatoMeter}</a></p>
        {this.showConsensus()}
        <h2>Ready to Watch?</h2>
        {this.showLinks()}
      </div>
    )
  }
}

export default MovieDetails
