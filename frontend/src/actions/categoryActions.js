import axios from 'axios'
import { CATEGORY_CREATE_REQUEST } from 'constants/categoryConstants'
import { CATEGORY_CREATE_FAIL } from 'constants/categoryConstants'
import { CATEGORY_DELETE_SUCCESS } from 'constants/categoryConstants'
import { CATEGORY_DETAILS_FAIL } from 'constants/categoryConstants'
import { CATEGORY_DETAILS_REQUEST } from 'constants/categoryConstants'
import { CATEGORY_UPDATE_SUCCESS } from 'constants/categoryConstants'
import { CATEGORY_UPDATE_FAIL } from 'constants/categoryConstants'
import { CATEGORY_UPDATE_REQUEST } from 'constants/categoryConstants'
import { CATEGORY_DETAILS_SUCCESS } from 'constants/categoryConstants'
import { CATEGORY_DELETE_FAIL } from 'constants/categoryConstants'
import { CATEGORY_DELETE_REQUEST } from 'constants/categoryConstants'
import { CATEGORY_CREATE_SUCCESS } from 'constants/categoryConstants'
import { CATEGORY_LIST_FAIL } from 'constants/categoryConstants'
import { CATEGORY_LIST_SUCCESS } from 'constants/categoryConstants'
import { CATEGORY_LIST_REQUEST } from 'constants/categoryConstants'

export const createCategory = (category) => async (dispatch, getState) => {
  console.log(category)
  // get state would get token from userInfo
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post('/api/category', category, config)

    //creating sample product data

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listCategory =
  (pageNumber = '', activePage) =>
  async (dispatch, getState) => {
    // returning a function in a function
    try {
      dispatch({ type: CATEGORY_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(
        `/api/category?pageNumber=${pageNumber}`,
        config
      )

      console.log(data)

      dispatch({
        type: CATEGORY_LIST_SUCCESS,
        payload: {
          categories: data.categories,
          page: data.page,
          pages: data.pages,
          active: activePage,
        }, // give data to payload in reducer
      })
    } catch (error) {
      dispatch({
        type: CATEGORY_LIST_FAIL,
        payload:
          error.response && error.response.data.message // if true then give middleware error message else give catch error message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/category/${id}`) // getting data in action for passing to reducer

    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateCategory = (category) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: CATEGORY_UPDATE_REQUEST,
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
      `/api/category/${category._id}`,
      category,
      config
    ) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteCategory = (id) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST,
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
    const { data } = await axios.delete(`/api/category/${id}`, config) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}
