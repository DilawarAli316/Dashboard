import { PROMO_LIST_SUCCESS } from 'constants/promoConstants'
import { PROMO_DELETE_SUCCESS } from 'constants/promoConstants'
import { PROMO_UPDATE_REQUEST } from 'constants/promoConstants'
import { PROMO_UPDATE_FAIL } from 'constants/promoConstants'
import { PROMO_DETAILS_REQUEST } from 'constants/promoConstants'
import { PROMO_DETAILS_FAIL } from 'constants/promoConstants'
import { PROMO_CREATE_SUCCESS } from 'constants/promoConstants'
import { PROMO_CREATE_RESET } from 'constants/promoConstants'
import { PROMO_CREATE_FAIL } from 'constants/promoConstants'
import { PROMO_CREATE_REQUEST } from 'constants/promoConstants'
import { PROMO_DETAILS_SUCCESS } from 'constants/promoConstants'
import { PROMO_UPDATE_RESET } from 'constants/promoConstants'
import { PROMO_UPDATE_SUCCESS } from 'constants/promoConstants'
import { PROMO_DELETE_FAIL } from 'constants/promoConstants'
import { PROMO_DELETE_REQUEST } from 'constants/promoConstants'
import { PROMO_LIST_FAIL } from 'constants/promoConstants'
import { PROMO_LIST_REQUEST } from 'constants/promoConstants'

export const promoListReducer = (state = { promos: [] }, action) => {
  switch (action.type) {
    case PROMO_LIST_REQUEST: // reducer while loading
      return { loading: true, promos: [] }
    case PROMO_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        promos: action.payload.promo,
        page: action.payload.page,
        pages: action.payload.pages,
      }
    case PROMO_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const promoCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROMO_CREATE_REQUEST: // reducer while loading
      return { loading: true }
    case PROMO_CREATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, promo: action.payload }
    case PROMO_CREATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case PROMO_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const promoDetailsReducer = (state = { promo: {} }, action) => {
  switch (action.type) {
    case PROMO_DETAILS_REQUEST: // reducer while loading
      return { loading: true, ...state }
    case PROMO_DETAILS_SUCCESS: // reducer when successfull
      return { loading: false, promo: action.payload } // put data from action(payload) to products
    case PROMO_DETAILS_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const promoUpdateReducer = (state = { promo: {} }, action) => {
  switch (action.type) {
    case PROMO_UPDATE_REQUEST: // reducer while loading
      return { loading: true }
    case PROMO_UPDATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, promo: action.payload }
    case PROMO_UPDATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case PROMO_UPDATE_RESET: // reducer when fail
      return { promo: {} }
    default:
      return state
  }
}

export const promoDeleteReducer = (state = { promo: {} }, action) => {
  switch (action.type) {
    case PROMO_DELETE_REQUEST:
      return { loading: true }
    case PROMO_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PROMO_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
