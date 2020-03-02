import cookie from "cookie_js"
const adminToken = "admin_token"
const UserInfo = "admin_info"
export function getToken() {
  return cookie.get(adminToken)
}

export function setToken(token) {
  cookie.set(adminToken, token)
}

export function removeToken() {
  cookie.remove(adminToken)
}

export function setUserInfo(userinfo) {
  cookie.set(UserInfo, userinfo)
}
export function getUserInfo() {
  return cookie.get(UserInfo)
}
export function removeUserInfo(token) {
  cookie.remove(UserInfo)
}
