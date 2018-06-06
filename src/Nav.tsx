import * as React from 'react';
import Trigger from 'rc-trigger';
import styled from 'styled-components';
import ResizeObserver from 'resize-observer-polyfill';
import 'rc-trigger/assets/index.css';
import { time } from 'uniqid';

import { ButtonProps, PriorityNavProps, PriorityNavState } from './types';
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
  background: ${(props: { background?: string }) =>
    props.background ? props.background : 'unset'};
`;

const Item = styled.div`
  display: inline-block;
  padding: ${(props: { spaceBetween?: string }) =>
    props.spaceBetween ? props.spaceBetween : 'unset'};

  &:first-child {
    padding-left: 0;
  }
`;

const DropdownListItem = styled(Item)`
  display: block;
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
  resizeObserver: ResizeObserver;

  componentDidMount() {
    this.doesItFit();
    this.resizeObserver = new ResizeObserver(this.onResize);
    this.resizeObserver.observe(this.outerNav);
  }

  componentWillUnmount() {
    window.clearInterval(this.state.resizeId!);
    this.resizeObserver.unobserve(this.outerNav);
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
    const { children } = this.props;
    let dropdownChildren = this.state.dropdownItems.map(item => item);
    if (this.props.dropdownList) {
      return this.props.dropdownList(dropdownChildren, this.props);
    }
    return (
      <DropdownList>
        {dropdownChildren.map(item => <DropdownListItem key={time()} {...this.props}>{item}</DropdownListItem>)}
      </DropdownList>
    );
  };

  renderChildren = () => {
    const { children, itemPadding, ...props } = this.props;
    return React.Children.map(
      this.state.children,
      // tslint:disable-next-line
      (child: React.ReactElement<any>, i: number) => {
        return (
          <Item
            innerRef={s => {
              this.items.set(i, s);
            }}
            key={time()}
            spaceBetween={itemPadding}
          >
            {React.cloneElement(child, props)}
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
          {this.renderChildren()}
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
