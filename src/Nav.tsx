import * as React from 'react';
import Trigger from 'rc-trigger';
import styled from 'styled-components';
import ResizeObserver from 'resize-observer-polyfill';
import 'rc-trigger/assets/index.css';
import { time } from 'uniqid';

import { ButtonProps, PriorityNavProps, PriorityNavState } from './index.d';
import ToggleButton from './ToggleButton';
import DropdownList from './DropdownList';

const Root = styled.div`
  min-width: ${(props: { minWidth: string }) =>
    props.minWidth ? props.minWidth : '250px'};
  position: relative;
  white-space: nowrap;
`;

const Wrapper = styled.div`
  display: inline-block;
  background: ${(props: { background: string }) =>
    props.background ? props.background : 'unset'};
`;

const Item = styled.div`
  display: inline-block;
  padding: ${(props: { itemPadding: string }) =>
    props.itemPadding ? props.itemPadding : 'unset'};

  &:first-child {
    padding-left: 0;
  }
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
  static defaultProps = {
    itemPadding: 0,
    offset: 0,
    delay: 0,
    placement: 'bottomRight',
  };
  state = {
    resizeId: null,
    children: this.props.children,
    dropdownItems: [],
    lastItemWidth: [],
    show: false,
  };
  outerNav: HTMLDivElement;
  nav: HTMLDivElement;
  items: Map<number, HTMLElement> = new Map();

  componentDidMount() {
    this.doesItFit();
    const resizeObserver = new ResizeObserver(this.onResize);
    resizeObserver.observe(this.outerNav);
  }

  componentWillUnmount() {
    window.clearInterval(this.state.resizeId!);
  }

  onResize = () => {
    window.clearTimeout(this.state.resizeId!);
    this.setState({
      resizeId: window.setTimeout(this.doesItFit, this.props.delay),
    });
  };

  doesItFit = () => {
    if (this.nav) {
      const outerWidth = this.outerNav.offsetWidth;
      const totalWidth = this.nav.offsetWidth;
      if (this.items.size > 0 && totalWidth > outerWidth) {
        this.moveItemToList();
      } else if (
        this.state.dropdownItems.length > 0 &&
        outerWidth >
          totalWidth +
            this.state.lastItemWidth[this.state.lastItemWidth.length - 1] +
            this.props.offset
      ) {
        this.moveItemToNav();
      }
    }
  };

  moveItemToList = () => {
    this.setState((prevState, props) => {
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

  moveItemToNav = () => {
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

  toggleShow = () => {
    this.setState((prevState, props) => ({
      show: !prevState.show,
    }));
  };

  renderDropdownList = () => {
    let children = this.state.dropdownItems.map(item => item);
    if (this.props.dropdownList) {
      return this.props.dropdownList(children);
    }
    return (
      <DropdownList>
        {children.map(item => <div key={time()}>{item}</div>)}
      </DropdownList>
    );
  };

  renderChildren = (props: PriorityNavProps) => {
    return React.Children.map(
      this.state.children,
      (child: React.ReactNode, i: number) => {
        return (
          <Item
            innerRef={s => {
              this.items.set(i, s);
            }}
            key={time()}
            itemPadding={props.itemPadding}
          >
            {child}
          </Item>
        );
      },
    );
  };

  public render() {
    return (
      <Root
        minWidth={this.props.minWidth}
        innerRef={s => {
          this.outerNav = s;
        }}
      >
        <Wrapper
          {...this.props.navSetting}
          innerRef={s => {
            this.nav = s;
          }}
        >
          {this.renderChildren(this.props)}
          {this.state.dropdownItems.length > 0 && (
            <Trigger
              action={['click']}
              popupAlign={{
                points: PLACEMENT[this.props.placement].points,
                offset: [0, 3],
              }}
              popup={this.renderDropdownList()}
            >
              {this.props.icon ? (
                React.createElement(this.props.icon, {
                  ...this.props.iconSetting,
                })
              ) : (
                <ToggleButton {...this.props.iconSetting} />
              )}
            </Trigger>
          )}
        </Wrapper>
      </Root>
    );
  }
}
