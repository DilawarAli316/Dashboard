import axios from 'axios'
import { BRAND_CREATE_REQUEST } from 'constants/brandConstants'
import { BRAND_CREATE_FAIL } from 'constants/brandConstants'
import { BRAND_DELETE_SUCCESS } from 'constants/brandConstants'
import { BRAND_DETAILS_REQUEST } from 'constants/brandConstants'
import { BRAND_DETAILS_FAIL } from 'constants/brandConstants'
import { BRAND_UPDATE_SUCCESS } from 'constants/brandConstants'
import { BRAND_ALL_LIST_REQUEST } from 'constants/brandConstants'
import { BRAND_ALL_LIST_FAIL } from 'constants/brandConstants'
import { BRAND_ALL_LIST_SUCCESS } from 'constants/brandConstants'
import { BRAND_UPDATE_FAIL } from 'constants/brandConstants'
import { BRAND_UPDATE_REQUEST } from 'constants/brandConstants'
import { BRAND_DETAILS_SUCCESS } from 'constants/brandConstants'
import { BRAND_DELETE_FAIL } from 'constants/brandConstants'
import { BRAND_DELETE_REQUEST } from 'constants/brandConstants'
import { BRAND_CREATE_SUCCESS } from 'constants/brandConstants'
import { BRAND_LIST_FAIL } from 'constants/brandConstants'
import { BRAND_LIST_SUCCESS } from 'constants/brandConstants'
import { BRAND_LIST_REQUEST } from 'constants/brandConstants'

export const createBrand = (brand) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: BRAND_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post('/api/brand', brand, config)

    //creating sample product data

    dispatch({
      type: BRAND_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BRAND_CREATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listAllBrands = () => async (dispatch, getState) => {
  // returning a function in a function
  try {
    dispatch({ type: BRAND_ALL_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/brand/app', config)

    console.log(data)

    dispatch({
      type: BRAND_ALL_LIST_SUCCESS,
      payload: data, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: BRAND_ALL_LIST_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listBrand =
  (pageNumber = '', activePage) =>
  async (dispatch, getState) => {
    // returning a function in a function
    try {
      dispatch({ type: BRAND_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(
        `/api/brand?pageNumber=${pageNumber}`,
        config
      )

      console.log(data)

      dispatch({
        type: BRAND_LIST_SUCCESS,
        payload: {
          brands: data.brands,
          page: data.page,
          pages: data.pages,
          active: activePage,
        }, // give data to payload in reducer
      })
    } catch (error) {
      dispatch({
        type: BRAND_LIST_FAIL,
        payload:
          error.response && error.response.data.message // if true then give middleware error message else give catch error message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listBrandDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BRAND_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/brand/${id}`) // getting data in action for passing to reducer

    dispatch({
      type: BRAND_DETAILS_SUCCESS,
      payload: data, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: BRAND_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateBrand = (brand) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: BRAND_UPDATE_REQUEST,
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
    const { data } = await axios.put(`/api/brand/${brand._id}`, brand, config) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: BRAND_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BRAND_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteBrand = (id) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: BRAND_DELETE_REQUEST,
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
    const { data } = await axios.delete(`/api/brand/${id}`, config) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: BRAND_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: BRAND_DELETE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}
