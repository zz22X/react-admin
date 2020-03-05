import service from "../utils/request"

export function getLogin(data) {
  return service.request({
    url: "/users/login",
    method: "post",
    data
  })
}
