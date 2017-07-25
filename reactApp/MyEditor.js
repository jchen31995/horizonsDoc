import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

// console.log(Dropdown.DropdownTrigger);
// const DropdownTrigger = Dropdown.DropdownTrigger;
// const DropdownContent = Dropdown.DropdownContent;

require('./styles/draft.css');


const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through'
  },
  'BLUE': {
    color: 'blue'
  },
  'RED': {
    color: 'red'
  },
  'GREEN': {
    color: 'green'
  }
}
class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
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

  _onStrClick(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'STRIKETHROUGH'
    ))
  }

  _onBlueClick(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BLUE'
    ))
  }

  _onRedClick(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'RED'
    ))
  }

  _onGreenClick(){
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'GREEN'
    ))
  }

  render() {
    return (
      <div id="content">
        <h1>This is the text editor</h1>
          <button onClick={this._onBoldClick.bind(this)}><strong>Bold</strong></button>
          <button onClick={this._onItalClick.bind(this)}><em>Italicize</em></button>
          <button onClick={this._onULClick.bind(this)}><u>Underline</u></button>
          <button onClick={this._onStrClick.bind(this)}><strike>Strikethrough</strike></button>
          <button onClick={this._onBlueClick.bind(this)}>Make Everything Blue</button>

          <Dropdown>
            <DropdownTrigger><span className="dropdown__trigger"> - color - </span></DropdownTrigger>
            <DropdownContent>
              <ul>
                <li onClick={this._onRedClick.bind(this)}>Red</li>
                <li onClick={this._onGreenClick.bind(this)}>Green</li>
                <li onClick={this._onBlueClick.bind(this)}>Blue</li>
              </ul>
            </DropdownContent>
          </Dropdown>

          <div className="editor">
            <Editor
              customStyleMap={styleMap}
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
          </div>
      </div>
    );
  }
}

export default MyEditor;
