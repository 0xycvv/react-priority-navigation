import * as React from 'react';
import styled from 'styled-components';
import { ButtonProps } from './types';

const Root = styled.div`
  display: inline-block;
  width: ${(props: ButtonProps) => (props.size ? `${props.size}px` : '16px')};
  /* height: ${props => (props.size ? `${props.size}px` : '16px')}; */
  vertical-align: middle;
  cursor: pointer;
  color: ${props => (props.color ? props.color : '#000')};

  &:hover {
    color: #999;
  }
`;

const ToggleButton = ({ children, ...props }: ButtonProps) => (
  <Root {...props}>
    {children || (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          fill="currentColor"
          // tslint:disable-next-line
          d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
        />
      </svg>
    )}
  </Root>
);

export default ToggleButton;
