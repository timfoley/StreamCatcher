import React, { Component } from 'react';
// import './FilterControls.css'

class FilterControls extends Component {
  render() {
    return (
      <div className="controls">
        <div className="sources">
          <label><input type="checkbox" id="hbo" value="hbo" /> HBO</label>
          <label><input type="checkbox" id="hulu_plus" value="hulu_plus" /> Hulu Plus</label>
          <label><input type="checkbox" id="hulu" value="hulu" /> Hulu</label>
          <label><input type="checkbox" id="amazon_prime" value="amazon_prime" /> Amazon Prime</label>
        </div>
        <div className="scores">
          <label><input type="text" id="rt" value="" /> Minimum Rotten Tomatoes Score</label>
        </div>
      </div>
    )
  }
}

export default FilterControls
