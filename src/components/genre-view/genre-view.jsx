import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button, ListGroup, Col, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export class GenreView extends React.Component {
  constructor () {
    super();

    this.state = {};
  }

  render() {
    const { genre, movies } = this.props;

    if (!genre) return null;

    return (
      <div className="genre-view">
        <Container>
          <Card className="genre-card">
            <Card.Body>
              <Card.Title className="genre-name">{genre.Genre.Name}</Card.Title>
              <Card.Text className="genre-description text-muted">{genre.Genre.Description}</Card.Text>
            </Card.Body>
          </Card>
          <Card className="genre-moreMovies">
            <Card.Body>
              <Card.Title className="genre-movies">{genre.Genre.Name} Movies:</Card.Title>
              <ListGroup>
                <div className="genre-view-movies">
                  <Row className="justify-content-center">
                  {movies.map((movie) => {
                    if (movie.Genre.Name === genre.Genre.Name) {
                      return (
                      <Col key={movie._id} className="moviesList" lg="4" md="6" sm="8" xs="10">
                      <MovieCard  movie={movie} />
                      </Col>
                      )
                    }
                  })}
                  </Row>
                </div>
              </ListGroup>
            </Card.Body>
            <Link to={`/`}>
              <Button className="returnButton" type="button" block variant="dark">Return to Movie List</Button>
            </Link>
          </Card>
        </Container>
      </div>
    )
  }
}