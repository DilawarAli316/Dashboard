import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' // redux state
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import FormContainer from '../components/FormContainer/FormContainer.js'
import { login } from 'actions/userActions.js'
import Message from 'components/Message/Message.js'
import Loader from 'components/Loader/Loader.js'

const LoginScreen = ({ history }) => {
  let location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  console.log(userInfo)

  console.log(location)
  const redirect = location.search ? location.search.split('=')[1] : '/' //bring query string (?ali) it will bring ali
  console.log(redirect)
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      history.push('/admin/dashboard') // if login then redirect
    } else {
      history.push('/login')
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      {loading && <Loader />}
    </FormContainer>
  )
}

export default LoginScreen
