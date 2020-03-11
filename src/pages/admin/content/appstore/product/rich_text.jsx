import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState  } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Input } from 'antd';
const { TextArea } = Input;
export default class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  getdetailtext = () => {
    const { editorState } = this.state;
    let text = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    return text
  }
  setdetailtext = (richtext) => {
    let str = htmlToDraft(richtext);
    if (str) {
      const contentState = ContentState.createFromBlockArray(str.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
       this.setState({
        editorState
      });
    }
  }
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
        <TextArea 
          rows={2} 
          style={{width: '100%'}}
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}
