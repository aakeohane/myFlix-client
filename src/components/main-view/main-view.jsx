import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { setMovies, setUser } from '../../actions/actions';

import { Navbar, Nav, Button } from 'react-bootstrap';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { DirectorView } from '../director-view/director-view';

import './main-view.scss'

export class MainView extends React.Component {
  constructor() {
    // call the superclass constructor so react can initialize it
    super();
    
    // Initialzie the state to an empty object so we can destructure it later
    this.state = {};
  }

  getMovies(token) {
    axios.get(`https://aarons-myflix-db.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  // one of the "hooks" available in a React Component
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData)
    this.props.setUser(authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLogout() {
    this.props.setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }


  onRegister(register) {
    this.setState({
      register: true
    });
  }

  // this overrides the render() method of the superclass
  // No need to call super(), as it does nothing by default
  render() {
    // If the state isnt initialized, this will throw on runtime
    // Before the data is initially loaded
    /*const { movies, user, register, selectedMovie } = this.state;*/
    
    // before the movies have been loaded
    /*if (!movies) return <div className="main-view"/>;*/

    let { movies, user } = this.props;
    let { register } = this.state;

    return (
      <Router>
        <div className="main-view">
          <header>
            <Navbar expand="lg" className='nav-bar'>
              <Navbar.Brand className='app-name navbar-brand' as={Link} to={`/`} target='_self'>myFlix</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  {user &&
                    <Nav.Link as={Link} to={`/users/${user}`} target='_self' className='navbar-item'>My Profile</Nav.Link>
                  }  
                </Nav>
                  {user &&
                    <Link to={`/`}>
                      <Button variant="dark" className='logout-button' onClick={() => this.onLogout()}>Logout</Button>
                    </Link>
                  }             
              </Navbar.Collapse>
            </Navbar>
          </header>
           <Route exact path="/" render={() => {
             if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
             return <MoviesList movies={movies}/>;
         }} />
           <Route path="/movies/:movieId" render={({match}) => <MovieView  movie={movies.find(m => m._id === match.params.movieId)}/>}/>
           <Route exact path="/users/:username" render={({ history }) => {
            // if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
            // if (movies.length === 0) return;
            return <ProfileView history={history} movies={movies} />
          }} />
          <Route path="/register" render={() => {
            if (!register) return <RegistrationView onRegister={(register) => this.onRegister(register)} />
          }} />
          <Route path="/directors/:name" render={({ match }) => {
            if (!movies.length) return <div className='main-view' />;
            return <DirectorView director={movies.find((m) => m.Director.Name === match.params.name)} movies={movies} />
          }} />
          <Route path="/genres/:name" render={({ match }) => {
            if (!movies.length) return <div className='main-view' />;
            return <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name)} movies={movies} />
          }} />
         </div>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user }
}

export default connect ( mapStateToProps, { setMovies, setUser } )(MainView);