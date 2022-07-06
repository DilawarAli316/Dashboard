import React, { useEffect, useState } from 'react'

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listUser } from 'actions/userActions.js'
import { deleteUser } from 'actions/userActions.js'
import Pagination from 'react-bootstrap-4-pagination'

function TableList() {
  let { pageNumber } = useParams()
  const location = useLocation()

  let history = useHistory()

  pageNumber = pageNumber === ':pageNumber' ? 1 : pageNumber

  console.log(location.pathname, pageNumber)
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userList = useSelector((state) => state.userList)
  const { loading, error, users, page, pages, active } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete

  const filteredList = useSelector((state) => state.filteredList)
  let { filterList } = filteredList

  filterList = filterList.length !== 0 ? filterList : null

  const [activePage, setActivePage] = useState(active)

  console.log('active and page', active, page, pages)

  const deleteHandler = (id) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        dispatch(deleteUser(id))
      }
    })
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUser(pageNumber, activePage))
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo, successDelete, pageNumber])

  return (
    <>
      <Container fluid>
        <Row>
          <Col md='12'>
            <Card className='strpied-tabled-with-hover'>
              <Card.Header>
                <Card.Title as='h4'>USER</Card.Title>
                <p className='card-category'>List of Users</p>
              </Card.Header>
              <Card.Body className='table-full-width table-responsive px-0'>
                <Table className='table-hover table-striped'>
                  <thead>
                    <tr>
                      <th className='border-0'>ID</th>
                      <th className='border-0'>Name</th>
                      <th className='border-0'>Email</th>
                      <th className='border-0'>Phone</th>
                      <th className='border-0'>Admin</th>
                      <th className='border-0'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterList
                      ? filterList?.map((filter) => (
                          <tr key={filter._id}>
                            <td>{filter._id}</td>
                            <td>{filter.name}</td>
                            <td>{filter.email}</td>
                            <td>{filter.phoneNumber}</td>
                            <td>
                              <Nav.Link
                                style={{
                                  display: 'inline',
                                }}
                                href={`/admin/user/${filter._id}/edit`}
                                // to={`/admin/category/${category._id}/edit`}
                              >
                                <Button className='btn-sm' variant='light'>
                                  <i className='fas fa-edit'></i>
                                </Button>
                              </Nav.Link>
                              <Button
                                variant='danger'
                                className='btn-sm'
                                onClick={() => deleteHandler(filter._id)}
                              >
                                <i className='fas fa-trash'></i>
                              </Button>
                            </td>
                          </tr>
                        ))
                      : users?.map((user) => (
                          <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td>
                              {user.isAdmin ? (
                                <i
                                  className='fas fa-check'
                                  style={{ color: 'green' }}
                                ></i>
                              ) : (
                                <i
                                  className='fas fa-times'
                                  style={{ color: 'red' }}
                                ></i>
                              )}
                            </td>

                            {!user.isAdmin ? (
                              <td>
                                <Nav.Link
                                  style={{
                                    display: 'inline',
                                    padding: 0,
                                  }}
                                  href={`/admin/user/${user._id}/edit`}
                                >
                                  <Button className='btn-sm' variant='light'>
                                    <i className='fas fa-edit'></i>
                                  </Button>
                                </Nav.Link>
                                <Button
                                  variant='danger'
                                  className='btn-sm'
                                  onClick={() => deleteHandler(user._id)}
                                >
                                  <i className='fas fa-trash'></i>
                                </Button>
                              </td>
                            ) : (
                              <td></td>
                            )}
                          </tr>
                        ))}
                  </tbody>
                </Table>
              </Card.Body>
              {filterList ? null : (
                <div style={{ alignSelf: 'center' }}>
                  <Pagination
                    totalPages={pages ? pages : 0}
                    currentPage={activePage}
                    showMax={activePage <= pages ? 10 : 6}
                    prevNext
                    activeBgColor='#007bff'
                    activeBorderColor='#007bff'
                    color='#007bff'
                    onClick={function (page) {
                      if (page <= pages) {
                        setActivePage(page)
                        const path = location.pathname
                        const pagePath =
                          path.includes(':pageNumber') ||
                          [...Array(11).keys()].some((substring) =>
                            path.includes(substring)
                          )
                            ? path.split('/')
                            : path

                        pagePath.pop()

                        const myPath = pagePath.join('/')
                        history.push(`${myPath}/${page}`)
                      } else {
                        console.log(activePage)
                        console.log('greater than 22')
                      }
                    }}
                  />
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TableList
