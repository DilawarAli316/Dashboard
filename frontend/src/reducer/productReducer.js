import { PRODUCT_CREATE_FAIL } from 'constants/productConstants'
import { PRODUCT_LIST_REQUEST } from 'constants/productConstants'
import { PRODUCT_LIST_FAIL } from 'constants/productConstants'
import { PRODUCT_DETAILS_SUCCESS } from 'constants/productConstants'
import { PRODUCT_UPDATE_REQUEST } from 'constants/productConstants'
import { PRODUCT_UPDATE_FAIL } from 'constants/productConstants'
import { PRODUCT_DELETE_REQUEST } from 'constants/productConstants'
import { PRODUCT_DELETE_SUCCESS } from 'constants/productConstants'
import { PRODUCT_ALL_LIST_SUCCESS } from 'constants/productConstants'
import { PRODUCT_ALL_LIST_FAIL } from 'constants/productConstants'
import { PRODUCT_ALL_LIST_REQUEST } from 'constants/productConstants'
import { PRODUCT_DELETE_FAIL } from 'constants/productConstants'
import { PRODUCT_UPDATE_RESET } from 'constants/productConstants'
import { PRODUCT_UPDATE_SUCCESS } from 'constants/productConstants'
import { PRODUCT_DETAILS_FAIL } from 'constants/productConstants'
import { PRODUCT_DETAILS_REQUEST } from 'constants/productConstants'
import { PRODUCT_LIST_SUCCESS } from 'constants/productConstants'
import { PRODUCT_CREATE_RESET } from 'constants/productConstants'
import { PRODUCT_CREATE_SUCCESS } from 'constants/productConstants'
import { PRODUCT_CREATE_REQUEST } from 'constants/productConstants'

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST: // reducer while loading
      return { loading: true }
    case PRODUCT_CREATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_CREATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case PRODUCT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST: // reducer while loading
      return { loading: true }
    case PRODUCT_UPDATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, product: action.payload }
    case PRODUCT_UPDATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case PRODUCT_UPDATE_RESET: // reducer when fail
      return { product: {} }
    default:
      return state
  }
}

export const productDeleteReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST: // reducer while loading
      return { loading: true, ...state }
    case PRODUCT_DETAILS_SUCCESS: // reducer when successfull
      return { loading: false, product: action.payload } // put data from action(payload) to products
    case PRODUCT_DETAILS_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productListReducer = (
  state = { products: [], active: 1 },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST: // reducer while loading
      return { loading: true, products: [] }
    case PRODUCT_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        active: action.payload.active,
      } // put data from action(payload) to products
    case PRODUCT_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const productAllListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_ALL_LIST_REQUEST: // reducer while loading
      return { loading: true, products: [] }
    case PRODUCT_ALL_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        products: action.payload,
      } // put data from action(payload) to products
    case PRODUCT_ALL_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
