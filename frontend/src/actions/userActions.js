import axios from 'axios'
import { USER_LOGIN_FAIL } from 'constants/userConstants'
import { USER_DELETE_SUCCESS } from 'constants/userConstants'
import { USER_DETAILS_REQUEST } from 'constants/userConstants'
import { USER_DETAILS_FAIL } from 'constants/userConstants'
import { USER_UPDATE_SUCCESS } from 'constants/userConstants'
import { USER_ALL_LIST_REQUEST } from 'constants/userConstants'
import { USER_ALL_LIST_FAIL } from 'constants/userConstants'
import { USER_ALL_LIST_SUCCESS } from 'constants/userConstants'
import { USER_UPDATE_FAIL } from 'constants/userConstants'
import { USER_UPDATE_REQUEST } from 'constants/userConstants'
import { USER_DETAILS_SUCCESS } from 'constants/userConstants'
import { USER_DELETE_FAIL } from 'constants/userConstants'
import { USER_DELETE_REQUEST } from 'constants/userConstants'
import { USER_LOGIN_SUCCESS } from 'constants/userConstants'
import { USER_LOGIN_REQUEST } from 'constants/userConstants'
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
} from 'constants/userConstants'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      // sending post req to backend and getting user data from it
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data, // dispatch data in userInfo (userReducer)
    })

    localStorage.setItem('userInfo', JSON.stringify(data)) // save user data (getting from backend) to localstorage
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}

export const listAllUsers = () => async (dispatch, getState) => {
  // returning a function in a function
  try {
    dispatch({ type: USER_ALL_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/users/app', config)

    // console.log(data)

    dispatch({
      type: USER_ALL_LIST_SUCCESS,
      payload: data, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: USER_ALL_LIST_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listUser =
  (pageNumber = '', activePage) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_LIST_REQUEST,
      })

      const {
        userLogin: { userInfo },
      } = getState()

      console.log(userInfo)

      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }
      const { data } = await axios.get(
        `/api/users?pageNumber=${pageNumber}`,
        config
      ) // for profile /api/users/profile || for user /api/users/id

      dispatch({
        type: USER_LIST_SUCCESS,
        payload: {
          users: data.users,
          page: data.page,
          pages: data.pages,
          active: activePage,
        },
      })
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message // if true then give middleware error message else give catch error message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/users/${id}`)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
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
    const { data } = await axios.put(`/api/users/${user._id}`, user, config) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
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
    const { data } = await axios.delete(`/api/users/${id}`, config) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}
