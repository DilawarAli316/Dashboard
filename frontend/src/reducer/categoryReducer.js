import { CATEGORY_LIST_FAIL } from 'constants/categoryConstants'
import { CATEGORY_CREATE_SUCCESS } from 'constants/categoryConstants'
import { CATEGORY_CREATE_RESET } from 'constants/categoryConstants'
import { CATEGORY_DELETE_SUCCESS } from 'constants/categoryConstants'
import { CATEGORY_DETAILS_REQUEST } from 'constants/categoryConstants'
import { CATEGORY_DETAILS_FAIL } from 'constants/categoryConstants'
import { CATEGORY_UPDATE_SUCCESS } from 'constants/categoryConstants'
import { CATEGORY_UPDATE_RESET } from 'constants/categoryConstants'
import { CATEGORY_UPDATE_FAIL } from 'constants/categoryConstants'
import { CATEGORY_UPDATE_REQUEST } from 'constants/categoryConstants'
import { CATEGORY_DETAILS_SUCCESS } from 'constants/categoryConstants'
import { CATEGORY_DELETE_FAIL } from 'constants/categoryConstants'
import { CATEGORY_DELETE_REQUEST } from 'constants/categoryConstants'
import { CATEGORY_CREATE_FAIL } from 'constants/categoryConstants'
import { CATEGORY_CREATE_REQUEST } from 'constants/categoryConstants'
import { CATEGORY_LIST_SUCCESS } from 'constants/categoryConstants'
import { CATEGORY_LIST_REQUEST } from 'constants/categoryConstants'

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST: // reducer while loading
      return { loading: true }
    case CATEGORY_CREATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, category: action.payload }
    case CATEGORY_CREATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case CATEGORY_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const categoryListReducer = (
  state = { categories: [], active: 1 },
  action
) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST: // reducer while loading
      return { loading: true, categories: [] }
    case CATEGORY_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        categories: action.payload.categories,
        page: action.payload.page,
        pages: action.payload.pages,
        active: action.payload.active,
      }
    case CATEGORY_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryDetailsReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST: // reducer while loading
      return { loading: true, ...state }
    case CATEGORY_DETAILS_SUCCESS: // reducer when successfull
      return { loading: false, category: action.payload } // put data from action(payload) to products
    case CATEGORY_DETAILS_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const categoryUpdateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST: // reducer while loading
      return { loading: true }
    case CATEGORY_UPDATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, category: action.payload }
    case CATEGORY_UPDATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case CATEGORY_UPDATE_RESET: // reducer when fail
      return { category: {} }
    default:
      return state
  }
}

export const categoryDeleteReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true }
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true }
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
