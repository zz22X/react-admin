import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined  } from '@ant-design/icons';
import { RemovePics } from '../../../../../api/admin'
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicWall extends Component {
  state ={
    previewVisible: false,
    previewImage: '',
    fileList: [],
    imageUrl: "",
    image:"",
  }
  componentDidMount() {
  }

  getPicSArr = () => {
    let arr = []
    this.state.fileList.forEach(item =>{
      console.log(item)
      arr.push(item.url || this.state.imageUrl)
    })
    return arr
  }
  setPicSArr = (smallpics) => {
    let arr = []
    smallpics.forEach(item =>{
      if(item !== null) {
        let str = []
        str = item.split("/").reverse()[0]
        arr.push({
          uid: str,
          name: str,
          status: 'done',
          url: item,
        })
      }
    })
    this.setState({
      fileList: arr
    })
  }

  handleCancel = () => this.setState({ previewVisible: false });
  handleChange = ({file, fileList }) => {
    if (file.status === 'done') {
      const {image, imageurl } = file.response.data
      message.success('上传成功！');
      fileList[fileList.length - 1].name = image
      this.setState({
        imageUrl:imageurl,
        image:image
      })
    } else if (file.status === 'error') {
      message.error('上传失败！');
    } else if (file.status === 'removed') {
      let name = file.name
      RemovePics({name}).then(res=>{
        if(res.status === 0) {
          message.success('图片已删除！');
        }
      })
    }
    this.setState({ fileList })
  };
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    
    return (
      <div className="clearfix">
        <Upload
          action="http://localhost:3030/product/uploadPics"
          method="post"
          name="file"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="商品图片" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
