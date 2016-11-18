import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor(props) {
  super(props)
  this.state = {
    movies: [],
    offset: 0,
    filters: {
      rt: 50,
      services: [
        'hbo',
        'hulu_plus'
      ]
    }
  }
}

  getData() {
    let services = this.state.filters.services.join(',')
    let rt = this.state.filters.rt
    axios.get(`http://localhost:4000/api/${services}/${rt}`)
    .then(res => {
      console.log(res)
      this.setState({movies: res.data})
    })
  }



  render() {
    return (
      <div className="App">
        <a href="#" onClick={e => this.getData(e)}>GET DATA</a>
      </div>
    );
  }
}

export default App;
