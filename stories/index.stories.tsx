import * as React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import { PriorityNav, ToggleButton } from '../src/';
import { PopupContent, Popup } from '@vital-ui/react-popup';

const CustomItem = styled.div`
  padding: 20px;
  cursor: pointer;

  &:hover {
    color: white;
    background: #111111;
  }
`;

storiesOf('PriorityNav', module)
  .add('Custom DropdownList', () => {
    return (
      <PriorityNav
        dropdown={({ dropdownItems, buttonProps }) => (
          <Popup
            popup={
              <PopupContent>
                {dropdownItems.map((item, i) => (
                  <CustomItem key={i} {...item.props} />
                ))}
              </PopupContent>
            }
          >
            <ToggleButton {...buttonProps.bind} />
          </Popup>
        )}
      >
        <button>I'm a Button ⏹ ️</button>
        <a>This is Link 🔗</a>
        <div>I'm a Div!</div>
        <div>Looooong Div🐢🐢🐢🐢</div>
        <div onClick={() => console.log('onclicked')}>🉑</div>
      </PriorityNav>
    );
  })
  .add('Custom Icon', () => {
    return (
      <PriorityNav
        dropdown={({ dropdownItems, buttonProps, isOpen }) => (
          <>
            <ToggleButton {...buttonProps.bind} />
            <PopupContent>
              {dropdownItems.map((item, i) => (
                <CustomItem key={i} {...item.props} />
              ))}
            </PopupContent>
          </>
        )}
      >
        <button>I'm a Button ⏹ ️</button>
        <a>This is Link 🔗</a>
        <div>I'm a Div!</div>
        <div>Looooong Div🐢🐢🐢🐢</div>
        <div>🉑</div>
      </PriorityNav>
    );
  });
