import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button, Row, Container } from 'react-bootstrap';

export class MovieView extends React.Component {

  constructor () {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <Container>
      <Row className="justify-content-center">
      <Card className="movie-view" style={{ width: "18rem" }} >
        <Card.Img className="movie-poster" variant="top" src={movie.ImagePath} />
        <Card.Title className="movie-title">{movie.Title}</Card.Title>
        <Card.Body>
          <Card.Text className="label-body">Description: {movie.Description}</Card.Text>
          <Card.Text className="label-body">Director: {movie.Director.Name}</Card.Text>
          <Card.Text className="label-body">Genre: {movie.Genre.Name}</Card.Text>
        </Card.Body>
        <Button type="button" variant="dark" onClick={() => onClick()}>Back</Button>
      </Card>
      </Row>
      </Container>

      // Work on this later
    //   <Container>
    //   <Row>
    //     <Col>
    //       <img className="movie-poster" src={movie.ImagePath} />
    //     </Col>
    //     <Col>
    //       <div className="movie-title">
    //         <span className="label"></span>
    //         <span className="value">{movie.Title}</span>
    //       </div>
    //       <br />
    //       <div className="movie-description">
    //         <span className="label"></span>
    //         <span className="value">{movie.Description}</span>
    //       </div>
    //       <br />
    //       <div className="movie-genre">
    //         <span className="label">Genre: {movie.Genre.Name}</span>
    //       </div>
    //       <div className="movie-director">
    //         <span className="label">Director: {movie.Director.Name} </span>
    //       </div>
    //     </Col>
    //   </Row>
    // </Container>
    );
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
  }).isRequired,
  onClick: PropTypes.func.isRequired
};