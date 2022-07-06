import { ANNOUNCE_LIST_FAIL } from 'constants/announceConstants'
import { ANNOUNCE_DELETE_SUCCESS } from 'constants/announceConstants'
import { ANNOUNCE_DETAILS_REQUEST } from 'constants/announceConstants'
import { ANNOUNCE_DETAILS_FAIL } from 'constants/announceConstants'
import { ANNOUNCE_UPDATE_SUCCESS } from 'constants/announceConstants'
import { ANNOUNCE_UPDATE_RESET } from 'constants/announceConstants'
import { ANNOUNCE_CREATE_SUCCESS } from 'constants/announceConstants'
import { ANNOUNCE_CREATE_RESET } from 'constants/announceConstants'
import { ANNOUNCE_CREATE_FAIL } from 'constants/announceConstants'
import { ANNOUNCE_CREATE_REQUEST } from 'constants/announceConstants'
import { ANNOUNCE_UPDATE_FAIL } from 'constants/announceConstants'
import { ANNOUNCE_UPDATE_REQUEST } from 'constants/announceConstants'
import { ANNOUNCE_DETAILS_SUCCESS } from 'constants/announceConstants'
import { ANNOUNCE_DELETE_FAIL } from 'constants/announceConstants'
import { ANNOUNCE_DELETE_REQUEST } from 'constants/announceConstants'
import { ANNOUNCE_LIST_SUCCESS } from 'constants/announceConstants'
import { ANNOUNCE_LIST_REQUEST } from 'constants/announceConstants'

export const announceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ANNOUNCE_CREATE_REQUEST: // reducer while loading
      return { loading: true }
    case ANNOUNCE_CREATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, announce: action.payload }
    case ANNOUNCE_CREATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case ANNOUNCE_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const announceListReducer = (state = { announce: [] }, action) => {
  switch (action.type) {
    case ANNOUNCE_LIST_REQUEST: // reducer while loading
      return { loading: true, announce: [] }
    case ANNOUNCE_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        announce: action.payload,
      }
    case ANNOUNCE_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const announceDetailsReducer = (state = { announce: {} }, action) => {
  switch (action.type) {
    case ANNOUNCE_DETAILS_REQUEST: // reducer while loading
      return { loading: true, ...state }
    case ANNOUNCE_DETAILS_SUCCESS: // reducer when successfull
      return { loading: false, announce: action.payload } // put data from action(payload) to products
    case ANNOUNCE_DETAILS_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const announceUpdateReducer = (state = { announce: {} }, action) => {
  switch (action.type) {
    case ANNOUNCE_UPDATE_REQUEST: // reducer while loading
      return { loading: true }
    case ANNOUNCE_UPDATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, announce: action.payload }
    case ANNOUNCE_UPDATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case ANNOUNCE_UPDATE_RESET: // reducer when fail
      return { announce: {} }
    default:
      return state
  }
}

export const announceDeleteReducer = (state = { announce: {} }, action) => {
  switch (action.type) {
    case ANNOUNCE_DELETE_REQUEST:
      return { loading: true }
    case ANNOUNCE_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ANNOUNCE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
