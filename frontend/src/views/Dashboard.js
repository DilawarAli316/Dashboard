import React, { useEffect } from 'react'
import ChartistGraph from 'react-chartist'
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
  Form,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { listAllProducts } from 'actions/productActions'
import { listAllOrders } from 'actions/orderActions'
import { listAllUsers } from 'actions/userActions'
import { listAllBrands } from 'actions/brandActions'
import { useHistory } from 'react-router'
import { listNotification } from 'actions/notificationActions'

function Dashboard() {
  const dispatch = useDispatch()
  const history = useHistory()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const productAllList = useSelector((state) => state.productAllList)
  const { products } = productAllList

  console.log(products)

  const notificationList = useSelector((state) => state.notificationList)
  const { notifications, page, pages } = notificationList

  const orderAllList = useSelector((state) => state.orderAllList)
  const { orders } = orderAllList

  const userAllList = useSelector((state) => state.userAllList)
  const { users } = userAllList

  const brandAllList = useSelector((state) => state.brandAllList)
  const { brands } = brandAllList

  if (!userInfo) {
    history.push('/login')
  }

  const handleSubmit = (id) => {
    history.push(`/admin/order/${id}`)
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllProducts())
      dispatch(listAllOrders())
      dispatch(listAllUsers())
      dispatch(listAllBrands())
      dispatch(listNotification())
    } else {
      history.push('/login')
    }
  }, [dispatch, userInfo])
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg='3' sm='6'>
            <Card className='card-stats'>
              <Card.Body>
                <Row>
                  <Col xs='5'>
                    <div
                      style={{ cursor: 'pointer' }}
                      className='icon-big text-center icon-warning'
                      onClick={() => history.push('/admin/productlist/1')}
                    >
                      <i className='nc-icon nc-chart text-warning'></i>
                    </div>
                  </Col>
                  <Col xs='7'>
                    <div className='numbers'>
                      <p className='card-category'>PRODUCTS</p>
                      <Card.Title as='h4'>{products?.length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>
                  <i className='fas fa-redo mr-1'></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg='3' sm='6'>
            <Card className='card-stats'>
              <Card.Body>
                <Row>
                  <Col xs='5'>
                    <div
                      style={{ cursor: 'pointer' }}
                      className='icon-big text-center icon-warning'
                      onClick={() => history.push('/admin/orderslist/1')}
                    >
                      <i className='nc-icon nc-light-3 text-success'></i>
                    </div>
                  </Col>
                  <Col xs='7'>
                    <div className='numbers'>
                      <p className='card-category'>ORDERS</p>
                      <Card.Title as='h4'>{orders?.length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>
                  <i className='far fa-calendar-alt mr-1'></i>
                  Last day
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg='3' sm='6'>
            <Card className='card-stats'>
              <Card.Body>
                <Row>
                  <Col xs='5'>
                    <div
                      style={{ cursor: 'pointer' }}
                      className='icon-big text-center icon-warning'
                      onClick={() => history.push('/admin/userslist/1')}
                    >
                      <i className='nc-icon nc-vector text-danger'></i>
                    </div>
                  </Col>
                  <Col xs='7'>
                    <div className='numbers'>
                      <p className='card-category'>USERS</p>
                      <Card.Title as='h4'>{users?.length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>
                  <i className='far fa-clock-o mr-1'></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg='3' sm='6'>
            <Card className='card-stats'>
              <Card.Body>
                <Row>
                  <Col xs='5'>
                    <div
                      style={{ cursor: 'pointer' }}
                      className='icon-big text-center icon-warning'
                      onClick={() => history.push('/admin/brandlist/1')}
                    >
                      <i className='nc-icon nc-favourite-28 text-primary'></i>
                    </div>
                  </Col>
                  <Col xs='7'>
                    <div className='numbers'>
                      <p className='card-category'>BRANDS</p>
                      <Card.Title as='h4'>{brands?.length}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>
                  <i className='fas fa-redo mr-1'></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md='12'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Users Behavior</Card.Title>
                <p className='card-category'>24 Hours performance</p>
              </Card.Header>
              <Card.Body>
                <div className='ct-chart' id='chartHours'>
                  <ChartistGraph
                    data={{
                      labels: [
                        '9:00AM',
                        '12:00AM',
                        '3:00PM',
                        '6:00PM',
                        '9:00PM',
                        '12:00PM',
                        '3:00AM',
                        '6:00AM',
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        [67, 152, 143, 240, 287, 335, 435, 437],
                        [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type='Line'
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: '245px',
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        'screen and (max-width: 640px)',
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0]
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className='legend'>
                  <i className='fas fa-circle text-info'></i>
                  Open <i className='fas fa-circle text-danger'></i>
                  Click <i className='fas fa-circle text-warning'></i>
                  Click Second Time
                </div>
                <hr></hr>
                <div className='stats'>
                  <i className='fas fa-history'></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md='4'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Email Statistics</Card.Title>
                <p className='card-category'>Last Campaign Performance</p>
              </Card.Header>
              <Card.Body>
                <div
                  className='ct-chart ct-perfect-fourth'
                  id='chartPreferences'
                >
                  <ChartistGraph
                    data={{
                      labels: ['40%', '20%', '40%'],
                      series: [40, 20, 40],
                    }}
                    type='Pie'
                  />
                </div>
                <div className='legend'>
                  <i className='fas fa-circle text-info'></i>
                  Open <i className='fas fa-circle text-danger'></i>
                  Bounce <i className='fas fa-circle text-warning'></i>
                  Unsubscribe
                </div>
                <hr></hr>
                <div className='stats'>
                  <i className='far fa-clock'></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md='6'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>2017 Sales</Card.Title>
                <p className='card-category'>All products including Taxes</p>
              </Card.Header>
              <Card.Body>
                <div className='ct-chart' id='chartActivity'>
                  <ChartistGraph
                    data={{
                      labels: [
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'Mai',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec',
                      ],
                      series: [
                        [
                          542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756,
                          895,
                        ],
                        // [
                        //   412, 243, 280, 580, 453, 353, 300, 364, 368, 410, 636,
                        //   695,
                        // ],
                      ],
                    }}
                    type='Bar'
                    options={{
                      seriesBarDistance: 10,
                      axisX: {
                        showGrid: false,
                      },
                      height: '245px',
                    }}
                    responsiveOptions={[
                      [
                        'screen and (max-width: 640px)',
                        {
                          seriesBarDistance: 5,
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0]
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
              </Card.Body>
              <Card.Footer>
                <div className='legend'>
                  <i className='fas fa-circle text-info'></i>
                  Tesla Model S <i className='fas fa-circle text-danger'></i>
                  BMW 5 Series
                </div>
                <hr></hr>
                <div className='stats'>
                  <i className='fas fa-check'></i>
                  Data information certified
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md='6'>
            <Card className='card-tasks'>
              <Card.Header>
                <Card.Title as='h4'>Notifications</Card.Title>
                <p className='card-category'>Cancellation Requests</p>
              </Card.Header>
              <Card.Body>
                <div className='table-full-width'>
                  <Table>
                    <tbody></tbody>
                  </Table>
                </div>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className='stats'>
                  <i className='now-ui-icons loader_refresh spin'></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Dashboard
