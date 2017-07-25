import React from 'react';
import {Editor, EditorState, RichUtils, Modifier, DefaultDraftBlockRenderMap} from 'draft-js';
import Immutable from 'immutable';
require('./styles/draft.css');

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
  'JAMES': {
    color: 'green'
  }
};


const blockRenderMap = Immutable.Map({
  'center': {
    element: 'center'
  }, 
  'unstyled': {
    element: 'div'
  },
  'right': {
    element: 'div'
  },
  'left': {
    element: 'div'
  }
});



const myBlockStyleFn = function(contentBlock) {
  const type = contentBlock.getType();
  switch (type) {
    case 'unstyled': {
        return 'boo';
    }
    case 'right': {
      return 'right-align';
    }
    case 'left': {
      return 'left-align';
    }
    case 'center': {
      return 'center-align';
    }
  }
}


class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => {this.setState({editorState});}
  };

  _onBoldClick(){

    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    ));
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

  _onStrikethroughClick(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'STRIKETHROUGH'))
  }

    _onColorClick(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'JAMES'))
  }

  _onLeftAlign(){
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'left'
    ));
  }


  _onRightAlign(){
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'right'
      ));
  } 

  _onCenterAlign(){
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'center'))
  }





  render() {
    return (
      <div id="content">
        <div id="navbar">
          <button onClick={this._onBoldClick.bind(this)}><strong>Bold</strong></button>
          <button onClick={this._onItalClick.bind(this)}><em>Italicize</em></button>
          <button onClick={this._onULClick.bind(this)}>Underline</button>
          <button onClick={this._onStrikethroughClick.bind(this)}>Strikethrough</button>
          <button onClick={this._onColorClick.bind(this)}>Color</button>
          <button onClick={this._onLeftAlign.bind(this)}>Left Align</button>
          <button onClick={this._onCenterAlign.bind(this)}>Center Align</button>
          <button onClick={this._onRightAlign.bind(this)}>Right Align</button>
         
        </div>
        <div className="editor">
          <Editor editorState={this.state.editorState} blockStyleFn={myBlockStyleFn} blockRenderMap={blockRenderMap} customStyleMap={styleMap} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

export default MyEditor;
