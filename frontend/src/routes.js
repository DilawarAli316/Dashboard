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
import Dashboard from 'views/Dashboard.js'
import UserList from 'views/UserList.js'
import EditUser from 'views/EditUser.js'
import Login from 'views/Login.js'

const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'nc-icon nc-chart-pie-35',
    component: Dashboard,
    layout: '/admin',
  },
  // {
  //   path: '/users',
  //   name: 'User Profile',
  //   icon: 'nc-icon nc-circle-09',
  //   component: UserProfile,
  //   layout: '/admin',
  // },
  {
    path: '/user/:id/edit',
    name: 'Edit User',
    icon: 'nc-icon nc-circle-09',
    component: EditUser,
    layout: '/admin',
  },
  {
    path: '/userslist/:pageNumber',
    name: 'Users List',
    icon: 'nc-icon nc-notes',
    component: UserList,
    layout: '/admin',
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'nc-icon nc-bell-55',
    component: Login,
    layout: '/admin',
  },
]

export default dashboardRoutes
