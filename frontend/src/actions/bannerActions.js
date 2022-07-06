import axios from 'axios'
import { BANNER_LIST_REQUEST } from 'constants/bannerConstants'
import { BANNER_LIST_FAIL } from 'constants/bannerConstants'
import { BANNER_DETAILS_SUCCESS } from 'constants/bannerConstants'
import { BANNER_UPDATE_REQUEST } from 'constants/bannerConstants'
import { BANNER_UPDATE_FAIL } from 'constants/bannerConstants'
import { BANNER_DELETE_SUCCESS } from 'constants/bannerConstants'
import { BANNER_DELETE_FAIL } from 'constants/bannerConstants'
import { BANNER_DELETE_REQUEST } from 'constants/bannerConstants'
import { BANNER_UPDATE_SUCCESS } from 'constants/bannerConstants'
import { BANNER_DETAILS_FAIL } from 'constants/bannerConstants'
import { BANNER_DETAILS_REQUEST } from 'constants/bannerConstants'
import { BANNER_LIST_SUCCESS } from 'constants/bannerConstants'
import { BANNER_CREATE_FAIL } from 'constants/bannerConstants'
import { BANNER_CREATE_SUCCESS } from 'constants/bannerConstants'
import { BANNER_CREATE_REQUEST } from 'constants/bannerConstants'

export const createBanner = (banner) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: BANNER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post('/api/banners', banner, config)

    //creating sample product data

    dispatch({
      type: BANNER_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BANNER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listBanner =
  (pageNumber = '', activePage) =>
  async (dispatch, getState) => {
    // returning a function in a function
    try {
      dispatch({ type: BANNER_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(
        `/api/banners?pageNumber=${pageNumber}`,
        config
      )

      console.log(data)

      dispatch({
        type: BANNER_LIST_SUCCESS,
        payload: {
          banners: data.banners,
          page: data.page,
          pages: data.pages,
          active: activePage,
        }, // give data to payload in reducer
      })
    } catch (error) {
      dispatch({
        type: BANNER_LIST_FAIL,
        payload:
          error.response && error.response.data.message // if true then give middleware error message else give catch error message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listBannerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BANNER_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/banners/${id}`) // getting data in action for passing to reducer

    dispatch({
      type: BANNER_DETAILS_SUCCESS,
      payload: data, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: BANNER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateBanner = (banner) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: BANNER_UPDATE_REQUEST,
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
      `/api/banners/${banner._id}`,
      banner,
      config
    ) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: BANNER_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BANNER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteBanner = (id) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: BANNER_DELETE_REQUEST,
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
    const { data } = await axios.delete(`/api/banners/${id}`, config) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: BANNER_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BANNER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}
