import axios from 'axios'
import { NOTIFICATION_UPDATE_REQUEST } from 'constants/notificationConstants'
import { NOTIFICATION_UPDATE_FAIL } from 'constants/notificationConstants'
import { NOTIFICATION_UPDATE_SUCCESS } from 'constants/notificationConstants'
import { NOTIFICATION_LIST_FAIL } from 'constants/notificationConstants'
import { NOTIFICATION_LIST_SUCCESS } from 'constants/notificationConstants'
import { NOTIFICATION_LIST_REQUEST } from 'constants/notificationConstants'

export const listNotification =
  (pageNumber = '') =>
  async (dispatch, getState) => {
    // returning a function in a function
    try {
      dispatch({ type: NOTIFICATION_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(
        `/api/notification?pageNumber=${pageNumber}`,
        config
      )

      dispatch({
        type: NOTIFICATION_LIST_SUCCESS,
        payload: {
          notifications: data.notifications,
          page: data.page,
          pages: data.pages,
        }, // give data to payload in reducer
      })
    } catch (error) {
      dispatch({
        type: NOTIFICATION_LIST_FAIL,
        payload:
          error.response && error.response.data.message // if true then give middleware error message else give catch error message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateNotification =
  (notification) => async (dispatch, getState) => {
    console.log(notification)
    // get state would get token from userInfo
    try {
      dispatch({
        type: NOTIFICATION_UPDATE_REQUEST,
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
        `/api/notification/order/${notification.id}`,
        { read: notification.read },
        config
      ) // for profile /api/users/profile || for user /api/users/id

      dispatch({
        type: NOTIFICATION_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: NOTIFICATION_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message // if true then give middleware error message else give catch error message
            ? error.response.data.message
            : error.message,
      })
    }
  }
