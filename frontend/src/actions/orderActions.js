import { ORDER_LIST_FAIL } from 'constants/orderConstants'
import { ORDER_LIST_SUCCESS } from 'constants/orderConstants'
import { ORDER_LIST_REQUEST } from 'constants/orderConstants'
import axios from 'axios'
import { ORDER_DETAILS_REQUEST } from 'constants/orderConstants'
import { ORDER_DETAILS_SUCCESS } from 'constants/orderConstants'
import { ORDER_DETAILS_FAIL } from 'constants/orderConstants'
import { ORDER_DELIVER_REQUEST } from 'constants/orderConstants'
import { ORDER_DELIVER_SUCCESS } from 'constants/orderConstants'
import { ORDER_DELIVER_FAIL } from 'constants/orderConstants'
import { ORDER_ALL_LIST_REQUEST } from 'constants/orderConstants'
import { ORDER_ALL_LIST_SUCCESS } from 'constants/orderConstants'
import { ORDER_ALL_LIST_FAIL } from 'constants/orderConstants'

export const listAllOrders = () => async (dispatch, getState) => {
  // returning a function in a function
  try {
    dispatch({ type: ORDER_ALL_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/orders/app', config)

    // console.log(data)

    dispatch({
      type: ORDER_ALL_LIST_SUCCESS,
      payload: data, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: ORDER_ALL_LIST_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listOrders =
  (pageNumber = '', activePage) =>
  async (dispatch, getState) => {
    // get state would get token from userInfo
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/orders?pageNumber=${pageNumber}`,
        config
      ) // for profile /api/users/profile || for user /api/users/id

      console.log(data)

      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: {
          orders: data.orders,
          page: data.page,
          pages: data.pages,
          active: activePage,
        },
      })
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message // if true then give middleware error message else give catch error message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const getOrderDetails = (id) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders/${id}`, config) // for profile /api/users/profile || for user /api/users/id

    console.log(data)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deliverOrder = (order, status) => async (dispatch, getState) => {
  // get state would get token from userInfo

  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/status/${order._id}`,
      { status },
      // send the paypal result to backend
      config
    ) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}
