import * as React from 'react';
import { DefaultIcon } from './icon';
import { DivElement } from './types';

export function useToggleButton() {
  const [isOpen, setIsOpen] = React.useState(false);

  return {
    isOpen,
    bind: {
      onClick: () => setIsOpen(!isOpen),
    },
  };
}

export const ToggleButton = (props: DivElement) => (
  <div className="PriorityNav_Button" {...props}>
    {props.children || <DefaultIcon />}
  </div>
);
