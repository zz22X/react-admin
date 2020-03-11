import React, { Component } from 'react'
import { Card, Button,Form,Input ,Select,message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { AddProduct, GetProduct, EditProduct } from "../../../../../api/admin"
import PicWall from './pic_wall'
import EditorConvertToHTML from './rich_text'
import { connect } from 'react-redux'
import { getCateListAsync } from '../../../../../redux/actions/admin_action'

@connect(state => ({ cateList: state.cateList }), 
{getCateListAsync})
class AddUpdate extends Component {
  state ={
    detailData:{
      name:'',
      smallpics:[],
      desc:'',
      priice:'',
      cate:'',
      detail:'',
    }
  }
  formRef = React.createRef();
  componentDidMount() {
    const {_id} = this.props.match.params
    if(!this.props.cateList[0]) {
      this.props.getCateListAsync()
    }
    if(_id) this.GetProductDtail()
  }
  onFill = () => { 
    const { name, desc, price, cate, smallpics, detail} = this.state.detailData
    this.formRef.current.setFieldsValue({
      name: name,
      desc: desc,
      price:price,
      detail:detail,
      cate:cate,
      smallpics:smallpics
    });
  }
  GetProductDtail = () => {
    let _id = this.props.match.params._id
    GetProduct({_id}).then(res => {
      if(res.status === 0) { 
        this.refs.pictureWall.setPicSArr(res.data[0].smallpics,res.data[0].smallpics.length)
        this.refs.richtext.setdetailtext(res.data[0].detail)
        this.setState({
          detailData: res.data[0],
        })
        this.onFill()
      }
    })
  }
  
  render() {
    const {_id} = this.props.match.params
    //const [form] = Form.useForm();
    const onFinish = (value) => {
      let imgArr = this.refs.pictureWall.getPicSArr()
      let detail = this.refs.richtext.getdetailtext()
      value.smallpics = imgArr
      value.detail = detail
      value._id = _id
      if(_id) {
        EditProduct(value).then(res => {
          if(res.status === 0) {
            message.success('修改商品成功')
            setTimeout(()=>{ 
            this.props.history.push('/admin/appstore/product')
            },800)
          }else {
            message.success('修改商品失败')
          }
        })
      } else {
        console.log(value)
        AddProduct(value).then(res => {
          if(res.status === 0) {
            message.success('添加商品成功')
            console.log(this.formRef)
            setTimeout(()=>{ 
            this.props.history.push('/admin/appstore/product')
            },800)
          }else {
            message.success('添加商品失败')
          }
        })
      }
      
    }
    return (
      <Card title={
        <div>
          <Button 
          type="link" 
          style={{marginRight:'15px'}}
          icon={<ArrowLeftOutlined style={{fontSize:'20px'}}/>} 
          onClick={this.props.history.goBack} >返回</Button>
          <span>{_id?'修改商品':'添加商品'}</span>
        </div>
      }>
      <Form 
        ref={this.formRef}
        onFinish={onFinish}
        labelCol={{ md: 2 }}
        wrapperCol={{ md: 20 }}
      >
        <Form.Item label="商品名称" name="name" rules={[{ required: true, message: '请输入商品名称' }]} >
          <Input style={{ width: 300 }} placeholder="商品名称" />
        </Form.Item>
        <Form.Item label="商品描述" name="desc" rules={[{ required: true, message: '请输入商品描述' }]}>
          <Input style={{ width: 500 }} placeholder="商品描述"/>
        </Form.Item>
        <Form.Item label="商品价格" name="price" rules={[{ required: true, message: '请输入商品价格' }]}>
          <Input prefix="￥" addonAfter="元" style={{ width: 180 }} placeholder="商品价格"/>
        </Form.Item>
        <Form.Item label="商品分类" name="cate" rules={[{ required: true, message: '请输入商品分类' }]}>
          <Select style={{ width: 180 }} placeholder="请选择商品分类">
              {
                this.props.cateList.map(cate => {
                return <Select.Option key={cate.key} value={cate._id}>{cate.cate}</Select.Option>
                })
              }
          </Select>
        </Form.Item>
        <Form.Item label="商品图片">
          <PicWall ref="pictureWall"/>
        </Form.Item>
        <Form.Item label="商品详情">
           <EditorConvertToHTML ref="richtext"/>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: 100 , left: '10%'}} size="large">
          提交
        </Button>
      </Form.Item>
      </Form>
    </Card>
    )
  }
}
export default AddUpdate
