import React, { Component } from 'react';
// import './FilterControls.css'

class FilterControls extends Component {
  render() {
    return (
      <div className="controls">
        <div className="sources">
          <label><input type="checkbox" id="hbo" onChange={e => this.props.onSourceChange(e, this)} checked={this.props.filters.sources.hbo}/> HBO</label>
          <label><input type="checkbox" id="hulu_plus" onChange={e => this.props.onSourceChange(e, this)} checked={this.props.filters.sources.hulu_plus}/> Hulu Plus</label>
          <label><input type="checkbox" id="hulu_free" onChange={e => this.props.onSourceChange(e, this)} checked={this.props.filters.sources.hulu}/> Hulu</label>
          <label><input type="checkbox" id="amazon_prime" onChange={e => this.props.onSourceChange(e, this)} checked={this.props.filters.sources.amazon_prime}/> Amazon Prime</label>
        </div>
        <div className="scores">
          {/* <label><input type="text" id="rt" value={this.props.filters.rt} /> Minimum Rotten Tomatoes Score</label> */}
        </div>
      </div>
    )
  }
}

export default FilterControls
