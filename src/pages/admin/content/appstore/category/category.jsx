import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Input, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import {  AddCate, EditCate } from '../../../../../api/admin'
import { connect } from 'react-redux'
import { getCateListAsync } from "../../../../../redux/actions/admin_action"
import { PAGE_SIZE } from "../../../../../config"


@connect(state => ({cateList: state.cateList}),
{getCateListAsync})
 class Category extends Component {
  formRef = React.createRef();
  state = { 
    visible: false,
    editCate: "",
    key:'',
    cate:''
  };
  //取消按钮的回调
  handleCancel = () => {
    this.formRef.current.resetFields();
    this.setState({
      visible: false,
      addvisible: false
    });
  };
  //确认按钮的回调
   handleOk = () => {
    this.formRef.current.submit();
  };
  componentDidMount() {
    this.props.getCateListAsync()
  }
  render() {
    //提交表单的数据
    const onFinish = values => {
      this.setState({
        cate: values.cate
      })
      const { cate, key } = this.state
      if(this.isadd) {
        AddCate({cate}).then(res=> {
          if(res.status === 0) {  
            message.success(res.msg);
            this.props.getCateListAsync()
            this.setState({ visible: false });
            this.formRef.current.resetFields();
          }else {
            message.warning(res.msg);
          }
        })
      } else {
        EditCate({ _id:key, cate }).then(res=> {
          if(res.status === 0) {  
            message.success(res.msg);
            this.props.getCateListAsync()
            this.setState({ visible: false });
            this.formRef.current.resetFields();
          }else {
            message.warning(res.msg);
          }
        })
      }
    };
    
    //对话框出现情况
    const showModal = (key) => {
      this.setState({ key })
      if(!this.isadd) {
        this.props.cateList.forEach(item => {
          if(item.key === key) {
            this.setState({
              editCate: item.cate
            })
          }
        })
        this.setState({
          visible: true,
        })
      }else {
        this.setState({
          visible: true,
          editCate: '请输入分类名称'
        })
      }
      
    };
    //分类列表
    const columns = [
      {
        title: '分类名',
        dataIndex: 'cate',
        key: 'cate',
      },
      {
        title: '操作',
        dataIndex: 'edit',
        key: 'edit',
        width: '30%',
        align: 'center',
        render: (text,record) =>
          <Button
            type="link"
            onClick={
              () => {
                this.isadd = false
                showModal(record.key)
            }}
            htmlType="submit">修改分类
          </Button>
      }
    ];
    //分页
    const paginationProps = {
      defaultCurrent: 1,
      defaultPageSize: PAGE_SIZE
    };
    return (
     <div>
        <Card extra={
          <Button 
            type="primary" 
            icon={<PlusCircleOutlined />} 
            onClick={
              ()=>{
                this.isadd = true
                showModal()
              }
            }
            >新增分类
          </Button>}
        >
          <Table 
            dataSource={this.props.cateList}
            columns={columns}
            bordered
            pagination={ paginationProps }
          />
          <Modal
            title={this.isadd? '新增分类': '修改分类'}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
          >
            <Form ref={this.formRef} name="control-ref" onFinish={onFinish}>
              <Form.Item name="cate" label="" rules={[{ required: true, message: '请输入分类名称' }]}>
                <Input placeholder={this.state.editCate}/>
              </Form.Item>
            </Form>
         </Modal>
       </Card>
     </div>
    )
  }
}
export default Category

