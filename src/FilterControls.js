import React, { Component } from 'react';
import './FilterControls.css'

class FilterControls extends Component {
  render() {
    let rtFormStyle = {
      width: '2em',
    }

    return (
      <div className="controls">
        <div className="sources control">
          <label><input type="checkbox" className="control__input" id="hbo" onChange={e => this.props.onSourceChange(e, this)} checked={this.props.filters.sources.hbo}/> HBO</label>
          <label><input type="checkbox" className="control__input" id="hulu_plus" onChange={e => this.props.onSourceChange(e, this)} checked={this.props.filters.sources.hulu_plus}/> Hulu Plus</label>
          <label><input type="checkbox" className="control__input" id="amazon_prime" onChange={e => this.props.onSourceChange(e, this)} checked={this.props.filters.sources.amazon_prime}/> Amazon Prime</label>
        </div>
        <div className="scores">
          <label>Minimum Rotten Tomatoes Score: <input className="input" style={rtFormStyle} type="text" id="rt" value={this.props.filters.rt} onChange={e => this.props.onScoreChange(e, this)}/></label>
        </div>
      </div>
    )
  }
}

export default FilterControls
