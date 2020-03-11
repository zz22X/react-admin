import service from "../utils/request"

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

//商品 商品管理 搜索商品列表
export function SearchProduct(data) {
  return service.request({
    url: "/product/searchproduct",
    method: "post",
    data
  })
}

//商品 商品管理 更新商品状态
export function UpdateProStatus(data) {
  return service.request({
    url: "/product/updateprostatus",
    method: "post",
    data
  })
}

//商品 商品管理 添加商品
export function AddProduct(data) {
  return service.request({
    url: "/product/addproduct",
    method: "post",
    data
  })
}
//商品 商品管理 删除商品图片
export function RemovePics(data) {
  return service.request({
    url: "/product/removePics",
    method: "post",
    data
  })
}

//商品 商品管理 添加商品
export function EditProduct(data) {
  return service.request({
    url: "/product/editproduct",
    method: "post",
    data
  })
}


//角色 角色管理 获取角色列表
export function GetRole() {
  return service.request({
    url: "/role/getrole",
    method: "get"
  })
}
//角色 角色管理 添加角色
export function AddRole(data) {
  return service.request({
    url: "/role/addRoleinfo",
    method: "post",
    data
  })
}
//角色 角色管理 设置授权
export function SetPermissions(data) {
  return service.request({
    url: "/role/setpermissions",
    method: "post",
    data
  })
}
//角色 角色管理 设置授权
export function GetRoleOne(data) {
  return service.request({
    url: "/role/getroleone",
    method: "post",
    data
  })
}