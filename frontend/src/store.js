import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk' // use for callback in redux (asynchronous)
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer } from 'reducer/userReducer'
import { productCreateReducer } from 'reducer/productReducer'
import { productListReducer } from 'reducer/productReducer'
import { categoryListReducer } from 'reducer/categoryReducer'
import { brandListReducer } from 'reducer/brandReducer'
import { typeListReducer } from 'reducer/typeReducer'
import { userListReducer } from 'reducer/userReducer'
import { categoryCreateReducer } from 'reducer/categoryReducer'
import { typeCreateReducer } from 'reducer/typeReducer'
import { brandCreateReducer } from 'reducer/brandReducer'
import { productDetailsReducer } from 'reducer/productReducer'
import { productUpdateReducer } from 'reducer/productReducer'
import { productDeleteReducer } from 'reducer/productReducer'
import { categoryDeleteReducer } from 'reducer/categoryReducer'
import { typeDeleteReducer } from 'reducer/typeReducer'
import { brandDeleteReducer } from 'reducer/brandReducer'
import { userDeleteReducer } from 'reducer/userReducer'
import { categoryDetailsReducer } from 'reducer/categoryReducer'
import { categoryUpdateReducer } from 'reducer/categoryReducer'
import { typeDetailsReducer } from 'reducer/typeReducer'
import { typeUpdateReducer } from 'reducer/typeReducer'
import { brandDetailsReducer } from 'reducer/brandReducer'
import { brandUpdateReducer } from 'reducer/brandReducer'
import { userDetailsReducer } from 'reducer/userReducer'
import { userUpdateReducer } from 'reducer/userReducer'
import { orderListReducer } from 'reducer/orderReducer'
import { orderDetailsReducer } from 'reducer/orderReducer'
import { announceListReducer } from 'reducer/announceReducer'
import { announceDeleteReducer } from 'reducer/announceReducer'
import { announceDetailsReducer } from 'reducer/announceReducer'
import { announceUpdateReducer } from 'reducer/announceReducer'
import { announceCreateReducer } from 'reducer/announceReducer'
import { promoListReducer } from 'reducer/promoReducer'
import { promoDeleteReducer } from 'reducer/promoReducer'
import { promoUpdateReducer } from 'reducer/promoReducer'
import { promoDetailsReducer } from 'reducer/promoReducer'
import { promoCreateReducer } from 'reducer/promoReducer'
import { orderDeliverReducer } from 'reducer/orderReducer'
import { productAllListReducer } from 'reducer/productReducer'
import { orderAllListReducer } from 'reducer/orderReducer'
import { userAllListReducer } from 'reducer/userReducer'
import { brandAllListReducer } from 'reducer/brandReducer'
import { notificationListReducer } from 'reducer/notificationReducer'
import { notificationUpdateReducer } from 'reducer/notificationReducer'
import { searchListReducer } from 'reducer/searchReducer'
import { filteredListReducer } from 'reducer/searchReducer'
import { bannerCreateReducer } from 'reducer/bannerReducer'
import { bannerListReducer } from 'reducer/bannerReducer'
import { bannerDeleteReducer } from 'reducer/bannerReducer'
import { bannerUpdateReducer } from 'reducer/bannerReducer'
import { bannerDetailsReducer } from 'reducer/bannerReducer'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['userList', 'productList'],
}

const userListPersistConfig = {
  key: 'userList',
  storage: storage,
  whitelist: ['active'],
}

const productListPersistConfig = {
  key: 'productList',
  storage: storage,
  whitelist: ['active'],
}

const categoryListPersistConfig = {
  key: 'categoryList',
  storage: storage,
  whitelist: ['active'],
}

const typeListPersistConfig = {
  key: 'typeList',
  storage: storage,
  whitelist: ['active'],
}

const brandListPersistConfig = {
  key: 'brandList',
  storage: storage,
  whitelist: ['active'],
}

const orderListPersistConfig = {
  key: 'orderList',
  storage: storage,
  whitelist: ['active'],
}

const reducer = combineReducers({
  userLogin: userLoginReducer,
  productCreate: productCreateReducer,
  productList: persistReducer(productListPersistConfig, productListReducer),
  productAllList: productAllListReducer,
  categoryList: persistReducer(categoryListPersistConfig, categoryListReducer),
  brandList: persistReducer(brandListPersistConfig, brandListReducer),
  typeList: persistReducer(typeListPersistConfig, typeListReducer),
  userList: persistReducer(userListPersistConfig, userListReducer),
  categoryCreate: categoryCreateReducer,
  typeCreate: typeCreateReducer,
  brandCreate: brandCreateReducer,
  bannerCreate: bannerCreateReducer,
  bannerList: bannerListReducer,
  bannerDelete: bannerDeleteReducer,
  bannerUpdate: bannerUpdateReducer,
  bannerDetails: bannerDetailsReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  categoryDelete: categoryDeleteReducer,
  typeDelete: typeDeleteReducer,
  brandDelete: brandDeleteReducer,
  userDelete: userDeleteReducer,
  categoryDetails: categoryDetailsReducer,
  categoryUpdate: categoryUpdateReducer,
  typeDetails: typeDetailsReducer,
  typeUpdate: typeUpdateReducer,
  brandDetails: brandDetailsReducer,
  brandUpdate: brandUpdateReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  orderList: persistReducer(orderListPersistConfig, orderListReducer),
  orderDetails: orderDetailsReducer,
  announceCreate: announceCreateReducer,
  announceList: announceListReducer,
  announceDelete: announceDeleteReducer,
  announceDetails: announceDetailsReducer,
  announceUpdate: announceUpdateReducer,
  promoList: promoListReducer,
  promoDelete: promoDeleteReducer,
  promoUpdate: promoUpdateReducer,
  promoDetails: promoDetailsReducer,
  promoCreate: promoCreateReducer,
  orderDeliver: orderDeliverReducer,
  orderAllList: orderAllListReducer,
  userAllList: userAllListReducer,
  brandAllList: brandAllListReducer,
  notificationList: notificationListReducer,
  notificationUpdate: notificationUpdateReducer,
  searchList: searchListReducer,
  filteredList: filteredListReducer,
})

const pReducer = persistReducer(persistConfig, reducer)

export const store = createStore(
  pReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export const persistor = persistStore(store)
