import "./css/index.less"
import Logo from "./images/logo.png"
import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getLogin } from "../../api/login"

export default class Login extends Component {
  state = ({
    username: "",
    password: ""
  })
  render() {
    const onFinish = values => {
      console.log(values)
      this.setState({ 
        username: values.username,
        password: values.password
      })
      let resData = {
        username: values.username,
        password: values.password
      }
      getLogin(resData).then(res => {
        if(res.status === 0) {
          message.success('登录成功')
          setTimeout(() => this.props.history.push("/admin") ,1500)
          
          console.log(this.props)
        }
      }).catch(err => console.log(err))
    };
    return (
      <div className="login_warp">
        <div className="header">
          <img src={Logo} alt=""/>
          <h1>商品管理系统</h1>
        </div>
        <div className="content">
          <h1>用户登录</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              validateFirst
              rules={[
                { required: true, message: '请输入用户名!' },
                { min: 4, message: '用户名必须大于4位!' },
                { max: 12, message: '用户名必须小于12位!!' },
                { pattern: RegExp(/^\w+$/), message: '用户名必须为字母、数字或下划线组成' },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              validateFirst
              rules={[
                { required: true, message: '请输入密码!' }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
  
}
