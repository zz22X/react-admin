//用于专门制造action对象
import {
  SAVE_USERINFO, DELETE_USERINFO
} from "../action_types"
export const saveUserInfo = (value) => {
  // localStorage.setItem("admin_info", JSON.stringify(value))
  // localStorage.setItem("admin_token", JSON.stringify(value.token))
  return {
    type: SAVE_USERINFO,
    data: value,
  }
}
export const deleteUserInfo = (value) => {
  return {
    type: DELETE_USERINFO,
    data: "",
  }
}