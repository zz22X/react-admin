//用于汇总所有的reducer 最终生成一个最终的reducer

//引入reducer
import LoginReducer from './login_reducer'
import AdminReducer from './admin_reducer'
//引入combine
import { combineReducers } from 'redux'

export default combineReducers({
  userInfo: LoginReducer,
  cateList: AdminReducer
})