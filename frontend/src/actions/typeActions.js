import axios from 'axios'
import { TYPE_CREATE_REQUEST } from 'constants/typeConstants'
import { TYPE_CREATE_FAIL } from 'constants/typeConstants'
import { TYPE_DELETE_SUCCESS } from 'constants/typeConstants'
import { TYPE_DETAILS_REQUEST } from 'constants/typeConstants'
import { TYPE_DETAILS_FAIL } from 'constants/typeConstants'
import { TYPE_UPDATE_SUCCESS } from 'constants/typeConstants'
import { TYPE_UPDATE_FAIL } from 'constants/typeConstants'
import { TYPE_UPDATE_REQUEST } from 'constants/typeConstants'
import { TYPE_DETAILS_SUCCESS } from 'constants/typeConstants'
import { TYPE_DELETE_FAIL } from 'constants/typeConstants'
import { TYPE_DELETE_REQUEST } from 'constants/typeConstants'
import { TYPE_CREATE_SUCCESS } from 'constants/typeConstants'
import { TYPE_LIST_FAIL } from 'constants/typeConstants'
import { TYPE_LIST_SUCCESS } from 'constants/typeConstants'
import { TYPE_LIST_REQUEST } from 'constants/typeConstants'

export const createType = (type) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: TYPE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post('/api/type', type, config)

    //creating sample product data

    dispatch({
      type: TYPE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TYPE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listType =
  (pageNumber = '', activePage) =>
  async (dispatch, getState) => {
    // returning a function in a function
    try {
      dispatch({ type: TYPE_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(
        `/api/type?pageNumber=${pageNumber}`,
        config
      )

      // console.log(data)

      dispatch({
        type: TYPE_LIST_SUCCESS,
        payload: {
          types: data.types,
          page: data.page,
          pages: data.pages,
          active: activePage,
        }, // give data to payload in reducer
      })
    } catch (error) {
      dispatch({
        type: TYPE_LIST_FAIL,
        payload:
          error.response && error.response.data.message // if true then give middleware error message else give catch error message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listTypeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TYPE_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/type/${id}`) // getting data in action for passing to reducer

    dispatch({
      type: TYPE_DETAILS_SUCCESS,
      payload: data, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: TYPE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateType = (type) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: TYPE_UPDATE_REQUEST,
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
    const { data } = await axios.put(`/api/type/${type._id}`, type, config) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: TYPE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TYPE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteType = (id) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: TYPE_DELETE_REQUEST,
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
    const { data } = await axios.delete(`/api/type/${id}`, config) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: TYPE_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: TYPE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}
