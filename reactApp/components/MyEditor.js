import React from 'react';
import {Editor, EditorState, RichUtils, Modifier, DefaultDraftBlockRenderMap, convertFromRaw, convertToRaw} from 'draft-js';
import Immutable from 'immutable';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import * as colors from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import io from 'socket.io-client';


import { CompactPicker } from 'react-color';
// console.log(Dropdown.DropdownTrigger);
// const DropdownTrigger = Dropdown.DropdownTrigger;
// const DropdownContent = Dropdown.DropdownContent;

require('../styles/draft.css');

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

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const myBlockStyleFn = function(contentBlock) {
  const type = contentBlock.getType();
  switch (type) {
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
    this.state = {
      editorState: EditorState.createEmpty(),
      currFontSize: 8,
      styleMap: {}
    };

    this.socket = io('http://localhost:3000');

    this.socket.on('helloBack', ({doc}) => {
      console.log('you just joined', doc);
    })

    this.socket.on('userJoined', () => {
      console.log('user joined');
    })

    this.socket.on('userLeft', () => {
      console.log('user left');
    })

    this.socket.on('receiveContent', strContent => {
      const contentState = convertFromRaw(strContent);
      const newEditState = EditorState.createWithContent(contentState);
      this.setState({ editorState: newEditState });
    })

    this.socket.emit('join', {doc: this.props.documentID});

    this.onChange = (editorState) => {
      const contentState = editorState.getCurrentContent();
      const strContent = convertToRaw(contentState);
      this.socket.emit('newContent', strContent);
      this.setState({
        editorState
      });
    };
  };

  componentDidMount() {
    const self = this;
    try {
      const contentstate = convertFromRaw(self.props.rawContent);
      this.setState({editorState: EditorState.createWithContent(contentstate)});
    } catch(e) {
      console.log("error: ", e);
    };
  };

  _onSaveClick(){
    const contentState = this.state.editorState.getCurrentContent();
    this.props.saveDoc(contentState);
  }

  componentWillUnmount(){
    this.socket.disconnect();
    console.log(this.socket);
  }
  toggleColorPicker(e) {
    this.setState({
      colorPickerOpen: true,
      colorPickerButton: e.target
    });
  }

  toggleInlineFormat(e, style){
    e.preventDefault();
    this.setState({
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, style)
    })
  }

  toggleBlockFormat(e, blockType){
    e.preventDefault();
    this.setState({
      editorState: RichUtils.toggleBlockType(this.state.editorState, blockType)
    })
  }

  blockTypeButton({icon, blockType}){
    return (
      <RaisedButton
        backgroundColor={
          this.state.editorState.getBlockTree(blockType) ?
          colors.faintBlack :
          colors.white
        }
        onMouseDown={(e) => this.toggleBlockFormat(e, blockType)}
        icon={<FontIcon className="material-icons">{icon}</FontIcon>}
      />
    )
  }

  formatButton({icon, style}){
    return (
      <RaisedButton
        backgroundColor={
          this.state.editorState.getCurrentInlineStyle().has(style) ?
          colors.faintBlack :
          colors.white
        }
        onMouseDown={(e) => this.toggleInlineFormat(e, style)}
        icon={<FontIcon className="material-icons">{icon}</FontIcon>}
      />
    )
}

  formatColor(color) {
    console.log('COLOR IS', color);

    var newInlineStyles = Object.assign(
      {},
      this.state.styleMap,
      {
        [color.hex]: {
          color: color.hex,
        }
      }
    );

    this.setState({
      styleMap: newInlineStyles,
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, color.hex)
    })
  };

  openColorPicker(e) {
    this.setState({
      colorPickerOpen: true,
      colorPickerButton: e.target
    })
  };

  closeColorPicker() {
    this.setState({
      colorPickerOpen: false
    })
  }

colorPicker() {
    return(
      <div style={{display: 'inline-block'}}>
      <RaisedButton
        backgroundColor={colors.white}
        icon={<FontIcon className="material-icons">color_lens</FontIcon>}
        onClick={this.openColorPicker.bind(this)}
      />
      <Popover
        open={this.state.colorPickerOpen}
        anchorEl={this.state.colorPickerButton}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.closeColorPicker.bind(this)}
      >
        <CompactPicker onChangeComplete={this.formatColor.bind(this)}/>
      </Popover>
      </div>
    )
  }

  _onBulletClick(){
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'unordered-list-item'
    ));
  }

  _onNumberedClick(){
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'ordered-list-item'
    ));
  }

  _changeFontSize(zooma){
    var newFontSize = this.state.currFontSize + (zooma ? -40 : 40)

    var newStyleMap = Object.assign(
      {},
      this.state.styleMap,
      {[newFontSize]: {fontSize: `${newFontSize}px`}}
    )

    this.setState({
      styleMap: newStyleMap,
      editorState: RichUtils.toggleInlineStyle(this.state.editorState, String(newFontSize)),
      currFontSize: newFontSize
    })
  }



  applyfontSize(zooma){
    return (
      <div style={{display: 'inline-block'}}>
        <RaisedButton
          backgroundColor={colors.white}
          icon={<FontIcon className="material-icons"> {zooma ? 'zoom_out' : 'zoom_in'}</FontIcon>}
          onMouseDown={() => this._changeFontSize(zooma)}
        />
      </div>
      )
  }

  render() {
    return (
      <div id="content">
      <AppBar title = "Best Docs"/>
        <div className = "toolbar">
          {this.formatButton({icon: 'format_bold', style:'BOLD'})}
          {this.formatButton({icon: 'format_italic', style:'ITALIC' })}
          {this.formatButton({icon: 'format_underline', style:'UNDERLINE'})}
          {this.formatButton({icon: 'format_strikethrough', style:'STRIKETHROUGH'})}

          <RaisedButton
            backgroundColor={colors.white}
            icon={<FontIcon className="material-icons">save</FontIcon>}
            onClick={this._onSaveClick.bind(this)}
          />
          {this.blockTypeButton({icon: 'format_align_center', blockType:'center'})}
          {this.blockTypeButton({icon: 'format_align_left', blockType:'left'})}
          {this.blockTypeButton({icon: 'format_align_right', blockType:'right'})}
          {this.blockTypeButton({icon: 'format_list_numbered', blockType:'ordered-list-item'})}
          {this.blockTypeButton({icon: 'format_list_bulleted', blockType:'unordered-list-item'})}
          {this.colorPicker()}
          {this.applyfontSize(false)}
          {this.applyfontSize(true)}
        </div>

        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            spellcheck={true}
            blockStyleFn={myBlockStyleFn}
            blockRenderMap={extendedBlockRenderMap}
            customStyleMap={this.state.styleMap}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default MyEditor;
