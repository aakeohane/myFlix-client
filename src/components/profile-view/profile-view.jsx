import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Form, Button, Container, Card, Tabs, Tab, Row } from 'react-bootstrap';

import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

export class ProfileView extends React.Component {
  constructor() {
    super();
  }


  removeFavorite(e, movie) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://aarons-myflix-db.herokuapp.com/users/${username}/Movies/${movie}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      alert('Movie removed from Favorites');
      this.props.setUser(response.data)
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
  handleUpdate(form) {
    if (!form.checkValidity()) return;

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    const newUsername = form[0].value;
    const newPassword = form[1].value;
    const newEmail = form[2].value;
    const newBirthday = form[3].value;

    axios({
      method: 'put',
      url: `https://aarons-myflix-db.herokuapp.com/users/${username}`,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername,
        Password: newPassword,
        Email: newEmail,
        Birthday: newBirthday,
      }
    })
      .then((response) => {
        this.props.setUser(response.data);
        alert('Changes have been saved!');
        localStorage.setItem('user', this.state.Username);
      })
      .catch(function (error) {
        alert("Oops, something went wrong")
        console.error(error);
      });
  }

  render() {
    const { history, user } = this.props;

    return (
      <Container className='profile-view'>
        <Tabs defaultActiveKey='profile' className='profile-tabs'>
          <Tab className='tab-item' eventKey='profile' title='Profile'>
            <Card className='profile-card' border='dark'>
              <Card.Title className='profile-title ml-2 my-2'>{user.Username}'s Favorite Movies</Card.Title>
              {user.FavoriteMovies.length === 0 && <div className='card-content ml-2'>You don't have any favorite movies yet!</div>}
              <div className='favorites-container ml-2'>
                <Row className="justify-content-center">
                {user.FavoriteMovies.length > 0 &&
                    user.FavoriteMovies.map((movie) =>
                      (
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
                      )) 
                  }
                </Row>
              </div>
            </Card>
          </Tab>

          <Tab className='tab-item' eventKey='update' title='Update'>
            <Card className='update-card' border='dark'>
              <Card.Title className='profile-title ml-2 my-2'>Update Profile</Card.Title>
              <Card.Body>
                <Form noValidate className='update-form' onSubmit={(e) => {
                  e.preventDefault();
                  this.handleUpdate(e.target)
                    .then(() => {
                      history.goBack()
                    });
                }}>
                  <Form.Group controlId='formBasicUsername'>
                    <Form.Label className='form-label'>Username</Form.Label>
                    <Form.Control type='text' placeholder='Change Username' pattern='[a-zA-Z0-9]{5,}' title='Must contain at least 5 alphanumeric characters' />
                    <Form.Control.Feedback type='invalid'>Please enter a valid username with at least 5 alphanumeric characters.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId='formBasicPassword'>
                    <Form.Label className='form-label'>
                      Password <span className='required'>*</span>
                    </Form.Label>
                    <Form.Control type='password' placeholder='Current or New Password' pattern='.{5,}' />
                    <Form.Control.Feedback type='invalid'>Please enter a valid password with at least 5 characters.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId='formBasicEmail'>
                    <Form.Label className='form-label'>Email</Form.Label>
                    <Form.Control type='email' placeholder='Change Email' />
                    <Form.Control.Feedback type='invalid'>Please enter a valid email address.</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group controlId='formBasicBirthday'>
                    <Form.Label className='form-label'>Birthday</Form.Label>
                    <Form.Control type='date' placeholder='Change Birthday' />
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

// ProfileView.propTypes = {
//   user: propTypes.shape({
//     FavoriteMovies: propTypes.arrayOf(
//       propTypes.shape({
//         _id: propTypes.string.isRequired
//       })
//     ),
//     Username: propTypes.string.isRequired,
//     Email: propTypes.string.isRequired,
//     Birthday: propTypes.instanceOf(Date),
//   })
// };

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { setUser })(ProfileView);