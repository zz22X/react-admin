
export default [
  {
    title: '首页',
    key: 'home',
    icon: 'icon-home',
    path: '/admin/home'
  },
  {
    title: '商品',
    key: 'appstore',
    icon: 'icon-appstore',
    children: [
      {
        title: '分类管理',
        key: 'category',
        icon: 'icon-bars',
        path: '/admin/appstore/category'

      },
      {
        title: '商品管理',
        key: 'product',
        icon: 'icon-tool',
        path: '/admin/appstore/product'

      }
    ]
  },
  {
    title: '用户管理',
    key: 'user',
    icon: 'icon-user',
    path: '/admin/user'
  },
  {
    title: '角色管理',
    key: 'role',
    icon: 'icon-mg-role',
    path: '/admin/role'
  },
  {
    title: '图形图表',
    key: 'charts',
    icon: 'icon-areachart',
    children: [
      {
        title: '饼图',
        key: 'pie',
        icon: 'icon-piechart-circle-fil',
        path: '/admin/charts/pie'

      }
    ]
  }
]
