import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
}

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className ="main-view"/>;

  return (
    <div className="movies-list">
      <VisibilityFilterInput visibilityFilter={visibilityFilter}/>
      <Container>
        <Row className="justify-content-center">
            {filteredMovies.map((m) => (
              <Col className="movieList" lg="4" md="6" sm="8" xs="10">
                <MovieCard key={m._id} movie={m} />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default connect(mapStateToProps)(MoviesList);