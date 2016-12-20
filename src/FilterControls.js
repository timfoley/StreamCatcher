import React, { Component } from 'react';
import './FilterControls.css'

class FilterControls extends Component {
  render() {

    return (
      <div className="controls">
        <h2>Sources: </h2>
        <div className="sources control">
          {/* REFACTOR to dynamically populate from sources in state */}
          <label><input type="checkbox" className="control__input" id="hbo" onChange={e => this.props.onSourceChange(e, this)} checked={this.props.filters.sources.hbo}/> HBO</label>
          <label><input type="checkbox" className="control__input" id="hulu_plus" onChange={e => this.props.onSourceChange(e, this)} checked={this.props.filters.sources.hulu_plus}/> Hulu Plus</label>
          <label><input type="checkbox" className="control__input" id="amazon_prime" onChange={e => this.props.onSourceChange(e, this)} checked={this.props.filters.sources.amazon_prime}/> Amazon Prime</label>
          {/* <label><input type="checkbox" className="control__input" id="youtube" onChange={e => this.props.onSourceChange(e, this)} checked={this.props.filters.sources.youtube}/> YouTube</label> */}
        </div>
        <h2>Min. Rotten Tomatoes Score:</h2>
        <div className="scores">
          {/* <label>Minimum Rotten Tomatoes Score: <input className="input" required type="number" min="0" max="95" step="5" id="rt" value={this.props.filters.rt} onChange={e => this.props.onScoreChange(e, this)}/></label> */}
          <label><input className="input" required type="range" min="0" max="95" step="5" id="rt" value={this.props.filters.rt} onChange={e => this.props.onScoreChange(e, this)}/><input className="input" required type="number" min="0" max="95" step="5" id="rt" value={this.props.filters.rt} onChange={e => this.props.onScoreChange(e, this)}/></label>
        </div>
      </div>
    )
  }
}

export default FilterControls
