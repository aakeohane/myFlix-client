import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Form, Button, Container, Card, Tabs, Tab, Row } from 'react-bootstrap';

export class ProfileView extends React.Component {
  constructor() {
    super();
    (this.Username = null), (this.Password = null), (this.Email = null), (this.Birthday = null);
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      validated: null
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !==null) {
      this.getUser(accessToken)
    }
  }

  getUser(token) {
    const username = localStorage.getItem('user');

    axios.get(`https://aarons-myflix-db.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      console.log(response);
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
        FavoriteMovies: response.data.FavoriteMovies,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  removeFavorite(e, movie) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://aarons-myflix-db.herokuapp.com/users/${username}/Movies/${movie}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      alert('Movie removed from Favorites');
      this.componentDidMount();
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  deleteAccount() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (confirm('Are you sure you want to unregister?')) {
      axios.delete(`https://aarons-myflix-db.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        alert(user + ' has been deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open("/", "_self");
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }

  // Update and Validation
  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    /*Shorthand axios doesnt work??
    axios.put(`https://aarons-myflix-db.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      }
    })
    .then((response) => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
      });
      alert('Changes have been saved!');
      localStorage.setItem('user', this.state.Username);
      window.open("/", "_self");

    })
    .catch(function (error) {
      console.log(error);
    });*/

    axios({
      method: 'put',
      url: `https://aarons-myflix-db.herokuapp.com/users/${username}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      }
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        alert('Changes have been saved!');
        localStorage.setItem('user', this.state.Username);
        window.open("/", "_self");

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const username = localStorage.getItem('user');
    const { movies } = this.props;

    return (
      <Container className='profile-view'>
        <Tabs defaultActiveKey='profile' className='profile-tabs'>
          <Tab className='tab-item' eventKey='profile' title='Profile'>
            <Card className='profile-card' border='dark'>
              <Card.Title className='profile-title ml-2 my-2'>{username}'s Favorite Movies</Card.Title>
              {FavoriteMovies.length === 0 && <div className='card-content ml-2'>You don't have any favorite movies yet!</div>}
              <div className='favorites-container ml-2'>
                <Row className="justify-content-center">
                {FavoriteMovies.length > 0 &&
                  movies.map((movie) => {
                    if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                      return (
                        <div key={movie._id}>
                          <Card style={{ width: '16rem', float: 'left' }}>
                            <Link to={`/movies/${movie._id}`}>
                              <Card.Img className='favorites-movie' variant="top" src={movie.ImagePath} />
                            </Link>
                            <Card.Body className='movie-card-body'>
                              <Button size='sm' className='profile-button remove-favorite' variant='danger' onClick={(e) => this.removeFavorite(e, movie._id)}>
                                Remove
                              </Button>
                            </Card.Body>
                          </Card>
                        </div>
                      );
                    }
                  })}
                </Row>
              </div>
            </Card>
          </Tab>

          <Tab className='tab-item' eventKey='update' title='Update'>
            <Card className='update-card' border='dark'>
              <Card.Title className='profile-title ml-2 my-2'>Update Profile</Card.Title>
              <Card.Body>
                <Form noValidate validated={validated} className='update-form' onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthday)}>
                  <Form.Group controlId='formBasicUsername'>
                    <Form.Label className='form-label'>Username</Form.Label>
                    <Form.Control type='text' placeholder='Change Username' onChange={(e) => this.setUsername(e.target.value)} pattern='[a-zA-Z0-9]{5,}' />
                    <Form.Control.Feedback type='invalid'>Please enter a valid username with at least 5 alphanumeric characters.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId='formBasicPassword'>
                    <Form.Label className='form-label'>
                      Password <span className='required'>*</span>
                    </Form.Label>
                    <Form.Control type='password' placeholder='Current or New Password' onChange={(e) => this.setPassword(e.target.value)} pattern='.{5,}' />
                    <Form.Control.Feedback type='invalid'>Please enter a valid password with at least 5 characters.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId='formBasicEmail'>
                    <Form.Label className='form-label'>Email</Form.Label>
                    <Form.Control type='email' placeholder='Change Email' onChange={(e) => this.setEmail(e.target.value)} />
                    <Form.Control.Feedback type='invalid'>Please enter a valid email address.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId='formBasicBirthday'>
                    <Form.Label className='form-label'>Birthday</Form.Label>
                    <Form.Control type='date' placeholder='Change Birthday' onChange={(e) => this.setBirthday(e.target.value)} />
                    <Form.Control.Feedback type='invalid'>Please enter a valid birthday.</Form.Control.Feedback>
                  </Form.Group>
                  <Button className='update-profile-button' type='submit' variant='dark'>
                    Update
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Tab>


          <Tab className='tab-item' eventKey='delete' title='Delete Profile'>
            <Card className='update-card'>
              <Card.Title className='profile-title ml-2 my-2'>Delete Your Profile</Card.Title>
              <Card.Subtitle className='text-muted ml-2 my-2'>If you delete your account, it cannot be recovered.</Card.Subtitle>
              <Card.Body>
                <Button className='button' variant='danger' onClick={(e) => this.deleteAccount(e)}>Delete Account</Button>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  user: propTypes.shape({
    FavoriteMovies: propTypes.arrayOf(
      propTypes.shape({
        _id: propTypes.string.isRequired
      })
    ),
    Username: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    Birthday: propTypes.instanceOf(Date),
  })
};