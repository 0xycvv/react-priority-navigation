interface IconSetting {
  color?: string;
  size?: number;
  hoverColor?: string;
}

export interface PriorityNavProps extends Partial<DefaultProps> {
  children: Array<React.ReactNode>;
  dropdownList: (
    dropdownItems: any,
  ) => React.ReactElement<HTMLElement>;
}

export interface DefaultProps {
  itemPadding: string | number;
  minWidth: string;
  offset: number;
  delay: number;
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
  iconSetting: IconSetting;
  icon?: (
    props: IconSetting,
  ) => React.ReactElement<HTMLElement>;
}

export interface PriorityNavState {
  children: Array<React.ReactNode>;
  dropdownItems: Array<React.ReactNode>;
  lastItemWidth: Array<number>;
  show: boolean;
}

export interface ButtonProps {
  color?: string;
  size?: number;
  hoverColor?: string;
  children?: React.ReactNode;
}
