import React from 'react';
import {Editor, EditorState, RichUtils, Modifier, DefaultDraftBlockRenderMap} from 'draft-js';
import Immutable from 'immutable';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import * as colors from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';

import { CompactPicker } from 'react-color';
// console.log(Dropdown.DropdownTrigger);
// const DropdownTrigger = Dropdown.DropdownTrigger;
// const DropdownContent = Dropdown.DropdownContent;

require('./styles/draft.css');


const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through'
  }
}

const blockRenderMap = Immutable.Map({
  'CENTER': {
    element: 'center'
  },
  'unstyled': {
    element: 'div'
  },
  'RIGHT': {
    element: 'div'
  },
  'LEFT': {
    element: 'div'
  }
});

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
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => {this.setState({editorState});}
  };

  _onSaveClick(){
    const contentState = this.state.editorState.getCurrentContent();
    this.props.saveDoc(contentState);
  }

  toggleColorPicker(e) {
    this.setState({
      colorPickerOpen: true,
      colorPickerButton: e.target
    });
    
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

  alignButton({icon, blockType}){
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
      this.state.inlineStyles,
      {
        [color.hex]: {
          color: color.hex,
        }
      }
    );

    this.setState({
      inlineStyles: newInlineStyles,
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

  render() {
    return (
      <div id="content">
      <AppBar title = "Best Docs"/>
        <div className = "toolbar">
          {this.formatButton({icon: 'format_bold', style:'BOLD'})}
          {this.formatButton({icon: 'format_italic', style:'ITALIC' })}
          {this.formatButton({icon: 'format_underline', style:'UNDERLINE'})}
          {this.formatButton({icon: 'format_strikethrough', style:'STRIKETHROUGH'})}
          {this.formatButton({icon: 'save'})}
          {this.alignButton({icon: 'format_align_center', blockType:'center'})}
          {this.alignButton({icon: 'format_align_left', blockType:'left'})}
          {this.alignButton({icon: 'format_align_right', blockType:'right'})}
          {this.colorPicker()}
        </div>

        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            spellcheck={true}
            blockStyleFn={myBlockStyleFn}
            blockRenderMap={blockRenderMap}
            customStyleMap={styleMap}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default MyEditor;
