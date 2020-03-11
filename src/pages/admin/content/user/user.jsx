import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Input, Select, message } from 'antd';
import { PlusCircleOutlined, } from '@ant-design/icons';
import { PAGE_SIZE } from "../../../../config"
import { getUserInfo, AddUserInfo, DeleteUserInfo ,EditUserInfo} from "../../../../api/login"
import dayjs from 'dayjs'
import { connect} from "react-redux"
import {} from "../../../../redux/actions/login_action"
const { confirm } = Modal;
@connect(state => ({userInfo: state.userInfo.user}))
class User extends Component {

  formRef = React.createRef();

  state = { 
    visible: false,
    newkey: 1,
    userList: [],
    roleList:[],
    editUser:{
      role_id:'',
      username:'',
      phone:'',
      email:'',
      password:''
    }
  }

  
  handleOk = e => {
    this.formRef.current.submit();
  };
  handleCancel = e => { 
    this.setState({
      visible: false
    });
    console.log(this.state.editUser,this.state.visible,this.isEdit)
    this.formRef.current.resetFields();
  };
  deleteUser = (record) => {
    console.log(record)
    confirm({
      title:'确定删除该用户吗？',
      cancelText:'取消',
      okText: '确定',
      onOk:() => {
        DeleteUserInfo({_id:record._id}).then(res=>{
          if(res.status === 0){
            message.success('删除成功')
            this.GetUserInfo()
          }
        })
      }
    })
  };
  showModal = (record) => { 
    if(!this.isEdit) { 
      this.setState({ visible: true,editUser: {} })
      
    }else{
      this.setState({ visible: true,editUser:{
        _id: record._id,
        role_id: record.role_id,
        username: record.username,
        phone: record.phone,
        email: record.email,
        password: record.password
      } })
      
      
    }
  };
  compoentWillMount() {
  }
  componentDidMount() {
    this.GetUserInfo()
  }
  GetUserInfo =() =>{
    getUserInfo().then(res=>{
      if(res.status === 0) {
        this.setState({ userList: res.data.reverse() })
        this.setState({ roleList: res.role })
      }
    })
  }
  onFinish = value => {
    const {isEdit,editUser} = this.state
    console.log(value,isEdit,editUser)
    if(this.isEdit){
      EditUserInfo({_id:editUser._id}).then(res=>{
        if(res.status===0){
          message.success('修改成功')
          this.setState({visible:false})
        }
      })
    }else{    
      console.log(value)
      AddUserInfo(value).then(res=>{
        if(res.status === 0){
          message.success('添加成功')
          this.GetUserInfo()
          this.setState({visible:false})
          this.formRef.current.resetFields();
        }
      })
    }
  }

  render() {  
  const {role_id,username,phone,email,password, _id,newkey } = this.state.editUser
  //分类列表
  const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        align: 'center',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
        align: 'center',
      },
      {
        title: '注册时间',
        dataIndex: 'date',
        key: 'date',
        align: 'center',
        render:(date) => {return  dayjs(date).format('YYYY年 MM月DD日 HH:mm')}
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        align: 'center',
        key: 'role_id',
        render:(role_id) => {
          let result = this.state.roleList.find((item)=>{
            return item._id === role_id
          })
          if(result) return result.role
        }
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        width: '18%',
        align: 'center',
        render: (text, record) => ( 
          <div>
            <Button type="link" onClick={()=>{ this.isEdit = true; this.showModal(record) }}>修改 </Button>
            <Button type="link" onClick={() => {this.deleteUser( record)}}>删除</Button>
          </div>
        )
      }
  ];
  //分页
  const paginationProps = {
    defaultCurrent: 1,
    defaultPageSize: PAGE_SIZE
  };
  
    return (
      <Card title={
        <Button 
          type="primary" 
          icon={<PlusCircleOutlined />} 
          onClick ={()=>{ this.isEdit = false; this.showModal()}}
          >创建用户
        </Button>}>
          <Table 
            dataSource={this.state.userList}
            columns={columns}
            bordered
            rowKey="_id"
            pagination={ paginationProps }
          />
         <Modal
            title="修改用户"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText="确认"
            cancelText="取消"
          >
            <Form 
              ref={this.formRef} 
              name="control-ref" 
              onFinish={this.onFinish}  
              labelCol={{span: 4}} 
              wrapperCol={{span: 8}} 
              key={ this.isEdit === false ? newkey : _id}
            >
              <Form.Item
                label="用户名"
                name="username"
                key={_id}
                validateFirst
                rules={[
                  { required: true, message: '请输入用户名!' },
                  { min: 4, message: '用户名必须大于4位!' },
                  { max: 12, message: '用户名必须小于12位!!' },
                  { pattern: RegExp(/^\w+$/), message: '用户名必须为字母、数字或下划线组成' },
                ]}
              >
                <Input  placeholder="用户名" style={{ width: 200 }} defaultValue={username}/>
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                validateFirst
                rules={[
                  { required: true, message: '请输入密码!' }
                ]}
              >
                <Input            
                  type="password"
                  placeholder="密码"
                  style={{ width: 200 }}
                  defaultValue={password}
                />
              </Form.Item >
              <Form.Item
                name="phone"
                label="手机号"
                rules={[{ required: true, message: '请输入手机号码!' }]}
              >
                <Input style={{ width: 200 }} defaultValue={phone}/>
              </Form.Item>
              <Form.Item
                name="email"
                label="邮箱"
                rules={[{ required: true, message: '请输入邮箱!' }]}
              >
                <Input style={{ width: 200 }} defaultValue={email} />
              </Form.Item>
              <Form.Item label="角色" name="role_id" rules={[{ required: true, message: '请选择角色' }]} >
                <Select style={{ width: 180 }} placeholder="请选择角色" defaultValue={role_id} >
                    {
                      this.state.roleList.map(role => {
                      return <Select.Option key={role._id} value={role._id}>{role.role}</Select.Option>
                      })
                    }
                </Select>
              </Form.Item>
            </Form>
         </Modal>
    </Card>
    )
  }
}

export default User
