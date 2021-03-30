import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";
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
      movies: [],
      user: null
    };
  }

  getMovies(token) {
    axios.get('https://aarons-myflix-db.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  // one of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData)
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
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
    
    // before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      // <Row className="main-view justify-content-md-center">
        
      // {selectedMovie
      //   ? (
      //     <Col md={8}>
      //       <MovieView movie={selectedMovie} onClick={() => this.onBackButtonClick()}/>
      //     </Col>
      //     )
      //   : (
      //     movies.map(movie => (
      //       <Col md={4}>
      //         <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
      //       </Col>
      //     ))
      //     )
      // }
      // </Row>
      <Router>
      <div className="main-view">
        <Route exact path="/" render={() => {
          if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>;
          return movies.map(m => <MovieCard key={m._id} movie={m}/>)
        }}/>
        <Route path="/register" render={() => <RegistrationView />}/>
        <Route exact path="/" render={() => movies.map(m => <MovieCard key={m._id} movie={m}/>)}/>
        <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>
        <Route exact path="/genres/:name" render={/*genre view*/}/>
        <Route exact path="/directors/:name" render={({match}) => {
          if (!movies) return <div className="main-view"/>;
          return <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>
        }}/>
      </div>
      </Router>
    );
  }
}