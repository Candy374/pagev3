/**
 * Created by huangling on 19/01/2017.
 */
import React, {Component} from 'react';
import Text from '../components/singleItem/Text';
import Image from '../components/singleItem/Image';
import BoardSquare from '../components/BoardSquare';
import {Button, Modal} from 'antd';
import SettingDialog from '../components/SettingDialog';

const Widgets = {
  Image,
  Text
};

let previewHtml = '';

export default class Page extends Component {
  componentWillMount() {
    this.state = {
      boxes: [],
      newBox: null
    };
    this.onAddItem = this.onAddItem.bind(this);
    this.onPreview = this.onPreview.bind(this);
  }

  onAddItem(type) {
    const Comp = Widgets[type];
    const id = this.state.boxes.length;
    const newBox = {
      top: 20,
      left: 80,
      id: id,
      title: <Comp onSave={(settings) => {
        Object.assign(this.state.boxes[id], settings)
      } }/>,
      onClick: () => this.setState({showSetting: true}),
      onMouseDown: () => this.setState({focusedId: id})
    };
    this.setState({
      boxes: this.state.boxes.concat(newBox),
      focusedId: id
    });
  }

  updateBoxes(boxes) {
    this.setState({boxes});
  }

  onSave() {

  }

  onPreview() {

  }

  updateStyle(style) {
    this.state.boxes[this.state.focusedId].style = style;
    this.setState({boxes: this.state.boxes});
  }
  renderPreview() {
    return (
      <div className="layer">
        <Modal
          visible
          title="Preview"
          onOk={() => this.setState({preview: false})}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={() => this.setState({preview: false})}>Return</Button>
          ]}>
          <div dangerouslySetInnerHTML={{__html: previewHtml}}/>
        </Modal>
      </div>
    );
  }

  render() {
    const headerItem = [
      {title: 'Text'}, {title: 'Image'}
    ];

    const {preview, showSetting, boxes} = this.state;

    return (
      <div>
        <div>
          <header className="header">
            {
              headerItem.map((item, index) => (
                <Button className="item" key={index}
                        onClick={() => this.onAddItem(item.title)}>
                  {item.title}
                </Button>)
              )
            }
          </header>
          <div className="main-container">
            <section className="content">
              <BoardSquare boxes={boxes}
                           updateBoxes={this.updateBoxes.bind(this)}/>

              <div>
                {boxes.map((box, index) => (
                  <div key={index}>
                    {
                      Object.keys(box).map((key, index) => {
                        if (typeof box[key] != 'object' && typeof box[key] != 'function') {
                          return <span key={index}>{`${key}: ${box[key]}; `}</span>;
                        }
                      })
                    }
                    {box.style && Object.keys(box.style).map((key, index) => {
                      if (typeof box.style[key] != 'object' && typeof box.style[key] != 'function') {
                        return <span key={index}>{`${key}: ${box.style[key]}; `}</span>;
                      }
                    })
                    }
                    </div>
                  )
                )}
              </div>
            </section>
            <aside className="sidebar-right">
              <Button onClick={() => this.onSave()}>Save</Button>
              <Button onClick={() => this.onPreview()}>Preview</Button>
              <SettingDialog toggleShow={(show) => this.setState({showSetting: show})}
                             updateStyle={this.updateStyle.bind(this)}
                             show={showSetting}/>
            </aside>
          </div>
        </div>
        <div >
          {preview && this.renderPreview()}
        </div>
      </div>
    );
  }
}



