import React, { Component } from 'react'
import screenfull from 'screenfull'
import dayjs from 'dayjs'
import { connect } from "react-redux"
import { Modal, Button } from 'antd';
import { withRouter } from 'react-router-dom'
import { FullscreenOutlined, FullscreenExitOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { deleteUserInfo } from "../../../redux/actions/login_action"
//import { getWeather } from "../../../api/common"
import './css/index.less'

const { confirm } = Modal;

@connect( 
  state =>({ userInfo: state.userInfo.user }),
  { deleteUserInfo }
)
@withRouter
class header extends Component {
  state = {
    isFull : false,
    date: dayjs(Date.now()).format('YYYY年MM月DD日 HH:mm:ss'),
    time: "time",
    weatherData: {
      pic: "",
      weather: "多云",
      temperature: "12-19"
    }
  }
  switchFullScreen = () => {
    screenfull.toggle();
  }  
  componentDidMount () {
    //监听全屏变化
    screenfull.on('change', () => {
      let { isFull } = this.state
      this.setState({ isFull: !isFull })
    });
    //监听时间变化
    this.time = setInterval(() => {
      this.setState({ date: dayjs(Date.now()).format('YYYY年MM月DD日 HH:mm:ss')})
    },1000)
    
    
    // getWeather().then(
    //   res => {
    //     this.setState({
    //       weatherData: {
    //         pic: res.dayPictureUrl,
    //         weather: res.weather,
    //         temperature: res.temperature
    //       }
    //     })
    //   },
    //   err => console.log(err)
    // )
    
  }
  componentWillUnmount() {
    clearInterval(this.time)
  }
  handletoLogout = () => {
    confirm({
      title: '确定删除码？',
      icon: <ExclamationCircleOutlined />,
      content: '如若退出后需要重新登录',
      cancelText: '取消',
      okText: '确定',  
      onOk: () => {
        this.props.deleteUserInfo()
        sessionStorage.removeItem("SelectedTitle")
      }
    });
  }
  render() {
    const {pic, temperature, weather} = this.state.weatherData
    return (
      <div id="admin_header">
        <div className="header_top">
          <Button size="small" onClick={this.switchFullScreen} icon={ this.state.isFull? <FullscreenExitOutlined />: <FullscreenOutlined /> } />
            <span className="hello">欢迎, {this.props.userInfo.username}</span>
          <Button type="link" size="small" onClick={this.handletoLogout} >退出登录</Button>
        </div>
        <div className="header_botton">
          <div className="left_botton">{sessionStorage.getItem("SelectedTitle")}</div>
          <div className="right_botton">
            <span>{this.state.date}</span>
            <img src={pic} alt="天气图片"/>
            <span>{weather} 温度：{temperature} </span>
          </div>
        </div>
      </div>
    )
  }
}
export default header
