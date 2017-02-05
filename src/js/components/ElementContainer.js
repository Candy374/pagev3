/**
 * Created by huangling on 04/02/2017.
 */
import React, {Component, PropTypes} from 'react';
import {ItemTypes} from '../constants';
import {DragSource} from 'react-dnd';

const source = {
  beginDrag(props) {
  },
  canDrag() {
    return false
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

class ElementContainer extends Component {

  render() {
    const {
      connectDragSource, children
    } = this.props;

    /*return (
     <div className="box" style={{...style, left, top}}
     onMouseDown={onMouseDown}
     onClick={onClick}>
     {connectDragSource(<div className="dragger" />)}
     {children}
     </div>
     );*/

  }
}

export default DragSource(ItemTypes.Text, source, collect)(ElementContainer);

