import * as React from 'react';
import Trigger from 'rc-trigger';
import styled from 'styled-components';
import ResizeObserver from 'resize-observer-polyfill';
import { time } from 'uniqid';
import debounce from 'lodash.debounce';
import 'rc-trigger/assets/index.css';

import {
  PriorityNavProps,
  PriorityNavState,
  DefaultProps,
} from './types';
import ToggleButton from './ToggleButton';

const Root = styled.div`
  min-width: ${({ minWidth }: { minWidth?: string }) => minWidth};
  position: relative;
  white-space: nowrap;
`;

const Wrapper = styled.div`
  display: inline-block;
  background: ${({ background }: { background: string }) =>
    background};
`;

const Item = styled.div`
  display: inline-block;
  padding: ${({ itemPadding }: { itemPadding?: string | number }) =>
    itemPadding};
`;

const PLACEMENT = {
  left: {
    points: ['cr', 'cl'],
  },
  right: {
    points: ['cl', 'cr'],
  },
  top: {
    points: ['bc', 'tc'],
  },
  bottom: {
    points: ['tc', 'bc'],
  },
  topLeft: {
    points: ['bl', 'tl'],
  },
  topRight: {
    points: ['br', 'tr'],
  },
  bottomRight: {
    points: ['tr', 'br'],
  },
  bottomLeft: {
    points: ['tl', 'bl'],
  },
};

export default class PriorityNav extends React.Component<
  PriorityNavProps,
  PriorityNavState
> {
  static defaultProps: DefaultProps = {
    itemPadding: 0,
    offset: 0,
    debounce: 0,
    placement: 'bottomRight',
    minWidth: '250px',
    navSetting: {
      background: 'unset',
    },
    isOpen: false,
    iconSetting: {},
    icon: undefined,
  };
  state = {
    children: this.props.children,
    dropdownItems: [],
    lastItemWidth: [],
    show: false,
  };
  outerNav: React.RefObject<HTMLDivElement> = React.createRef();
  nav: React.RefObject<HTMLDivElement> = React.createRef();
  items: Map<number, HTMLElement> = new Map();
  resizeObserver: ResizeObserver;

  componentDidMount() {
    this.resizeObserver = new ResizeObserver(this.doesItFit);
    if (this.outerNav.current) {
      this.resizeObserver.observe(this.outerNav.current);
    }
    this.doesItFit();
  }

  componentWillUnmount() {
    if (this.outerNav.current) {
      this.resizeObserver.unobserve(this.outerNav.current);
    }
  }

  // tslint:disable-next-line:member-ordering
  doesItFit = debounce(() => {
    if (this.nav.current && this.outerNav.current) {
      const outerWidth = this.outerNav.current.offsetWidth;
      const totalWidth = this.nav.current.offsetWidth;
      if (this.items.size > 0 && totalWidth > outerWidth) {
        this.moveItemToList();
      } else if (
        this.state.dropdownItems.length > 0 &&
        outerWidth >
          totalWidth +
            this.state.lastItemWidth[
              this.state.lastItemWidth.length - 1
            ] +
            this.props.offset!
      ) {
        this.moveItemToNav();
      }
    }
    this.doesItFit();
  }, this.props.debounce);

  toggleShow = () => {
    this.setState((prevState, props) => ({
      show: !prevState.show,
    }));
  };

  render() {
    return (
      <Root minWidth={this.props.minWidth} innerRef={this.outerNav}>
        <Wrapper {...this.props.navSetting!} innerRef={this.nav}>
          {this.renderChildren()}
          {this.state.dropdownItems.length > 0 && (
            <Trigger
              action={['click']}
              popupAlign={{
                points: PLACEMENT[this.props.placement!].points,
                offset: [0, 3],
              }}
              popup={this.renderDropdownList()}
            >
              {this.renderIcon()}
            </Trigger>
          )}
        </Wrapper>
      </Root>
    );
  }

  // -------------------------------------
  //   Move Item
  // -------------------------------------

  private moveItemToList = () => {
    this.setState(prevState => {
      const children = [...prevState.children];
      const lastItem = children.splice(-1, 1);
      return {
        children,
        dropdownItems: lastItem.concat(prevState.dropdownItems),
        lastItemWidth: [
          ...prevState.lastItemWidth,
          this.items.get(prevState.children.length - 1)!.clientWidth,
        ],
      };
    });
  };

  private moveItemToNav = () => {
    this.setState((prevState, props) => {
      const dropdownItems = [...prevState.dropdownItems];
      const firstItemFromList = dropdownItems.splice(0, 1);
      return {
        children: [...prevState.children].concat(firstItemFromList),
        dropdownItems,
        lastItemWidth: prevState.lastItemWidth.splice(0, 1),
      };
    });
  };

  // -------------------------------------
  //   Render Method
  // -------------------------------------

  private renderIcon = () => {
    if (this.props.icon) {
      if (typeof this.props.icon === 'function') {
        return this.props.icon(this.props.iconSetting || {});
      }
      return React.createElement(
        this.props.icon,
        this.props.iconSetting,
      );
    }
    return <ToggleButton {...this.props.iconSetting} />;
  };

  private renderDropdownList = () => {
    const dropdownChildren = this.state.dropdownItems.map(
      item => item,
    );
    return this.props.dropdownList(dropdownChildren);
  };

  private renderChildren = () => {
    const {
      children,
      itemPadding,
      icon,
      navSetting,
      minWidth,
      ...props
    } = this.props;
    return React.Children.map(
      this.state.children,
      // tslint:disable-next-line
      (child: React.ReactElement<any>, i: number) => {
        return (
          <Item
            innerRef={s => {
              this.items.set(i, s);
            }}
            itemPadding={itemPadding}
            key={time()}
          >
            {child}
          </Item>
        );
      },
    );
  };
}
