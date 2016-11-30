import React, { Component } from 'react';
import './MovieDetails.css'

class MovieDetails extends Component {


  showLinks() {
    if (this.props.movie.links) {
      return this.props.movie.links.map( link => {
        return <p><a href={link.link} className={link.source}>{link.display_name}</a></p>
      })
    } else {
      return <a href='#' onClick={e => this.props.onGetStreamingLinks(this)}>Ready to watch? Click for streaming links</a>
    }
  }

  render() {
    // let streamingLinks = ({this.props.movie.links.map(link => {
    //   return <span className={link.source}>{link.display_name}</span>
    // })})
    // let clickForLinks = <a href='#' onClick={e => this.props.onGetStreamingLinks(this)}>Get streaming links</a>

    return (
      <div className="movie-details">
        <h1>{this.props.movie.movie.title} ({this.props.movie.movie.release_year})</h1>
        <p className="actors">{this.props.movie.omdbInfo.Actors}</p>
        <p>{this.props.movie.omdbInfo.Plot}</p>
        <p className="rt-score"><strong>RT Score:</strong> <a href={this.props.movie.omdbInfo.tomatoURL}>{this.props.movie.omdbInfo.tomatoMeter}</a></p>
        <p className="rt-consensus"><strong>RT Consensus:</strong> {this.props.movie.omdbInfo.tomatoConsensus}</p>
        {this.showLinks()}
      </div>
    )
  }
}

export default MovieDetails
