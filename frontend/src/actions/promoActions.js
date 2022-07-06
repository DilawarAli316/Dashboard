import axios from 'axios'
import { PROMO_DELETE_REQUEST } from 'constants/promoConstants'
import { PROMO_DELETE_FAIL } from 'constants/promoConstants'
import { PROMO_UPDATE_SUCCESS } from 'constants/promoConstants'
import { PROMO_DETAILS_REQUEST } from 'constants/promoConstants'
import { PROMO_DETAILS_FAIL } from 'constants/promoConstants'
import { PROMO_CREATE_SUCCESS } from 'constants/promoConstants'
import { PROMO_CREATE_FAIL } from 'constants/promoConstants'
import { PROMO_CREATE_REQUEST } from 'constants/promoConstants'
import { PROMO_DETAILS_SUCCESS } from 'constants/promoConstants'
import { PROMO_UPDATE_FAIL } from 'constants/promoConstants'
import { PROMO_UPDATE_REQUEST } from 'constants/promoConstants'
import { PROMO_DELETE_SUCCESS } from 'constants/promoConstants'
import { PROMO_LIST_FAIL } from 'constants/promoConstants'
import { PROMO_LIST_SUCCESS } from 'constants/promoConstants'
import { PROMO_LIST_REQUEST } from 'constants/promoConstants'

export const listPromo =
  (pageNumber = '') =>
  async (dispatch, getState) => {
    // returning a function in a function
    try {
      dispatch({ type: PROMO_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(
        `/api/promo?pageNumber=${pageNumber}`,
        config
      )

      // console.log(data)

      dispatch({
        type: PROMO_LIST_SUCCESS,
        payload: {
          promo: data.promo,
          page: data.page,
          pages: data.pages,
        }, // give data to payload in reducer
      })
    } catch (error) {
      dispatch({
        type: PROMO_LIST_FAIL,
        payload:
          error.response && error.response.data.message // if true then give middleware error message else give catch error message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const createPromo = (promo) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: PROMO_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post('/api/promo', promo, config)

    dispatch({
      type: PROMO_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROMO_CREATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPromoDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROMO_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/promo/${id}`, config) // getting data in action for passing to reducer

    dispatch({
      type: PROMO_DETAILS_SUCCESS,
      payload: data, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: PROMO_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePromo = (promo) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: PROMO_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/promo/${promo._id}`, promo, config) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: PROMO_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROMO_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePromo = (id) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: PROMO_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.delete(`/api/promo/${id}`, config) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: PROMO_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROMO_DELETE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}
