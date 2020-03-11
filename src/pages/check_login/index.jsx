import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export default function (CheckLoginComponent) {
@connect( state => ({ isLogin: state.userInfo.isLogin }))
  class CheckLogin extends Component {
    render() {
      const {...params} = this.props
      const {pathname} = this.props.location
      if( pathname === "/admin" && !this.props.isLogin ) return <Redirect to="/login" />
      if( pathname === "/login" && this.props.isLogin ) return <Redirect to="/admin" />
      return <CheckLoginComponent {...params} />
    }
  }
  return CheckLogin
}

