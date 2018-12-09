import * as React from 'react';
import { ButtonProps } from './types';

const ToggleButton = (props: ButtonProps) => (
  <div className="PriorityNav_Button" {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1rem" height="1rem">
      <path
        fill="currentColor"
        // tslint:disable-next-line
        d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
      />
    </svg>
  </div>
);

export default ToggleButton;
