//redux中的reducer 用于真正去加工状态,获取到 preState action
import {
  SAVE_USERINFO, DELETE_USERINFO
} from '../action_types'
import {
  getToken
} from '../../utils/app'
//引入 action_type 
let userinfo = JSON.parse(localStorage.getItem("admin_info"))
let initState = {
  user: userinfo || {},
  token: getToken() || '',
  isLogin: userinfo && getToken()? true: false
}
export default function (preState = initState, action) {
  const {
    type,
    data
  } = action
  let newState
  switch (type) {
    case SAVE_USERINFO:
      newState = {
        user: data,
        token: data.token,
        isLogin: initState.isLogin
      }
      return newState;
    case DELETE_USERINFO:
    newState = {
      user: {},
      token: "",
      isLogin: false
    }
    return newState
    default:
      return preState;
  }
}