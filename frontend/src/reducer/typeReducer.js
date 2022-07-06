import { TYPE_LIST_FAIL } from 'constants/typeConstants'
import { TYPE_CREATE_SUCCESS } from 'constants/typeConstants'
import { TYPE_CREATE_RESET } from 'constants/typeConstants'
import { TYPE_DELETE_SUCCESS } from 'constants/typeConstants'
import { TYPE_DETAILS_REQUEST } from 'constants/typeConstants'
import { TYPE_DETAILS_FAIL } from 'constants/typeConstants'
import { TYPE_UPDATE_SUCCESS } from 'constants/typeConstants'
import { TYPE_UPDATE_RESET } from 'constants/typeConstants'
import { TYPE_UPDATE_FAIL } from 'constants/typeConstants'
import { TYPE_UPDATE_REQUEST } from 'constants/typeConstants'
import { TYPE_DETAILS_SUCCESS } from 'constants/typeConstants'
import { TYPE_DELETE_FAIL } from 'constants/typeConstants'
import { TYPE_DELETE_REQUEST } from 'constants/typeConstants'
import { TYPE_CREATE_FAIL } from 'constants/typeConstants'
import { TYPE_CREATE_REQUEST } from 'constants/typeConstants'
import { TYPE_LIST_SUCCESS } from 'constants/typeConstants'
import { TYPE_LIST_REQUEST } from 'constants/typeConstants'

export const typeCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPE_CREATE_REQUEST: // reducer while loading
      return { loading: true }
    case TYPE_CREATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, type: action.payload }
    case TYPE_CREATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case TYPE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const typeListReducer = (state = { types: [], active: 1 }, action) => {
  switch (action.type) {
    case TYPE_LIST_REQUEST: // reducer while loading
      return { loading: true, types: [] }
    case TYPE_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        types: action.payload.types,
        page: action.payload.page,
        pages: action.payload.pages,
        active: action.payload.active,
      }
    case TYPE_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const typeDetailsReducer = (state = { type: {} }, action) => {
  switch (action.type) {
    case TYPE_DETAILS_REQUEST: // reducer while loading
      return { loading: true, ...state }
    case TYPE_DETAILS_SUCCESS: // reducer when successfull
      return { loading: false, type: action.payload } // put data from action(payload) to products
    case TYPE_DETAILS_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const typeUpdateReducer = (state = { type: {} }, action) => {
  switch (action.type) {
    case TYPE_UPDATE_REQUEST: // reducer while loading
      return { loading: true }
    case TYPE_UPDATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, type: action.payload }
    case TYPE_UPDATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case TYPE_UPDATE_RESET: // reducer when fail
      return { type: {} }
    default:
      return state
  }
}

export const typeDeleteReducer = (state = { type: {} }, action) => {
  switch (action.type) {
    case TYPE_DELETE_REQUEST:
      return { loading: true }
    case TYPE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case TYPE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
