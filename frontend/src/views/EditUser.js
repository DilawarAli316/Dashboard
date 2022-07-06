import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader/Loader.js'
import { useHistory, useParams } from 'react-router-dom'

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { TYPE_UPDATE_RESET } from 'constants/typeConstants.js'
import { updateType } from 'actions/typeActions.js'
import { listTypeDetails } from 'actions/typeActions.js'
import { USER_UPDATE_RESET } from 'constants/userConstants.js'
import { listUserDetails } from 'actions/userActions.js'
import { updateUser } from 'actions/userActions.js'

function User() {
  let history = useHistory()
  let { id: userId } = useParams()

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  //   console.log(user)

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
    user: updatedUser,
  } = userUpdate

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      console.log('redirecting')
      history.push('/admin/userslist/1')
    } else {
      if (!user.name || userId !== user._id) {
        dispatch(listUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setPhoneNumber(user.phoneNumber)
      }
    }
  }, [dispatch, user, userId, successUpdate])

  //   console.log(user)

  const submitHandler = async (e) => {
    e.preventDefault()

    dispatch(updateUser({ _id: userId, name, email, phoneNumber }))
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    console.log(file) // for uploading more than one file choose all the array []
    const formData = new FormData()
    formData.append('image', file) // upload file from formdata
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      // axios
      //   .post('/api/upload', formData, config)
      //   .then((res) => console.log(res.status))
      //   .catch((err) => console.log(JSON.parse(err)))
      console.log(data)

      setImage(data) // set image path from backend
      setUploading(false)
    } catch (err) {
      console.log(err.message)
      setUploading(false)
    }
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col md='8'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Edit Type</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Row>
                    <Col className='px-1' md='6'>
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          required
                          type='name'
                          placeholder='Enter user name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className='pr-1' md='6'>
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          required
                          type='email'
                          placeholder='Enter user email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='pr-1' md='12'>
                      <Form.Group>
                        <label>Phone</label>
                        <Form.Control
                          required
                          type='number'
                          placeholder='Enter user phone'
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className='btn-fill pull-right'
                    type='submit'
                    variant='info'
                  >
                    Update User
                  </Button>
                  <div className='clearfix'></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md='4'>
            <Card className='card-user'>
              <div className='card-image'>
                <img
                  alt='...'
                  src={
                    require('assets/img/photo-1431578500526-4d9613015464.jpeg')
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className='author'>
                  <a href='#pablo' onClick={(e) => e.preventDefault()}>
                    <img
                      alt='...'
                      className='avatar border-gray'
                      src={require('assets/img/rashan.png').default}
                    ></img>
                    <h5 className='title'>Users</h5>
                  </a>
                  <p className='description'>Rashan Wala</p>
                </div>
                <p className='description text-center'>
                  "Supplies <br></br>
                  Home and Living <br></br>
                  Products in Pakistan."
                </p>
              </Card.Body>
              <hr></hr>
              <div className='button-container mr-auto ml-auto'>
                <Button
                  className='btn-simple btn-icon'
                  href='#pablo'
                  onClick={(e) => e.preventDefault()}
                  variant='link'
                >
                  <i className='fab fa-facebook-square'></i>
                </Button>
                <Button
                  className='btn-simple btn-icon'
                  href='#pablo'
                  onClick={(e) => e.preventDefault()}
                  variant='link'
                >
                  <i className='fab fa-twitter'></i>
                </Button>
                <Button
                  className='btn-simple btn-icon'
                  href='#pablo'
                  onClick={(e) => e.preventDefault()}
                  variant='link'
                >
                  <i className='fab fa-google-plus-square'></i>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default User
