//用于专门制造action对象
import {
  SAVE_USERINFO, DELETE_USERINFO
} from "../action_types"
import {
  setToken, removeToken
} from '../../utils/app'
export const saveUserInfo = (value) => {
  localStorage.setItem("admin_info", JSON.stringify(value))
  setToken(value.token)
  return {
    type: SAVE_USERINFO,
    data: value
  }
}
export const deleteUserInfo = (value) => {
  localStorage.removeItem("admin_info")
  removeToken()
  return {
    type: DELETE_USERINFO,
    data: ""
  }
}