interface IconSetting {
  color: string;
  size: number;
  hoverColor: string;
}

export interface PriorityNavProps {
  children: Array<React.ReactNode>;
  itemPadding: string;
  minWidth: string;
  offset: number;
  delay: number;
  placement: 'left' | 'right' | 'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft';
  // TODO: more to root
  navSetting: {
    background: string;
  };
  iconSetting: IconSetting;
  icon: (props: IconSetting) => React.ReactElement<HTMLElement>;
  dropdownList: (children: React.ReactNode, props: any) => React.ReactElement<HTMLElement>;
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
