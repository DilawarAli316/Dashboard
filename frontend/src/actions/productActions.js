import React, { useState } from 'react'
import axios from 'axios'

import { PRODUCT_LIST_SUCCESS } from 'constants/productConstants'
import { PRODUCT_LIST_REQUEST } from 'constants/productConstants'
import { PRODUCT_LIST_FAIL } from 'constants/productConstants'
import { PRODUCT_CREATE_FAIL } from 'constants/productConstants'
import { PRODUCT_CREATE_SUCCESS } from 'constants/productConstants'
import { PRODUCT_CREATE_REQUEST } from 'constants/productConstants'
import { PRODUCT_DETAILS_REQUEST } from 'constants/productConstants'
import { PRODUCT_DETAILS_SUCCESS } from 'constants/productConstants'
import { PRODUCT_DETAILS_FAIL } from 'constants/productConstants'
import { PRODUCT_UPDATE_REQUEST } from 'constants/productConstants'
import { PRODUCT_UPDATE_SUCCESS } from 'constants/productConstants'
import { PRODUCT_UPDATE_FAIL } from 'constants/productConstants'
import { PRODUCT_DELETE_REQUEST } from 'constants/productConstants'
import { PRODUCT_DELETE_SUCCESS } from 'constants/productConstants'
import { PRODUCT_ALL_LIST_REQUEST } from 'constants/productConstants'
import { PRODUCT_ALL_LIST_SUCCESS } from 'constants/productConstants'
import { PRODUCT_ALL_LIST_FAIL } from 'constants/productConstants'

export const listAllProducts = () => async (dispatch, getState) => {
  // returning a function in a function
  try {
    dispatch({ type: PRODUCT_ALL_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/products/app', config)

    // console.log(data)

    dispatch({
      type: PRODUCT_ALL_LIST_SUCCESS,
      payload: data, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_ALL_LIST_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProduct =
  (keyword = '', pageNumber = '', activePage) =>
  async (dispatch, getState) => {
    // returning a function in a function
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      console.log(userInfo)

      const config = {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      }

      let data = []

      // getting data in action for passing to reducer
      axios
        .get(`/api/products?pageNumber=${pageNumber}`, config)
        .then((response) => {
          response.data.products.map((el) => {
            axios.get('/api/category/' + el.categoryId).then((res) => {
              // data.push({ ...res.data, ...el })
              axios.get('/api/type/' + el.typeId).then((tres) => {
                // console.log(tres.data)
                // data.push({ ...tres.data, ...res.data, ...el })

                axios.get('/api/brand/' + el.brandId).then((bres) => {
                  // console.log(bres.data)
                  data.push({ ...bres.data, ...tres.data, ...res.data, ...el })

                  // console.log({
                  //   products: data,
                  //   page: response.data.page,
                  //   pages: response.data.pages,
                  // })
                  dispatch({
                    type: PRODUCT_LIST_SUCCESS,
                    payload: {
                      products: data,
                      page: response.data.page,
                      pages: response.data.pages,
                      active: activePage,
                    }, // give data to payload in reducer
                  })
                })
              })
            })
          })
        })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message // if true then give middleware error message else give catch error message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const createProduct = (product) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post('/api/products', product, config)

    //creating sample product data

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/products/${id}`, config) // getting data in action for passing to reducer

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST,
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
      `/api/products/${product._id}`,
      product,
      config
    ) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  // get state would get token from userInfo
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
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
    const { data } = await axios.delete(`/api/products/${id}`, config) // for profile /api/users/profile || for user /api/users/id

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}
