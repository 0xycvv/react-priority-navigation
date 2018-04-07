import React, { Component } from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import PriorityNav, { ToggleButton, DropdownList } from '../src/index';
import ArrowDownSVG from './arrow-down.svg';

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

const IconWrapper = styled.div`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"/></svg>
)

const CustomDropdown = styled.div`
  max-width: 400px;
  background: #f5f5f5;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
`;

const CustomItem = styled.div`
  padding: 20px;
  cursor: pointer;

  &:hover {
    color: white;
    background: #111111;
  }
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

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleDrag);
    window.removeEventListener('mouseup', this.handleDrag);
  }

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
})
.add('Custom Icon', () => {
  return (
    <DemoWrapper>
      <PriorityNav
        icon={(props) => (
          <ToggleButton {...props}>
             <Icon />
          </ToggleButton>
        )}
      >
      <button>I'm a Button ⏹ ️</button>
        <a>This is Link 🔗</a>
        <div>I'm a Div!</div>
        <div>Looooong Div🐢🐢🐢🐢</div>
        <div>🉑</div>
      </PriorityNav>
    </DemoWrapper>
  )
})
.add('Custom DropdownList', () => {
  return (
    <DemoWrapper>
      <PriorityNav
        dropdownList={(children) => (
          <CustomDropdown>
            {children.map(item => <CustomItem>{item}</CustomItem>)}
          </CustomDropdown>)
        }
      >
      <button>I'm a Button ⏹ ️</button>
        <a>This is Link 🔗</a>
        <div>I'm a Div!</div>
        <div>Looooong Div🐢🐢🐢🐢</div>
        <div onClick={() => console.log('onclicked')}>🉑</div>
      </PriorityNav>
    </DemoWrapper>
  )
})
