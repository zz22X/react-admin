import React, { Component } from 'react'
import Logo from "../../../assets/images/logo.png"
import { connect } from 'react-redux'
import { Menu } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom'
import menu_list from '../../../config/menu_list'
import './css/index.less'
const { SubMenu } = Menu;

@connect(state => ({ usermenu: state.userInfo.user.rolemenu }))
@withRouter
class Silder extends Component {
  state = {
    rolemenu:[],
    currentSelected: sessionStorage.getItem("defaultSelected") || 'home',
    currentOpen: sessionStorage.getItem("defaultOpenKeys") || 'home',
  };



  hasAuth = (menu) =>{
    const {usermenu} = this.props
    if(!menu.children) {
      return usermenu.find(item => item === menu.key)
    } else {
      return menu.children.some((item2)=>usermenu.indexOf(item2.key) !== -1)
    }
    
  }

  creatmenuList = (list) => {
    const IconFont = createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1671806_nxlomrzd66r.js',
    });
    return list.map(menu => {  
      if(this.hasAuth(menu)) {
        if(!menu.children) { 
          return (
            <Menu.Item key={menu.key}>
               <Link to={menu.path}>
               <IconFont type={menu.icon} />
                <span>{menu.title}</span>
               </Link>
            </Menu.Item>
          )
        } else {
          return (
            <SubMenu
              key={menu.key}
              title={
                <span>
                  <IconFont type={menu.icon} />
                  <span>{menu.title}</span>
                </span>
              }
            >
              {this.creatmenuList(menu.children)}
            </SubMenu>
          )
        }
      }
    })
  }
  handleClick = (e) => {
    let defaultSelected = e.key
    let defaultOpenKeys = e.keyPath[1] || e.keyPath[0]
    sessionStorage.setItem("defaultSelected", defaultSelected)
    sessionStorage.setItem("defaultOpenKeys", defaultOpenKeys)
    menu_list.forEach(item => {
      if(item.key === defaultSelected ){
          let title = item.title
          sessionStorage.setItem("SelectedTitle", title) 
      }
      if(item.children) {
        item.children.forEach(c => {
          if(c.key === defaultSelected) {
           let childrenTitle = c.title
           sessionStorage.setItem("SelectedTitle", childrenTitle) 
          }
        })
      } 
    })

  }

  componentDidMount() {
  }
  render() {
    return (
      <div >
        <div className="nav_top">
          <img src={Logo} alt=""/>
          <h3>商品管理系统</h3>
        </div>
        <Menu
          defaultSelectedKeys={[this.state.currentSelected]} //自动选中的菜单
          defaultOpenKeys={[this.state.currentOpen]}  //自动打开的菜单
          mode="inline" //模式
          theme="dark"  //主题
          onClick={this.handleClick}
        >
          { this.creatmenuList(menu_list)}
        </Menu>
      </div>
    )
  }
}
export default Silder
