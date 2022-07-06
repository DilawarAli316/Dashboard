import { BANNER_CREATE_FAIL } from 'constants/bannerConstants'
import { BANNER_LIST_REQUEST } from 'constants/bannerConstants'
import { BANNER_LIST_FAIL } from 'constants/bannerConstants'
import { BANNER_DETAILS_SUCCESS } from 'constants/bannerConstants'
import { BANNER_UPDATE_REQUEST } from 'constants/bannerConstants'
import { BANNER_UPDATE_FAIL } from 'constants/bannerConstants'
import { BANNER_DELETE_REQUEST } from 'constants/bannerConstants'
import { BANNER_DELETE_FAIL } from 'constants/bannerConstants'
import { BANNER_DELETE_SUCCESS } from 'constants/bannerConstants'
import { BANNER_UPDATE_RESET } from 'constants/bannerConstants'
import { BANNER_UPDATE_SUCCESS } from 'constants/bannerConstants'
import { BANNER_DETAILS_FAIL } from 'constants/bannerConstants'
import { BANNER_DETAILS_REQUEST } from 'constants/bannerConstants'
import { BANNER_LIST_SUCCESS } from 'constants/bannerConstants'
import { BANNER_CREATE_RESET } from 'constants/bannerConstants'
import { BANNER_CREATE_SUCCESS } from 'constants/bannerConstants'
import { BANNER_CREATE_REQUEST } from 'constants/bannerConstants'

export const bannerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_CREATE_REQUEST: // reducer while loading
      return { loading: true }
    case BANNER_CREATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, banner: action.payload }
    case BANNER_CREATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case BANNER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const bannerListReducer = (
  state = { banners: [], active: 1 },
  action
) => {
  switch (action.type) {
    case BANNER_LIST_REQUEST: // reducer while loading
      return { loading: true, banners: [] }
    case BANNER_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        banners: action.payload.banners,
        page: action.payload.page,
        pages: action.payload.pages,
        active: action.payload.active,
      }
    case BANNER_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const bannerDetailsReducer = (state = { banner: {} }, action) => {
  switch (action.type) {
    case BANNER_DETAILS_REQUEST: // reducer while loading
      return { loading: true, ...state }
    case BANNER_DETAILS_SUCCESS: // reducer when successfull
      return { loading: false, banner: action.payload } // put data from action(payload) to products
    case BANNER_DETAILS_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const bannerUpdateReducer = (state = { banner: {} }, action) => {
  switch (action.type) {
    case BANNER_UPDATE_REQUEST: // reducer while loading
      return { loading: true }
    case BANNER_UPDATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, banner: action.payload }
    case BANNER_UPDATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case BANNER_UPDATE_RESET: // reducer when fail
      return { banner: {} }
    default:
      return state
  }
}

export const bannerDeleteReducer = (state = { banner: {} }, action) => {
  switch (action.type) {
    case BANNER_DELETE_REQUEST:
      return { loading: true }
    case BANNER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case BANNER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
