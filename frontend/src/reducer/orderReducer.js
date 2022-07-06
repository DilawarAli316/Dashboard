import { ORDER_DETAILS_SUCCESS } from 'constants/orderConstants'
import { ORDER_DELIVER_REQUEST } from 'constants/orderConstants'
import { ORDER_DELIVER_FAIL } from 'constants/orderConstants'
import { ORDER_ALL_LIST_FAIL } from 'constants/orderConstants'
import { ORDER_ALL_LIST_SUCCESS } from 'constants/orderConstants'
import { ORDER_ALL_LIST_REQUEST } from 'constants/orderConstants'
import { ORDER_DELIVER_RESET } from 'constants/orderConstants'
import { ORDER_DELIVER_SUCCESS } from 'constants/orderConstants'
import { ORDER_DETAILS_FAIL } from 'constants/orderConstants'
import { ORDER_DETAILS_REQUEST } from 'constants/orderConstants'
import {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
} from 'constants/orderConstants.js'

export const orderListReducer = (state = { orders: [], active: 1 }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST: // reducer while loading
      return { loading: true, orders: [] }
    case ORDER_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        orders: action.payload.orders,
        page: action.payload.page,
        pages: action.payload.pages,
        active: action.payload.active,
      } // put data from action(payload) to products
    case ORDER_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [] },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, order: {}, loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true }
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true }
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

export const orderAllListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ALL_LIST_REQUEST: // reducer while loading
      return { loading: true, orders: [] }
    case ORDER_ALL_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        orders: action.payload,
      } // put data from action(payload) to products
    case ORDER_ALL_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
