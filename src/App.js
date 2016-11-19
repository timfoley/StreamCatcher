import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import MoviesContainer from './MoviesContainer'

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

  getOneMovie(id) {
    axios.get(`http://localhost:4000/api/movie/${id}`)
      .then(res => {
        console.log(res.data);
        return res.data
      })
  }

  getData() {
    let services = this.state.filters.services.join(',')
    let rt = this.state.filters.rt
    let offset = this.state.offset
    axios.get(`http://localhost:4000/api/${services}/${rt}/${offset}`)
    .then(res => {
      console.log(res)
      this.setState({movies: res.data})
    })
  }

  handleRefreshMovies() {
    var tmp = this.state.movies.slice(this.state.movies);
    var ret = [];

    for (var i = 0; i < 5; i++) {
      var index = Math.floor(Math.random() * tmp.length);
      var removed = tmp.splice(index, 1);
      ret.push(removed[0]);
    }
    console.log(ret);
    return ret;
  }


  render() {
    return (
      <div className="App">
        <a href="#" onClick={e => this.getData(e)}>GET DATA</a>
        <MoviesContainer movies={this.handleRefreshMovies()} />
      </div>
    );
  }
}

export default App;
