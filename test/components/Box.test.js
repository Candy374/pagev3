import React from 'react';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import Box from '../../src/js/components/Box';
import {expect} from 'chai';

describe('<Box />', () => {
  it('can render', () => {
    const OriginalBox = Box.DecoratedComponent;

    const identity = x => x;
    let clicked = false;

    let box = shallow(
      <OriginalBox name='test'
                   id="0"
                   left={123}
                   top={456}
                   onClick={() => clicked = true}
                   connectDragPreview={identity}
                   connectDragSource={identity}
                   isDragging={false}/>
    );
    expect(box.prop('className'), 'box');
  });

  it('can not show drag handle before clicked', () => {
    const OriginalBox = Box.DecoratedComponent;

    const identity = x => x;
    let box = shallow(
      <OriginalBox name='test'
                   id="0"
                   left={123}
                   top={456}
                   connectDragPreview={identity}
                   connectDragSource={identity}
                   isDragging={false}>
      </OriginalBox>
    );
    expect(box.find('.drag-group')).to.have.length(0);
  });

  it('can show drag handle after clicked', () => {
    const OriginalBox = Box.DecoratedComponent;

    const identity = x => x;

    const onButtonClick = sinon.spy();

    let box = shallow(
      <OriginalBox name='test'
                   id="0"
                   left={123}
                   top={456}
                   onClick={onButtonClick}
                   connectDragPreview={identity}
                   connectDragSource={identity}
                   isDragging={false}>
      </OriginalBox>
    );
    box.simulate('click');
    expect(box.find('.drag-group')).to.have.length(1);
    expect(box.prop('className')).to.include('editing');
  });
});