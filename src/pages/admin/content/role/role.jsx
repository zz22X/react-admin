import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Input,message,Tree } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import { PAGE_SIZE } from "../../../../config"
import { GetRole, AddRole, SetPermissions, GetRoleOne } from "../../../../api/admin"
import dayjs from 'dayjs'
import { connect} from "react-redux"
import menuList from "../../../../config/menu_list"
//const { TreeNode } = Tree;


@connect(state => ({userInfo: state.userInfo.user}))
class Role extends Component {

  formRef = React.createRef();

  state = { 
    visible: false,
    authvisible:false,
    roleList: [],
    role_id:'',
    CheckedKey:["home", "appstore", "category", "product", "user"],
    rolemenu: []
  }
//-----------------------------------------------------------------------------------------------
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = e => {
    this.formRef.current.submit();
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.formRef.current.resetFields();
    this.setState({
      visible: false,
    });
  };
  //获取角色列表
  getRoleIndo = () =>{
    GetRole().then(res=> {
      if(res.status === 0) {
        this.setState({
          roleList: res.data.reverse()
        })
      }
    })
  }
//--------------------------------------------------------------------------------------------
  componentDidMount() {
    this.getRoleIndo()
  }
  onFinish = value => {
    console.log(value)
    AddRole(value).then(res => {
      if(res.status === 0) {
        message.success('添加成功')
        this.getRoleIndo()
        this.formRef.current.resetFields();
      }else {
        message.warning('添加失败')
      }
    })
  }
//Tree================================================================================
  handleAuthCancel = () =>{
    this.setState({
      authvisible: false,
    })
  }
  handleAuthOk = () => {
    const { role_id, rolemenu} = this.state
    const {_id} = this.props.userInfo
    SetPermissions({role_id, _id, rolemenu}).then(res=>{
      if(res.status === -4) {
        message.success('授权设置成功')
        this.getRoleIndo()
      }
    })
    this.setState({
    authvisible: false,
    })
  }

  render() {
    const {roleList, CheckedKey} = this.state
  //Table分类列表
  const columns = [
      {
        title: '角色名称',
        dataIndex: 'role',
        key: 'role',
      },
      {
        title: '创建时间',
        dataIndex: 'creat_time',
        key: 'creat_time',
        render:(creat_time) => {return dayjs(creat_time).format('YYYY年 MM月DD日 HH:mm')}
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        render:(auth_time) => {return auth_time? dayjs(auth_time).format('YYYY年 MM月DD日 HH:mm'):''}
      },
      {
        title: '授权人',
        dataIndex: 'auth_officer',
        key: 'auth_officer',
      },
      {
        title: '操作',
        dataIndex: '_id',
        key: '_id',
        width: '30%',
        align: 'center',
        render: (text,record) =>(<Button type="link" onClick={(_id)=>{
          showModal(record._id)
        }} htmlType="submit">设置权限 </Button>)
      }
  ];
  //Table分页
  const paginationProps = {
    defaultCurrent: 1,
    defaultPageSize: PAGE_SIZE
  };
//Tree--------------------------------------------------------------------------------------------
    //权限弹窗、获取角色id
    const showModal = (_id) => {
      GetRoleOne({_id}).then(res=>{
        if(res.status === 0) {
          let arr = res.data.rolemenu
          console.log(arr)
          this.setState({
            role_id:_id,
            CheckedKey: arr,
            authvisible: true,
          })
        }
      })
      console.log(this.state.checkedKeys)
    }
    //树形控件选中
    const onCheck = (checkedKeys, info) => {
      console.log( checkedKeys);

      // let arr = []
      // info.checkedNodes.forEach(item=>{
      //   if(item.path){
      //     arr.push(item.path)
      //   }
      // })
      // console.log(arr)
      this.setState({
        rolemenu: checkedKeys,
        CheckedKey:checkedKeys
      })
    };
//===============================================================================================================
    return (
      <Card title={
        <Button 
          type="primary" 
          icon={<PlusCircleOutlined />} 
          onClick={
            ()=>{ this.setState({visible:true}) }
          }
          >新增角色
        </Button>}
      >
        <Table 
          dataSource={ roleList }
          columns={ columns }
          bordered
          rowKey="_id"
          pagination={ paginationProps }
        />
        
        <Modal
            title="新增角色"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
        >
          <Form ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
            <Form.Item name="role" label="" rules={[{ required: true, message: '角色名称必须输入' }]}>
              <Input placeholder="请输入角色名称"/>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="设置权限"
          visible={this.state.authvisible}
          onOk={this.handleAuthOk}
          onCancel={this.handleAuthCancel}
          okText="确认"
          cancelText="取消"
        >   
          <Tree
            checkable
            defaultExpandAll
            checkedKeys={CheckedKey}
            defaultCheckedKeys={CheckedKey} //默认选中的菜单
            onCheck={onCheck}
            treeData={menuList}
          />
        </Modal>
      </Card>
    )
  }
}

export default Role
