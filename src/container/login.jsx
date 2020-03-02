//引入ui组件
import React, { Component } from 'react'
//引入action_creators
import {} from '../redux/actions/login_action'
//引入connect
import { connect } from 'react-redux'

class Login extends Component {
  render() {
    return (
      <div>
        
      </div>
    )
  }
}
export default connect(
  state => ({username: state.username}),
  {YYY}
)(ZZZ) 

//引入connect from 'react-redux'

//默认暴露 export default connect(
//          state => ({xxx: state.xxx}), 映射状态 为props
//          {YYY} 映射dispatch 为props
//          )(ZZZ) UI组件名称
//