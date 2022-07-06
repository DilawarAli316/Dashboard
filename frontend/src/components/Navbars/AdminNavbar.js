/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component, useEffect, useState } from 'react'
import { useLocation, Link, useHistory } from 'react-router-dom'
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  Button,
  Form,
  FormControl,
  Row,
  Col,
  InputGroup,
} from 'react-bootstrap'
import swal from 'sweetalert'

import routes from 'routes.js'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from 'actions/userActions'
import { listNotification } from 'actions/notificationActions'
import { updateNotification } from 'actions/notificationActions'
import { NOTIFICATION_UPDATE_RESET } from 'constants/notificationConstants'
import { listAllSearch } from 'actions/searchActions'
import { listSearch } from 'actions/searchActions'
import axios from 'axios'

function Header() {
  let history = useHistory()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const location = useLocation()
  const [render, setRender] = useState(false)
  const [notification, setNotification] = useState([])
  const [search, setSearch] = useState('')
  const [renderData, setRenderData] = useState(false)

  console.log(renderData)

  let pathList = location.pathname.includes('list') ? location.pathname : null
  let searchPath =
    pathList && pathList.slice(7).split('/')[0].replace('list', '')

  console.log(pathList)
  console.log(searchPath)

  const { userInfo } = userLogin

  const notificationList = useSelector((state) => state.notificationList)
  const { loading, error, notifications, page, pages } = notificationList

  const filteredList = useSelector((state) => state.filteredList)
  const { filterList } = filteredList

  const notificationUpdate = useSelector((state) => state.notificationUpdate)
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
    category: updatedCategory,
  } = notificationUpdate

  // console.log(notifications, page, pages)

  const mobileSidebarToggle = (e) => {
    e.preventDefault()
    document.documentElement.classList.toggle('nav-open')
    var node = document.createElement('div')
    node.id = 'bodyClick'
    node.onclick = function () {
      this.parentElement.removeChild(this)
      document.documentElement.classList.toggle('nav-open')
    }
    document.body.appendChild(node)
  }

  // if (userInfo) {
  //   setRender(true)
  // }

  const logoutHandler = () => {
    dispatch(logout())
  }

  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name
      }
    }
    return 'Brand'
  }

  const handleSubmit = (id) => {
    console.log(id, 'ID')
    dispatch(updateNotification({ id, read: true }))
    history.push(`/admin/order/${id}`)
  }

  const handleReset = async (e) => {
    // e.preventDefault()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    swal({
      title: 'Are you sure to Reset?',
      text: 'Once deleted, you will not be able to recover the products stock!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.get(`/api/products/reset`, config)
        window.location.reload()
      }
    })
  }

  useEffect(() => {
    // dispatch(listAllSearch(searchPath))
    setNotification(notificationList)
  }, [searchPath])

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: NOTIFICATION_UPDATE_RESET })
      dispatch(listNotification())
    } else {
      if (userInfo && userInfo.isAdmin) {
        dispatch(listNotification())
      } else {
        history.push('/login')
      }
    }
  }, [dispatch, userInfo, successUpdate])
  return (
    <Navbar className='navbarstyle' bg='light' expand='lg'>
      <Container fluid>
        <div className='new d-flex justify-content-center align-items-center ml-2 ml-lg-0 '>
          <Button
            variant='dark'
            className='d-lg-none btn-fill d-flex justify-content-center align-items-center rounded-circle p-2'
            onClick={mobileSidebarToggle}
          >
            <i className='fas fa-ellipsis-v'></i>
          </Button>
          <Navbar.Brand
            href='#home'
            onClick={(e) => e.preventDefault()}
            className='mr-2'
          >
            {getBrandText()}
          </Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls='basic-navbar-nav' className='mr-2'>
          <span className='navbar-toggler-bar burger-lines'></span>
          <span className='navbar-toggler-bar burger-lines'></span>
          <span className='navbar-toggler-bar burger-lines'></span>
        </Navbar.Toggle>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='nav mr-auto' navbar>
            <Form className='d-flex' inline>
              <Row className='justify-content-center align-items-center'>
                {pathList && searchPath !== 'banner' && (
                  <Col md={8}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text style={{ backgroundColor: '#F0F0F0' }}>
                          <i className='fas fa-search'></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        type='text'
                        placeholder='Search'
                      />
                    </InputGroup>
                  </Col>
                )}
                <Col md={4}>
                  <Button
                    variant='danger mobile-margin visible-xs'
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </Form>
          </Nav>
          <Nav className='ml-auto' navbar>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                aria-expanded={false}
                aria-haspopup={true}
                as={Nav.Link}
                data-toggle='dropdown'
                id='navbarDropdownMenuLink'
                variant='default'
                className='m-0'
              >
                <i
                  className='fas fa-bell'
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                ></i>
                {/* <span className='notification'>{notifications?.length}</span> */}
                <span className='d-lg-none ml-1'>Notification</span>
              </Dropdown.Toggle>
              <Dropdown.Menu aria-labelledby='navbarDropdownMenuLink'>
                {notifications?.map((notify) => (
                  <Dropdown.Item
                    key={notify._id}
                    style={
                      notify.read
                        ? { padding: '10px 15px' }
                        : { padding: '10px 15px', backgroundColor: '#EFFFFD' }
                    }
                    // href={`/admin/order/${notify.body.params}`}
                    onClick={() => handleSubmit(notify.body.params)}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        fontFamily: 'system-ui',
                        // alignSelf: 'center',
                      }}
                    >
                      {notify.title}
                    </div>
                    <p
                      style={{
                        fontSize: '0.8rem',
                        fontFamily: 'system-ui',
                        color: '#D1D1D1',
                        marginBottom: 0,
                      }}
                    >
                      {notify.body.text}
                    </p>
                  </Dropdown.Item>
                ))}
                <div className='divider'></div>
                <Dropdown.Item
                  style={{
                    textAlign: 'center',
                    padding: '0 16px',
                    color: '#0000EE',
                    fontSize: '0.8rem',
                    textDecorationLine: 'underline',
                  }}
                  href='/admin/notificationlist/1'
                  // onClick={(e) => e.preventDefault()}
                >
                  See More
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Item style={{ display: 'flex' }}>
              <Nav.Link
                className='m-0'
                href='/login'
                onClick={logoutHandler}
                style={{ alignItems: 'center' }}
              >
                <i
                  style={{ fontSize: '1.2rem' }}
                  className='fas fa-sign-out-alt'
                ></i>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
