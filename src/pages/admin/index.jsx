import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { deleteUserInfo } from '../../redux/actions/login_action'

 class Admin extends Component {
  Logout = () => {
    this.props.deleteUserInfo()
  }
  render() {
    
    if(!this.props.userInfo.isLogin) {
      return <Redirect to="/login" />
    }
    console.log(this.props)
    
    return (
      <div>
        hello,{this.props.userInfo.user.username}
        <button onClick={this.Logout}>退出登录</button>
      </div>
    )
  }
}

export default connect(
  state => ({ userInfo: state.userInfo}),
  {deleteUserInfo}
)(Admin)
