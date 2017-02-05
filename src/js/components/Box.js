/**
 * Created by huangling on 21/01/2017.
 */
import React, {Component, PropTypes} from 'react';
import {ItemTypes} from '../constants';
import {DragSource} from 'react-dnd';

const source = {
  beginDrag(props) {
    const {id, left, top} = props;
    return {id, left, top};
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
});

class Box extends Component {
  componentWillMount() {
    this.state = {
      showDrag: false
    };
  }

  onClick() {
    this.setState({
      showDrag: true
    });
    this.props.onClick();
  }

  render() {
    const {
      left, top, connectDragSource, children, onMouseDown,
      style = {}, connectDragPreview
    } = this.props;

    const {showDrag} = this.state;

    return connectDragPreview(
      <div className={`box ${showDrag ? 'editing' : ''}`} style={{...style, left, top}}
           onMouseDown={onMouseDown}
           onClick={this.onClick.bind(this)}
           onBlur={() => this.setState({showDrag: false})}>
        {showDrag && connectDragSource(
          <div className="drag-group">
            <div className="top"/>
            <div className="left"/>
            <div className="right"/>
            <div className="bottom"/>
          </div>
        )}
        {showDrag && <div className="size-group">
          <div className="top-left"/>
          <div className="top-right"/>
          <div className="middle-left"/>
          <div className="middle-right"/>
          <div className="bottom-right"/>
          <div className="bottom-left"/>
          <div className="rotate"/>
        </div>
        }
        {children}
      </div>
    );
  }
}

Box.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  children: PropTypes.node
};

export default DragSource(ItemTypes.Text, source, collect)(Box);

