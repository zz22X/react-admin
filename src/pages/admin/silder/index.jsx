import React, { Component } from 'react'
import Logo from "../../../assets/images/logo.png"
import store from '../../../redux/store'
import { Menu } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import {Link} from 'react-router-dom'
import { matchRole } from '../../../api/admin'
import './css/index.less'
import menu_list from '../../../config/menu_list'
const { SubMenu } = Menu;
export default class index extends Component {
  state = {
    rolemenu:[],
    currentSelected: sessionStorage.getItem("defaultSelected") || 'home',
    currentOpen: sessionStorage.getItem("defaultOpenKeys") || 'home',
  };

  creatmenuList = (list) => {
    return list.map(menu => {
      const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_1671806_nxlomrzd66r.js',
      });
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
    })
  }
  handleClick = (e) => {
    console.log('handleClick调用了')
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
    let role_id = store.getState().userInfo.user.role_id
    matchRole({_id: role_id}).then(res=> {
      if(res.status === 0){
        this.setState({
          rolemenu: res.data.rolemenu
        });
      }
    })
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
