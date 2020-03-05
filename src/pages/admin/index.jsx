import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Route, Switch, Redirect } from "react-router-dom"
import { deleteUserInfo } from '../../redux/actions/login_action'
import { Layout } from 'antd';
import CheckLogin from '../check_login'
import Header from './header'
import Silder from './silder'

import Home from "./content/home/home";
import Role from "./content/role/role"
import User from "./content/user/user"
import Category from "./content/appstore/category/category"
import Product from "./content/appstore/product/product"
import Line from "./content/charts/line/line"
import Pie from "./content/charts/pie/pie"

import './css/index.less'
const { Footer, Sider, Content } = Layout;

@connect(
  state => ({ userInfo: state.userInfo}),
  {deleteUserInfo}
)
@CheckLogin
 class Admin extends Component {
  
  render() {
    
    return (
      <BrowserRouter>
        <Layout id="admin">
          <Sider>
            <Silder />
          </Sider>
          <Layout>
            <Header />
              <Content className="content">
                <Switch>
                  <Route path="/admin/home" component= { Home } />
                  <Route path="/admin/role" component= { Role } />
                  <Route path="/admin/user" component= { User } />
                  <Route path="/admin/appstore/category" component= { Category } />
                  <Route path="/admin/appstore/product" component= { Product } />
                  <Route path="/admin/charts/line" component= { Line } />
                  <Route path="/admin/charts/pie" component= { Pie } />
                  <Redirect to="/admin/home"/>
                </Switch>
              </Content>
            <Footer className="footer">推荐使用谷歌浏览器，获取最佳用户体验</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    )
  }
}

export default Admin
