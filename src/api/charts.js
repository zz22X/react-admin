import service from "../utils/request"
export function getProductdata() {
  return service.request({
    url: "/statistic/productdata",
    method: "get"
  })
}