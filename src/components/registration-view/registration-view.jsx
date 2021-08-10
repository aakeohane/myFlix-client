import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Form, Button, Container, Row } from 'react-bootstrap';

export function RegistrationView(props) {
  const [form, setForm] = useState({})
  const [ errors, setErrors ] = useState({})

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors()
    const { username, password, email, birthday } = form
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
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
      window.alert("Something went wrong, please try again, username may already be taken")
    })
  }};

  const findFormErrors = () => {
    const { username, password, email } = form
    const newErrors = {}
    // username errors
    if ( !username || username === '' ) newErrors.username = 'cannot be blank!'
    else if ( username.length < 5 ) newErrors.username = 'name is too short!'
    // password errors
    if ( !password || password === '' ) newErrors.password = 'select a password!'
    else if ( password.length < 5 ) newErrors.password = 'password is too short!'
    // no email
    if ( !email || email === '' ) newErrors.email = 'Please enter an email.'

    return newErrors
}

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
              onChange={e => setField('username', e.target.value)}
              isInvalid={ errors.username }
              pattern='[a-zA-Z0-9].{5,}' 
            />
            <Form.Control.Feedback type='invalid'>
              Please enter a valid username with at least 5 alphanumeric characters.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>E-mail Address </Form.Label>
            <Form.Control
              type="text"
              placeholder="example@gmail.com"
              required
              isInvalid={ errors.email }
              onChange={e => setField('email', e.target.value)}
            />
            <Form.Control.Feedback type='invalid'>
              {/* Please enter a valid username with at least 5 alphanumeric characters. */}
              {errors.email}
            </Form.Control.Feedback>

          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              onChange={e => setField('password', e.target.value)}
              isInvalid={ !!errors.password }
              pattern='[a-zA-Z0-9].{5,}' 
            />
            <Form.Control.Feedback type='invalid'>Please enter a valid password with at least 5 alphanumeric characters.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              placeholder="MM/DD/YYYY"
              required
              onChange={e => setField('birthday', e.target.value)}
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