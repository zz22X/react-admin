import React, { Component } from 'react'
import { Card, List, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { GetProduct } from '../../../../../api/admin'
import './detail.less'
const { Item } = List


export default class Detail extends Component {
  state ={
    detailData : {smallpics:[]},
    isLoading: true
  }
  componentDidMount() {
    this.GetProductDtail()
  }

  GetProductDtail = () => {
    let _id = this.props.match.params._id
    GetProduct({_id}).then(res => {
      if(res.status === 0) {
        this.setState({
          detailData: res.data[0],
          isLoading:false
        })
      }
    })
  }
  render() {
    const { detailData } = this.state;
    return (
      <Card title={
        <div>
          <Button 
          type="link" 
          style={{marginRight:'15px'}}
          icon={<ArrowLeftOutlined style={{fontSize:'20px'}}/>} 
          onClick={this.props.history.goBack} >返回</Button>
          <span>商品详情</span>
        </div>
      }>
          <List loading={this.state.isLoading}>
            <Item>
              <span className="detail-title">商品名称：</span>
              {detailData.name}
            </Item>
            <Item>
              <span className="detail-title">商品描述：</span> 
              {detailData.desc}
            </Item>
            <Item>
              <span className="detail-title">商品价格：</span>
              {detailData.price}
            </Item>
            <Item>
              <span className="detail-title">所属分类：</span>
              {detailData.cate}
            </Item>
            <Item >
              <span className="detail-title">商品图片：</span>
              {
                this.state.detailData.smallpics.map((item,index) => {
                  return <img src={item} alt="商品图片" key={index}/>
                })
              }
            </Item>
            <Item>
              <span className="detail-title">商品详情：</span>
              <span dangerouslySetInnerHTML={{__html:detailData.detail}}></span>
            </Item>
          </List>
    </Card>
    )
  }
}
