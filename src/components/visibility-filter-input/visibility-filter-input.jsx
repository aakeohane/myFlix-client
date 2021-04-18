import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Container, Row, Col, Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <Container className='px-0 py-2'>
    <Row className='justify-content-center'>
      <Col sm={10} md={8} lg={4} className='mb-2'>
        <Form.Control
          onChange={e => props.setFilter(e.target.value)}
          value={props.visibilityFilter}
          placeholder="Search Movies"
        />
      </Col>
    </Row>
  </Container>
);

}

export default connect(null, { setFilter })(VisibilityFilterInput);