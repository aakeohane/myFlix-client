import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, Button, Container } from 'react-bootstrap';
import axios from 'axios';

import './movie-view.scss'
import { connect } from 'react-redux';
import { setFav } from '../../actions/actions';

export class MovieView extends React.Component {

  constructor () {
    super();

    this.state = {
      favMovie: false
    };
  }

  

  // Axios for adding to FavoriteMovies array
  addFavorite(movie) {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.post(`https://aarons-myflix-db.herokuapp.com/users/${username}/Movies/${movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then( () => {
      alert(`${movie.Title} added to Favorites`)
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render() {
   const { movie } = this.props;
  //  const { favMovie } = this.state;

    return (    
      <Container>
      <div className="card mb-8">
        <div className="row no-gutters">
          <div className="col-md-4">
            <Card.Img className="movie-poster" src={movie.ImagePath} />
            <Button variant="info" type="button" onClick={() => this.addFavorite(movie)} block>Add to favorites</Button>
          </div>
          <div className="col-md-8 d-flex flex-column">
            <div className="card-body">
              <Card.Title className="movie-title">{movie.Title}</Card.Title>
              <Card.Text className="label-body">
                Description: <span className="text-muted">{movie.Description}</span>
              </Card.Text>
              <Card.Text className="label-body">
                <span className="label-director">Director: </span>
                <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
              </Card.Text>
              <Card.Text className="label-body">
                <span className="label-genre">Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
              </Card.Text>
              <Link to={`/`}>
                <Button className="back-button" type="button" variant="dark link" block>Back</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </Container>
   )
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string,
      ImagePath: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
          Name: PropTypes.string
      }),
      Director: PropTypes.shape({
          Name: PropTypes.string,
      }),
  }).isRequired
};

const mapStateToProps = (state) => ({
  movie: state.movies.list
});

export default connect(mapStateToProps, { setFav })(MovieView);