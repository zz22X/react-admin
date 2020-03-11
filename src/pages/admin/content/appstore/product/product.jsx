import React, { Component } from 'react'
import { Card, Button, Table, Select, Input, message } from 'antd';
import { PlusCircleOutlined, SearchOutlined  } from '@ant-design/icons';
import { PAGE_SIZE } from "../../../../../config"
import { GetProduct, SearchProduct, UpdateProStatus } from "../../../../../api/admin"
const { Option } = Select;

 class Product extends Component {
  //formRef = React.createRef();
  state = {
    dataSource:[],
    total: '',
    searchTpye: 'name',
    keyword: '',
    pageNum: 1,
    pageSize: PAGE_SIZE
  };
  componentDidMount() {
    this.getProList()
  }
  getProList = (page) =>{
    GetProduct({
      pageSize: PAGE_SIZE,
      pageNum: page || 1
    }).then(res => {
      if(res.status === 0) {
        this.setState({
          dataSource: res.data,
          total: res.total
        })
      }
    })
  }
  search = (page) => {
    const { searchTpye, keyword, pageSize } = this.state
    if(this.state.keyword) {
      SearchProduct({searchTpye, keyword, pageNum:page || 1, pageSize}).then(res=>{
        console.log(res)
        if(res.status === 0) {
          this.setState({
            dataSource: res.data,
            total: res.total
          })
        }
      })
    }else {
      message.warning('您还没输入搜索关键词', 1)
      this.getProList()
    }
  }
  update = (item) => {
    console.log(item)
    let _id = item._id
    let status = ''
    if(item.status === '在售'){
      status = '已停售'
    } else {
      status = '在售'
    }
    UpdateProStatus({_id, status}).then(res=>{
      if(res.status === 0) {
        this.getProList()
      }
    })
  }
  

  render() {
    //分类列表
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
        width: '45%',
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
        align: 'center',
        render: price => '￥'+ price
      },
      {
        title: '状态',
        //dataIndex: 'status',
        key: 'status',
        width: '10%',
        align: 'center',
        render: (item) => ( 
          <div>
            <Button type={item.status === "在售"? 'danger' :'primary'}  onClick={() => {this.update(item)}}>{item.status === "在售"? '下架' :'上架'}</Button>
            <br />
            <span>{item.status === "在售"? '在售':'已停售'}</span>
          </div>
        )  
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: 'edit',
        width: '10%',
        align: 'center',
        render: (_id) => ( 
        <div>
          <Button type="link" onClick={()=>{this.props.history.push(`/admin/appstore/product/detail/${_id}`)}}>详情</Button>
          <br />
          <Button type="link" onClick={() => {this.props.history.push(`/admin/appstore/product/add_update/${_id}`)}}>修改</Button>
        </div>
        )  
      }
    ];
    
    //分页
    const paginationProps = {
      defaultCurrent: 1,
      defaultPageSize: PAGE_SIZE,
      total: this.state.total,
      onChange:(page)=>{
        if(!this.state.keyword) {
          this.getProList(page)
        } else {
          this.search(page)
        }
      }
    }
    return (
     <div>
        <Card
          title={
            <div>
              <Select 
                defaultValue="name"
                style={{ marginRight: 10 }} 
                onChange={(value)=>{this.setState({searchTpye: value})}}
              >
                <Option value="name">按名称搜索</Option>
                <Option value="desc">按描述搜索</Option>
              </Select>
              <Input
                allowClear
                placeholder="请输入搜索关键词"
                onChange={(event)=>{this.setState({keyword: event.target.value})}}
                style={{ width: 200, marginRight: 10 }}
              />
              <Button type="primary" icon={<SearchOutlined />} onClick={this.search}>搜索</Button>
            </div>
          }
          extra={
            <Button type="primary" 
              icon={<PlusCircleOutlined />} 
              onClick={()=>{this.props.history.push('/admin/appstore/product/add_update')}}>添加商品
            </Button>
          }
        >
          <Table 
            dataSource={this.state.dataSource}
            columns={columns}
            bordered
            rowKey="_id"
            pagination={ paginationProps }
          />
       </Card>
     </div>
    )
  }
}
export default Product
