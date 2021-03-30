import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(username, password);
    // // keeping these lines for updating UI later
    // props.onLoggedIn(username);
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
    <Row className="justify-content-center">
    <Form className="login-form"> 
      <h1 className="login-header">Login in to myFlix Account</h1>
      <Form.Group controlId="formGroupUsername">
        <Form.Label>Username </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formGroupPassword">
        <Form.Label>Password </Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button type="button" variant="dark" onClick={handleSubmit}>Submit</Button>
    </Form>
    </Row>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};