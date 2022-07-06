import { USER_LOGIN_FAIL } from 'constants/userConstants'
import { USER_LIST_REQUEST } from 'constants/userConstants'
import { USER_LIST_FAIL } from 'constants/userConstants'
import { USER_DELETE_REQUEST } from 'constants/userConstants'
import { USER_DELETE_FAIL } from 'constants/userConstants'
import { USER_DETAILS_SUCCESS } from 'constants/userConstants'
import { USER_UPDATE_REQUEST } from 'constants/userConstants'
import { USER_UPDATE_FAIL } from 'constants/userConstants'
import { USER_ALL_LIST_REQUEST } from 'constants/userConstants'
import { USER_ALL_LIST_FAIL } from 'constants/userConstants'
import { USER_ALL_LIST_SUCCESS } from 'constants/userConstants'
import { USER_UPDATE_RESET } from 'constants/userConstants'
import { USER_UPDATE_SUCCESS } from 'constants/userConstants'
import { USER_DETAILS_FAIL } from 'constants/userConstants'
import { USER_DETAILS_REQUEST } from 'constants/userConstants'
import { USER_DELETE_SUCCESS } from 'constants/userConstants'
import { USER_LIST_RESET } from 'constants/userConstants'
import { USER_LIST_SUCCESS } from 'constants/userConstants'
import { USER_LOGOUT } from 'constants/userConstants'
import { USER_LOGIN_SUCCESS } from 'constants/userConstants'
import { USER_LOGIN_REQUEST } from 'constants/userConstants'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: // reducer while loading
      return { loading: true }
    case USER_LOGIN_SUCCESS: // reducer when successfull
      return { loading: false, userInfo: action.payload } // put data from action(payload) to userInfo
    case USER_LOGIN_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userListReducer = (state = { users: [], active: 1 }, action) => {
  // console.log(action.payload.active)
  switch (action.type) {
    case USER_LIST_REQUEST: // reducer while loading
      return { loading: true, users: [] }
    case USER_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        users: action.payload.users,
        page: action.payload.page,
        pages: action.payload.pages,
        active: action.payload.active,
      }
    case USER_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case USER_LIST_RESET: // reducer when fail
      return { users: [] }
    default:
      return state
  }
}

export const userAllListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_ALL_LIST_REQUEST: // reducer while loading
      return { loading: true, users: [] }
    case USER_ALL_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        users: action.payload,
      } // put data from action(payload) to products
    case USER_ALL_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST: // reducer while loading
      return { loading: true, ...state }
    case USER_DETAILS_SUCCESS: // reducer when successfull
      return { loading: false, user: action.payload } // put data from action(payload) to products
    case USER_DETAILS_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST: // reducer while loading
      return { loading: true }
    case USER_UPDATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, user: action.payload }
    case USER_UPDATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET: // reducer when fail
      return { type: {} }
    default:
      return state
  }
}

export const userDeleteReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
