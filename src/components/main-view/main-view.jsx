import React from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {
  constructor() {
    // call the superclass constructor so react can initialize it
    super();
    
    // Initialzie the state to an empty object so we can destructure it later
    this.state = {
      movie: null,
      selectedMovie: null,
      user: null,
      register: null
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

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(register) {
    this.setState({
      register
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
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return <RegistrationView onRegister={register => this.onRegister(register)}/>

    /* If there is no user, the LoginView is rendered. If there is a user logged, the user details are
    passed as a prop to the LoginView*/
    if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
    
    // before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <Row className="main-view justify-content-md-center">
        
      {selectedMovie
        ? (
          <Col md={8}>
            <MovieView movie={selectedMovie} onClick={() => this.onBackButtonClick()}/>
          </Col>
          )
        : (
          movies.map(movie => (
            <Col md={4}>
              <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
            </Col>
          ))
          )
      }
      </Row>
    );
  }
}