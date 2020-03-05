import React, { Component } from 'react'
import { Card, Button, Table, Select, Input } from 'antd';
import { PlusCircleOutlined, SearchOutlined  } from '@ant-design/icons';
import { PAGE_SIZE } from "../../../../../config"
import { GetProduct } from "../../../../../api/admin"
const { Option } = Select;

 class Product extends Component {
  //formRef = React.createRef();
  state = {
    dataSource:[],
    total: '',
  };
  componentDidMount() {
    this.getProList()
  }
  getProList = (page) =>{
    GetProduct({
      pageSize: PAGE_SIZE,
      pageNum: page || 1
    }).then(res => {
      console.log(res.data)
      if(res.status === 0) {
        this.setState({
          dataSource: res.data,
          total: res.total
        })
        console.log(this.state)
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
        dataIndex: 'status',
        key: 'status',
        width: '10%',
        align: 'center',
        render: (status) => ( 
          <div>
            <Button type={status === "在售"? 'danger' :'primary'}  onClick={() => {}}>{status === "在售"? '下架' :'上架'}</Button>
            <br />
            <span>{status === "在售"? '在售':'已停售'}</span>
          </div>
        )  
      },
      {
        title: '操作',
        dataIndex: 'edit',
        key: 'edit',
        width: '10%',
        align: 'center',
        render: (text,record) => ( 
        <div>
          <Button type="link" onClick={() => {}}>详情</Button>
          <br />
          <Button type="link" onClick={() => {}}>修改</Button>
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
        this.getProList(page)
      }

    };
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    }
    return (
     <div>
        <Card
          title={
            <div>
              <Select defaultValue="按名称搜索" style={{ marginRight: 10 }} onChange={handleChange}>
                <Option value="jack">Jack</Option>
              </Select>
              <Input
                allowClear
                placeholder="请输入搜索关键词"
                style={{ width: 200, marginRight: 10 }}
              />
              <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
            </div>
          }
          extra={<Button type="primary" icon={<PlusCircleOutlined />} onClick={()=>{}}>添加商品</Button>}
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
