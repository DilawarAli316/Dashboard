import axios from 'axios'
import { ANNOUNCE_DELETE_REQUEST } from 'constants/announceConstants'
import { ANNOUNCE_DELETE_FAIL } from 'constants/announceConstants'
import { ANNOUNCE_DETAILS_SUCCESS } from 'constants/announceConstants'
import { ANNOUNCE_UPDATE_REQUEST } from 'constants/announceConstants'
import { ANNOUNCE_UPDATE_FAIL } from 'constants/announceConstants'
import { ANNOUNCE_CREATE_SUCCESS } from 'constants/announceConstants'
import { ANNOUNCE_CREATE_FAIL } from 'constants/announceConstants'
import { ANNOUNCE_CREATE_REQUEST } from 'constants/announceConstants'
import { ANNOUNCE_UPDATE_SUCCESS } from 'constants/announceConstants'
import { ANNOUNCE_DETAILS_FAIL } from 'constants/announceConstants'
import { ANNOUNCE_DETAILS_REQUEST } from 'constants/announceConstants'
import { ANNOUNCE_DELETE_SUCCESS } from 'constants/announceConstants'
import { ANNOUNCE_LIST_FAIL } from 'constants/announceConstants'
import { ANNOUNCE_LIST_SUCCESS } from 'constants/announceConstants'
import { ANNOUNCE_LIST_REQUEST } from 'constants/announceConstants'

export const createAnnounce = (announce) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: ANNOUNCE_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post('/api/announce', announce, config)

    //creating sample product data

    dispatch({
      type: ANNOUNCE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ANNOUNCE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listAnnounce = () => async (dispatch, getState) => {
  // returning a function in a function
  try {
    dispatch({ type: ANNOUNCE_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/announce', config)

    console.log(data)

    dispatch({
      type: ANNOUNCE_LIST_SUCCESS,
      payload: data, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: ANNOUNCE_LIST_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listAnnounceDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ANNOUNCE_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/announce/${id}`, config) // getting data in action for passing to reducer

    dispatch({
      type: ANNOUNCE_DETAILS_SUCCESS,
      payload: data, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: ANNOUNCE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateAnnounce = (announce) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: ANNOUNCE_UPDATE_REQUEST,
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
    const { data } = await axios.put(
      `/api/announce/${announce._id}`,
      announce,
      config
    ) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: ANNOUNCE_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ANNOUNCE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteAnnounce = (id) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: ANNOUNCE_DELETE_REQUEST,
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
    const { data } = await axios.delete(`/api/announce/${id}`, config) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: ANNOUNCE_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ANNOUNCE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}
