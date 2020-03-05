import service from "../utils/request"

//匹配角色
export function matchRole(data) {
  return service.request({
    url: "/role/matchrole",
    method: "post",
    data
  })
}
//商品 分类管理 编辑分类
export function EditCate(data) {
  return service.request({
    url: "/cate/editcate",
    method: "post",
    data
  })
}
//商品 分类管理 获取分类
export function GetallCate() {
  return service.request({
    url: "/cate/getallcate",
    method: "get"
  })
}
//商品 分类管理 新增分类
export function AddCate(data) {
  return service.request({
    url: "/cate/addcate",
    method: "post",
    data
  })
}
//商品 商品管理 获取商品列表
export function GetProduct(data) {
  return service.request({
    url: "/product/getallproduct",
    method: "post",
    data
  })
}

