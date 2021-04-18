import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button, ListGroup, Col, Row } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director, movies } = this.props;

    if (!director) return null;

    return(
      <div className="director-view">
      <Container>
        <Card className="director-card">
          <Card.Body>
            <Card.Title className="director-name">{director.Director.Name}</Card.Title>
            <Card.Text className="director-bio">Bio: <span className="text-muted">{director.Director.Bio}</span></Card.Text>
          </Card.Body>
        </Card>
        <Card className="director-list-movies">
          <Card.Body>
            <Card.Title className="director-movies">Movies directed by {director.Director.Name}:</Card.Title>
            <ListGroup>
              <div className="director-view-movies">
                <Row className="justify-content-center">
                {movies.map((movie) => {
                  if (movie.Director.Name === director.Director.Name) {
                    return (
                      <Col className="moviesList" lg="4" md="6" sm="8" xs="10">
                      <MovieCard key={movie._id} movie={movie} />
                      </Col>
                    )
                  }
                })}
                </Row>
              </div>
            </ListGroup>
          </Card.Body>
          <Link to={`/`}>
            <Button type="button" block variant="dark link">Return to Movie List</Button>
          </Link>
        </Card>
      </Container>
    </div>
    )
  }
}