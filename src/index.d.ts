import * as React from 'react';

declare class PriorityNav extends React.Component<PriorityNavProps, PriorityNavState> {}

export interface PriorityNavProps {
  children: Array<React.ReactNode>;
  itemPadding: string;
  minWidth: string;
  offset: number;
  delay: number;
  placement: 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';
  navSetting: {
    background: string;
  };
  iconSetting: {
    color: string;
    size: number;
    hoverColor: string;
  };
  icon: () => React.ReactElement<HTMLElement>;
  dropdownList: (children: React.ReactNode) => React.ReactElement<HTMLElement>;
}

export interface PriorityNavState {
  resizeId: number | null;
  children: Array<React.ReactNode>;
  dropdownItems: Array<React.ReactNode>;
  lastItemWidth: Array<number>;
  show: boolean;
}

export interface ButtonProps {
  color?: string;
  size?: number;
  hoverColor?: string;
  children?: React.ReactNode
}
