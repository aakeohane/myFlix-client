import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    // call the superclass constructor so react can initialize it
    super();
    
    // Initialzie the state to an empty object so we can destructure it later
    this.state = {
      movie: null,
      selectedMovie: null
    };
  }

  // one of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://aarons-myflix-db.herokuapp.com/movies')
      .then(response => {
        // assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onBackButtonClick() {
    this.setState({
      selectedMovie: null,
    });
  }

  // this overrides the render() method of the superclass
  // No need to call super(), as it does nothing by default
  render() {
    // If the state isnt initialized, this will throw on runtime
    // Before the data is initially loaded
    const { movies, selectedMovie } = this.state;
    
    // before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <div className="main-view">
      {selectedMovie
        ? (<MovieView movie={selectedMovie} onClick={() => this.onBackButtonClick()}/>)
        : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
      ))}
      </div>
    );
  }
}