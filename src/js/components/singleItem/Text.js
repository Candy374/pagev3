/**
 * Created by huangling on 21/01/2017.
 */
import React, {Component} from 'react';
import * as ReactDOM from 'react-dom';

export default class Text extends Component {
  componentWillMount() {
    this.state = {
      text: '请输入文字',
    };

    this.saveSettings = this.saveSettings.bind(this);
  }

  componentDidMount() {
    const dom = ReactDOM.findDOMNode(this.input);
    dom.focus();
  }

  saveSettings() {
    this.props.onSave(this.state);
  }

  render() {
    const {contentClass = ''} = this.props;
    const {text} = this.state;
    return (
      <div className="style" onBlur={this.saveSettings}>
        <div className={`contents ${contentClass}`}>
          <input ref={node => this.input = node}
                 style={{}}
                 onChange={(event) => this.setState({text: event.target.value})}
                 value={text}/>
        </div>
      </div>
    );
  }
}
