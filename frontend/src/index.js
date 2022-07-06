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
import React from 'react'
import './index.css'
import './bootstrap.min.css'
import ReactDOM from 'react-dom'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/animate.min.css'
import './assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0'
import './assets/css/demo.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Provider } from 'react-redux'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/lib/integration/react'
import AdminLayout from 'layouts/Admin.js'
import LoginScreen from 'views/Login'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Route path='/admin' render={(props) => <AdminLayout {...props} />} />
          <Route path='/login' component={LoginScreen} />
          <Redirect from='/' to='/admin/dashboard' />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
