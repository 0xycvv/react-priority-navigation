import React, { Component } from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import PriorityNav from '../src/index';

const Wrapper = styled.div`
  position: relative;
  border: 2px solid #fed;
  display: inline-block;
  overflow: hidden;
`;

const ResizeHandler = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 5px;
  background: #fed;
  cursor: col-resize;
`;

const Desc = styled.div`
  display: inline-block;
  padding-left: 10px;
`;

class DemoWrapper extends Component {
  state = {
    clientX: null,
    diff: null,
    start: 400,
  };

  handleMouseDown = e => {
    window.addEventListener('mousemove', this.handleDrag);
    window.addEventListener('mouseup', this.handleDragEnd);
    this.setState({
      clientX: e.clientX,
    });
  };

  handleDrag = e => {
    e.stopPropagation();
    this.setState((prevState, props) => {
      return {
        diff: prevState.clientX - e.clientX,
      };
    });
  };

  handleDragEnd = () => {
    window.removeEventListener('mousemove', this.handleDrag);
    window.addEventListener('mouseup', this.handleDragEnd);
    this.setState({
      start: this.state.start - this.state.diff,
      diff: null,
    });
  };
  render() {
    return (
      <div>
        <Wrapper
          style={{
            width: this.state.diff
              ? `${this.state.start - this.state.diff}px`
              : `${this.state.start}px`,
          }}
        >
          {this.props.children}
          <ResizeHandler onMouseDown={this.handleMouseDown} />
        </Wrapper>
        <Desc>👈🏼Drag the right bar to resize.</Desc>
      </div>
    );
  }
}

export default DemoWrapper;

storiesOf('PriorityNav', module).add('Basic', () => {
  return (
    <DemoWrapper>
      <PriorityNav>
        <button>I'm a Button ⏹ ️</button>
        <a>This is Link 🔗</a>
        <div>I'm a Div!</div>
        <div>Looooong Div🐢🐢🐢🐢</div>
        <div>🉑</div>
      </PriorityNav>
    </DemoWrapper>
  );
});
