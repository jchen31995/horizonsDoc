var React = require('react');
import {Editor, EditorState, RichUtils} from 'draft-js';
require('./styles/draft.css');

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  };

  render() {
    return (
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
    );
  }
}

module.exports = {
  MyEditor
}
