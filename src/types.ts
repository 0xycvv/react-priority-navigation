import React from 'react';

interface IconSetting {
  color?: string;
  size?: number;
  hoverColor?: string;
}

export interface PriorityNavProps extends Partial<DefaultProps> {
  className?: string;
  style?: React.CSSProperties;
  children: Array<React.ReactNode>;
  dropdownList: (
    dropdownItems: any,
    isOpen: boolean,
  ) => React.ReactElement<HTMLElement>;
}

export interface DefaultProps {
  itemPadding: string | number;
  minWidth: string;
  offset: number;
  debounce: number;
  placement:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomRight'
    | 'bottomLeft';
  navSetting: {
    background: string;
  };
  isOpen: boolean;
  icon?: any;
}

export interface PriorityNavState {
  children: Array<React.ReactNode>;
  dropdownItems: Array<React.ReactNode>;
  lastItemWidth: Array<number>;
  isOpen: boolean;
}

export interface ButtonProps {
  onClick?: () => void;
}
