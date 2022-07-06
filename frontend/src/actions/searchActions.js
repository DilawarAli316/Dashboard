import axios from 'axios'
import { FILTERED_LIST_REQUEST } from 'constants/searchConstants'
import { FILTERED_LIST_FAIL } from 'constants/searchConstants'
import { FILTERED_LIST_SUCCESS } from 'constants/searchConstants'
import { SEARCH_LIST_FAIL } from 'constants/searchConstants'
import { SEARCH_LIST_SUCCESS } from 'constants/searchConstants'
import { SEARCH_LIST_REQUEST } from 'constants/searchConstants'

export const listAllSearch = (search) => async (dispatch, getState) => {
  // returning a function in a function

  search =
    search === 'product' ? 'products' : search == null ? 'products' : search

  console.log(search)

  try {
    dispatch({ type: SEARCH_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/${search}/app`, config)

    // console.log(data)

    dispatch({
      type: SEARCH_LIST_SUCCESS,
      payload: data, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: SEARCH_LIST_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listSearch = (filteredList) => async (dispatch, getState) => {
  // returning a function in a function

  try {
    dispatch({ type: FILTERED_LIST_REQUEST })

    dispatch({
      type: FILTERED_LIST_SUCCESS,
      payload: filteredList, // give data to payload in reducer
    })
  } catch (error) {
    dispatch({
      type: FILTERED_LIST_FAIL,
      payload:
        error.response && error.response.data.message // if true then give middleware error message else give catch error message
          ? error.response.data.message
          : error.message,
    })
  }
}

// export const listSearch =
//   (
//     keyword = '',
//     productPage = '',
//     categoryPage = '',
//     typePage = '',
//     brandPage = ''
//   ) =>
//   async (dispatch, getState) => {
//     // returning a function in a function
//     try {
//       dispatch({ type: SEARCH_LIST_REQUEST })

//       const {
//         userLogin: { userInfo },
//       } = getState()

//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       }

//       const { data } = await axios.get(
//         `/api/search/admin?keyword=${keyword}&productPage=${productPage}&categoryPage=${categoryPage}&typePage=${typePage}&brandPage=${brandPage}`,
//         config
//       )

//       // console.log(data)

//       dispatch({
//         type: SEARCH_LIST_SUCCESS,
//         payload: {
//           products: data.products,
//           categories: data.categories,
//           types: data.types,
//           brands: data.brands,
//         }, // give data to payload in reducer
//       })
//     } catch (error) {
//       dispatch({
//         type: SEARCH_LIST_FAIL,
//         payload:
//           error.response && error.response.data.message // if true then give middleware error message else give catch error message
//             ? error.response.data.message
//             : error.message,
//       })
//     }
//   }
