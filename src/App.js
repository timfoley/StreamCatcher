import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import MoviesContainer from './MoviesContainer'
import update from 'immutability-helper';


class App extends Component {
  constructor(props) {
  super(props)
  this.state = {
    dataLoaded: false,
    movies: [],
    offset: 300,
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
      if (this.state.movies !== []) {
        let newState = update(this.state.movies, {$push: res.data})
        this.setState({movies: newState, dataLoaded: true})
      } else {
        this.setState({movies: res.data, dataLoaded: true})
      }
    })
  }

  handleSkippedMovies(oldMovies) {
    console.log("updating skipped movies");
    // make a copy of state
    let tmpState = Object.assign({}, this.state)

    // for each oldMovie,
    oldMovies.forEach(movie => {
      // find where it exists in state
      let index = this.state.movies.indexOf(movie)
      // create a new object based on a copy of tmpState (using https://github.com/kolodny/immutability-helper)
      // where the `skipped` property is set to true
      let newState = update(tmpState, {
        movies: {[index]: {
          skipped: {$set: true}
        }}
      })
      // set tmpState equal to this new object so we can update all the skipped movies before finally re-setting state
      tmpState = newState
    })

    // update the state 
    this.setState({movies: tmpState.movies})
    console.log("DONE UPDATING STATE");
  }

  handleRefreshMovies(oldMovies) {
    console.log("refreshing movies");
    console.log(this.state.movies);
    var tmp = this.state.movies
      .slice(this.state.movies)
      .filter(movie => {
        return movie.skipped === false
      })
    console.log(tmp.length);

    var ret = [];

    for (var i = 0; i < 5; i++) {
      var index = Math.floor(Math.random() * tmp.length);
      var removed = tmp.splice(index, 1);
      ret.push(removed[0]);
    }
    return ret;
  }

  renderMovies() {
    if (this.state.dataLoaded) {
      return  (<MoviesContainer
                movies={this.handleRefreshMovies()}
                handleRefreshMovies={this.handleRefreshMovies.bind(this)}
                handleSkippedMovies={this.handleSkippedMovies.bind(this)}
              />)
    } else { return <a href="#" onClick={e => this.getData(e)}>GET DATA</a> }
  }


  render() {
    return (
      <div className="App">
        { this.renderMovies() }
      </div>
    );
  }
}

export default App;
