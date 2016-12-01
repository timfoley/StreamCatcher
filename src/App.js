import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import MoviesContainer from './MoviesContainer'
import FilterControls from './FilterControls'
import update from 'immutability-helper';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      batchSize: 100,
      searching: false,
      dataLoaded: false,
      movies: [],
      offsets: [0, 1, 2, 3],
      reloadCount: 0,
      filters: {
        rt: 75,
        sources: {
          hbo: false,
          hulu_plus: false,
          amazon_prime: false,
          hulu_free: false,
        }
      }
    }
  }

  getData() {
    this.setState({searching: true, reloadCount: this.state.reloadCount + 1}, _ => {
      let sources = Object.keys(this.state.filters.sources).filter(source => this.state.filters.sources[source]).join(',')
      let rt = parseInt(this.state.filters.rt, 10)
      let offsets = this.state.dataLoaded ? this.state.offsets : this.shuffle(this.state.offsets) // only shuffle offsets if it's the first time
      let reloadCount = this.state.reloadCount
      let batchSize = this.state.batchSize
      axios.get(`https://streampick-server-lxscczopcp.now.sh/api?sources=${sources}&rt=${rt}&offset=${offsets[reloadCount - 1] * batchSize}&batch=${batchSize}`)
      .then(res => {
        console.log(res);
        if (this.state.dataLoaded) {
          if (res.data.movies.length < 1) {
            console.log(`only ${res.data.movies.length} more movies added to State. Requesting more!`);
            this.getData()
          } else {
            console.log(`${res.data.movies.length} more movies added to State.`);
            let newState = update(this.state.movies, {$push: res.data.movies})
            this.setState({searching: false, movies: newState, dataLoaded: true, numMovies: res.data.total_results})
          }
        } else { // if this is the first time getting data
          let outerRange = parseInt((res.data.total_results/100), 10)
          let offsets = this.shuffle([...Array(outerRange).keys()].slice(1))
          this.setState({searching: false, movies: res.data.movies, numMovies: res.data.total_results, offsets: offsets})
          this.setState({firstFive: this.handleRefreshMovies(), dataLoaded: true}, _ => {
            this.handleSkippedMovies(this.state.firstFive);
          })
          this.getData()
        }
      })
    })
  }


  handleSkippedMovies(oldMovies) {
    let tmpState = Object.assign({}, this.state)

    oldMovies.forEach(movie => {
      // find where it exists in state
      let index = this.state.movies.findIndex(mov => mov.title === movie.title)
      // create a new object based on a copy of tmpState (using https://github.com/kolodny/immutability-helper)
      // where the `skipped` property is set to true
      let newState = update(tmpState, {
        movies: {[index]: {
          skipped: {$set: movie.skipped + 1}
        }}
      })
      // set tmpState equal to this new object so we can update all the skipped movies before finally re-setting state
      tmpState = newState
    })

    this.setState({movies: tmpState.movies}, _ => {
      let validMovies = this.getValidMovies().length
      console.log(`DONE UPDATING STATE: ${validMovies}`);
      if (validMovies < 100) {
        console.log("NEED MORE MOVIES!");
        this.getData();
      }
    })
  }

  handleRefreshMovies() {
    console.log("returning random movies");
    var tmp = this.getValidMovies()
    var ret = [];
    for (var i = 0; i < 4; i++) {
      var index = Math.floor(Math.random() * tmp.length);
      var removed = tmp.splice(index, 1);
      ret.push(removed[0]);
    }
    // console.log(`Remaining valid movies: ${this.getValidMovies().length}`);
    return ret;
  }

  getValidMovies() {
    let validMovies = this.state.movies.filter(movie => {
        return movie.skipped === 0
      })

    if (validMovies.length < 5) {
      console.log("all movies have been seen once");
      validMovies = this.state.movies.filter( movie => {
        return movie.skipped < 2
      })
    }
    return validMovies
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  handleSourceChange(e, component) {
    this.setState({
      filters: update(this.state.filters, {sources: {[e.target.id]: {$set: e.target.checked}}})
    })
  }

  handleScoreChange(e, component) {
    this.setState({
      filters: update(this.state.filters, {rt: {$set: e.target.value}})
    })
  }

  renderMovies() {
    let findMovies = <a href="#" onClick={e => this.getData(e)}>GET DATA</a>

    if (this.state.dataLoaded) {
      return  (<MoviesContainer
                movies={this.state.firstFive}
                handleRefreshMovies={this.handleRefreshMovies.bind(this)}
                handleSkippedMovies={this.handleSkippedMovies.bind(this)}
                filters={this.state.filters}
              />)
    } else { return (
      <div>
        <FilterControls
          filters={this.state.filters}
          onSourceChange={this.handleSourceChange.bind(this)}
          onScoreChange={this.handleScoreChange.bind(this)}
        />
        {Object.keys(this.state.filters.sources).some(source => this.state.filters.sources[source]) ? findMovies : <p>Select at least one source above to get started!</p>}
      </div>
    ) }
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>StreamCatcher</h1>
        </header>
        { this.renderMovies() }
      </div>
    );
  }
}

export default App;
