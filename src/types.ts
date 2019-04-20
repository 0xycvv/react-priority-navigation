import * as React from 'react';

export interface PriorityNavProps extends Partial<DefaultProps> {
  className?: string;
  style?: React.CSSProperties;
  children: Array<React.ReactNode | React.ReactElement>;
  dropdown: (dropdownProps: {
    dropdownItems: Array<React.ReactElement>;
    buttonProps: UseToggleButtonReturn;
    isOpen: boolean;
  }) => React.ReactNode;
  // dropdown: (

  // ) => React.ReactNode;
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
}

export interface PriorityNavState {
  children: Array<React.ReactNode | React.ReactElement>;
  dropdownItems: Array<React.ReactElement>;
  lastItemWidth: number[];
}

interface UseToggleButtonReturn {
  bind: {
    onClick: () => void;
  };
}

export type DivElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
