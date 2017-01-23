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
  isDragging: monitor.isDragging()
});

class Box extends Component {

  render() {
    const {
      left, top, connectDragSource, children, onMouseDown,
      onClick, style = {}
    } = this.props;

    return connectDragSource(
      <div className="box" style={{...style, left, top}}
           onMouseDown={onMouseDown}
           onClick={onClick}>
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

