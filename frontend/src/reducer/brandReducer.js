import { BRAND_LIST_FAIL } from 'constants/brandConstants'
import { BRAND_CREATE_SUCCESS } from 'constants/brandConstants'
import { BRAND_CREATE_RESET } from 'constants/brandConstants'
import { BRAND_DELETE_SUCCESS } from 'constants/brandConstants'
import { BRAND_DETAILS_REQUEST } from 'constants/brandConstants'
import { BRAND_DETAILS_FAIL } from 'constants/brandConstants'
import { BRAND_UPDATE_SUCCESS } from 'constants/brandConstants'
import { BRAND_UPDATE_RESET } from 'constants/brandConstants'
import { BRAND_ALL_LIST_SUCCESS } from 'constants/brandConstants'
import { BRAND_ALL_LIST_FAIL } from 'constants/brandConstants'
import { BRAND_ALL_LIST_REQUEST } from 'constants/brandConstants'
import { BRAND_UPDATE_FAIL } from 'constants/brandConstants'
import { BRAND_UPDATE_REQUEST } from 'constants/brandConstants'
import { BRAND_DETAILS_SUCCESS } from 'constants/brandConstants'
import { BRAND_DELETE_FAIL } from 'constants/brandConstants'
import { BRAND_DELETE_REQUEST } from 'constants/brandConstants'
import { BRAND_CREATE_FAIL } from 'constants/brandConstants'
import { BRAND_CREATE_REQUEST } from 'constants/brandConstants'
import { BRAND_LIST_SUCCESS } from 'constants/brandConstants'
import { BRAND_LIST_REQUEST } from 'constants/brandConstants'

export const brandCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_CREATE_REQUEST: // reducer while loading
      return { loading: true }
    case BRAND_CREATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, brand: action.payload }
    case BRAND_CREATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case BRAND_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const brandListReducer = (state = { brands: [], active: 1 }, action) => {
  switch (action.type) {
    case BRAND_LIST_REQUEST: // reducer while loading
      return { loading: true, brands: [] }
    case BRAND_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        brands: action.payload.brands,
        page: action.payload.page,
        pages: action.payload.pages,
        active: action.payload.active,
      }
    case BRAND_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const brandAllListReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case BRAND_ALL_LIST_REQUEST: // reducer while loading
      return { loading: true, brands: [] }
    case BRAND_ALL_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        brands: action.payload,
      } // put data from action(payload) to products
    case BRAND_ALL_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const brandDetailsReducer = (state = { brand: {} }, action) => {
  switch (action.type) {
    case BRAND_DETAILS_REQUEST: // reducer while loading
      return { loading: true, ...state }
    case BRAND_DETAILS_SUCCESS: // reducer when successfull
      return { loading: false, brand: action.payload } // put data from action(payload) to products
    case BRAND_DETAILS_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const brandUpdateReducer = (state = { brand: {} }, action) => {
  switch (action.type) {
    case BRAND_UPDATE_REQUEST: // reducer while loading
      return { loading: true }
    case BRAND_UPDATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, brand: action.payload }
    case BRAND_UPDATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case BRAND_UPDATE_RESET: // reducer when fail
      return { brand: {} }
    default:
      return state
  }
}

export const brandDeleteReducer = (state = { brand: {} }, action) => {
  switch (action.type) {
    case BRAND_DELETE_REQUEST:
      return { loading: true }
    case BRAND_DELETE_SUCCESS:
      return { loading: false, success: true }
    case BRAND_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
