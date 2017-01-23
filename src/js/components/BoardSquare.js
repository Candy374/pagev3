/**
 * Created by huangling on 21/01/2017.
 */
import React, {Component} from 'react';
import update from 'react/lib/update';
import {ItemTypes} from '../constants';
import {DropTarget, DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Box from './Box';

const squareTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveBox(item.id, left, top);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}


class BoardSquare extends Component {
  moveBox(id, left, top) {
    const boxes = update(this.props.boxes, {
      [id]: {
        $merge: {
          left: left,
          top: top
        }
      }
    });
    this.props.updateBoxes(boxes);
  }

  render() {
    const {connectDropTarget, boxes} = this.props;

    return connectDropTarget(
      <div className="board">
        {boxes.map((box, index) => {
          return (
            <Box key={index}
                 {...box}>
              {box.title}
            </Box>
          );
        })}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(DropTarget(ItemTypes.Text, squareTarget, collect)(BoardSquare));

