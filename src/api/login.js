import service from "../utils/request"

export function getLogin(data) {
  return service.request({
    url: "/users/login",
    method: "post",
    data
  })
}


export function getUserInfo() {
  return service.request({
    url: "/users/getUserInfo",
    method: "get"
  })
}
export function AddUserInfo(data) {
  return service.request({
    url: "/users/addUserInfo",
    method: "post",
    data
  })
}
export function DeleteUserInfo(data) {
  return service.request({
    url: "/users/deleteUserInfo",
    method: "post",
    data
  })
}
export function EditUserInfo(data) {
  return service.request({
    url: "/users/editUserInfo",
    method: "post",
    data
  })
}
