import { NOTIFICATION_LIST_FAIL } from 'constants/notificationConstants'
import { NOTIFICATION_UPDATE_SUCCESS } from 'constants/notificationConstants'
import { NOTIFICATION_UPDATE_RESET } from 'constants/notificationConstants'
import { NOTIFICATION_UPDATE_FAIL } from 'constants/notificationConstants'
import { NOTIFICATION_UPDATE_REQUEST } from 'constants/notificationConstants'
import { NOTIFICATION_LIST_SUCCESS } from 'constants/notificationConstants'
import { NOTIFICATION_LIST_REQUEST } from 'constants/notificationConstants'

export const notificationListReducer = (
  state = { notifications: [] },
  action
) => {
  switch (action.type) {
    case NOTIFICATION_LIST_REQUEST: // reducer while loading
      return { loading: true, notifications: [] }
    case NOTIFICATION_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        notifications: action.payload.notifications,
        page: action.payload.page,
        pages: action.payload.pages,
      }
    case NOTIFICATION_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const notificationUpdateReducer = (
  state = { notification: {} },
  action
) => {
  switch (action.type) {
    case NOTIFICATION_UPDATE_REQUEST: // reducer while loading
      return { loading: true }
    case NOTIFICATION_UPDATE_SUCCESS: // reducer when successfull
      return { loading: false, success: true, notification: action.payload }
    case NOTIFICATION_UPDATE_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    case NOTIFICATION_UPDATE_RESET: // reducer when fail
      return { notification: {} }
    default:
      return state
  }
}
