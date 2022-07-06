import { SEARCH_LIST_FAIL } from 'constants/searchConstants'
import { FILTERED_LIST_SUCCESS } from 'constants/searchConstants'
import { FILTERED_LIST_FAIL } from 'constants/searchConstants'
import { FILTERED_LIST_REQUEST } from 'constants/searchConstants'
import { SEARCH_LIST_SUCCESS } from 'constants/searchConstants'
import { SEARCH_LIST_REQUEST } from 'constants/searchConstants'

// export const searchListReducer = (
//   state = { products: [], categories: [], types: [], brands: [] },
//   action
// ) => {
//   console.log(action.payload)
//   switch (action.type) {
//     case SEARCH_LIST_REQUEST: // reducer while loading
//       return {
//         loading: true,
//         products: [],
//         categories: [],
//         types: [],
//         brands: [],
//       }
//     case SEARCH_LIST_SUCCESS: // reducer when successfull
//       return {
//         loading: false,
//         products: action.payload.products,
//         categories: action.payload.categories,
//         types: action.payload.types,
//         brands: action.payload.brands,
//       } // put data from action(payload) to products
//     case SEARCH_LIST_FAIL: // reducer when fail
//       return { loading: false, error: action.payload }
//     default:
//       return state
//   }
// }

export const searchListReducer = (state = { search: [] }, action) => {
  switch (action.type) {
    case SEARCH_LIST_REQUEST: // reducer while loading
      return { loading: true, search: [] }
    case SEARCH_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        search: action.payload,
      } // put data from action(payload) to products
    case SEARCH_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const filteredListReducer = (state = { filterList: [] }, action) => {
  switch (action.type) {
    case FILTERED_LIST_REQUEST: // reducer while loading
      return { loading: true, filterList: [] }
    case FILTERED_LIST_SUCCESS: // reducer when successfull
      return {
        loading: false,
        filterList: action.payload,
      } // put data from action(payload) to products
    case FILTERED_LIST_FAIL: // reducer when fail
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
