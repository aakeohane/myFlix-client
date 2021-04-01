import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Form, Button, Container, Row } from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios.post('https://aarons-myflix-db.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // '_self' opens page in current window
    })
    .catch(e => {
      console.log('error registering the user')
    })
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Form className="registration-form">
          <h1 className="registration-header">Create myFlix Account Profile</h1>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              required
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>E-mail Address </Form.Label>
            <Form.Control
              type="text"
              placeholder="example@gmail.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              placeholder="MM/DD/YYYY"
              required
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
            />
          </Form.Group>
          <Button type="button" variant="dark" onClick={handleRegister}>Submit</Button>
        </Form>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
      username: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      birthdate: PropTypes.string.isRequired
  }),
  onRegister: PropTypes.func,
};