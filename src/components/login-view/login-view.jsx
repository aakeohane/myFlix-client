import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { connect } from 'react-redux';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(username, password);
    // Send a request to the server for authentication 
    axios.post('https://aarons-myflix-db.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      // changed from (username) to data bc you need token with username
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <Container>
    <Row className="justify-content-center">
    <Form className="login-form justify-content-center"> 
      <h1 className="login-header">Login in to myFlix Account</h1>
      <Form.Group controlId="formGroupUsername">
        <Form.Label>Username </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <Form.Control.Feedback type='invalid'>Please enter your username</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formGroupPassword">
        <Form.Label>Password </Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Form.Control.Feedback type='invalid'>Please enter your password</Form.Control.Feedback>
      </Form.Group>
      <Button type="button" variant="dark" onClick={handleSubmit}>Login</Button>
      <small className='text-muted text-center d-block'>
      Need an account?
        <Link to='/register'>
        <span className='register text-primary ml-2 link'>Sign up here</span>
        </Link>
      </small>
    </Form>
    
    </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    pasword: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
  userLoginRequested: () => dispatch(userLoginRequested()),
  loginUser: (username, password) => dispatch(loginUser(username, password)),
});

export default connect(null, mapDispatchToProps)(LoginView);