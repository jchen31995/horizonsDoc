import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
require('./styles/draft.css');

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  };

  _onSaveClick(){
    const contentState = this.state.editorState.getCurrentContent();
    this.props.saveDoc(contentState);
  }

  _onBoldClick(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    ));
    console.log(this.state.editorState);
  }

  _onItalClick(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'ITALIC'
    ));
  }

  _onULClick(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'UNDERLINE'
    ));
  }

  render() {
    return (
      <div id="content">
        <h1>This is the text editor</h1>
          <button onClick={this._onSaveClick.bind(this)}>
            Save
          </button> <br/> <br/>
          <button onClick={this._onBoldClick.bind(this)}><strong>Bold</strong></button>
          <button onClick={this._onItalClick.bind(this)}><em>Italicize</em></button>
          <button onClick={this._onULClick.bind(this)}>Underline</button>
          <div className="editor">
            <Editor editorState={this.state.editorState} onChange={this.onChange}/>
          </div>
      </div>
    );
  }
}

export default MyEditor;
