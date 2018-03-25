import * as React from 'react';
import Trigger from 'rc-trigger';
import styled from 'styled-components';
import ResizeObserver from 'resize-observer-polyfill';

import ToggleButton from './ToggleButton';

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
    props.itemPadding ? props.itemPadding : '20px'};

  &:first-child {
    padding-left: 0;
  }
`;

interface Props {
  children: Array<React.ReactNode>;
  itemPadding: string;
  minWidth: string;
  offset: number;
  navSetting: {
    background: string;
  };
  iconSetting: {
    color: string;
    size: number;
    hoverColor: string;
  };
}

interface State {
  resizeId: any;
  children: Array<React.ReactNode>;
  dropdownItems: Array<React.ReactNode>;
  lastItemWidth: number | null;
}

export default class PriorityNav extends React.Component<Props, State> {
  static defaultProps = {
    offset: 110,
  };
  state = {
    resizeId: null,
    children: this.props.children,
    dropdownItems: [],
    lastItemWidth: null,
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
    // window.removeEventListener('resize', this.onResize);
    clearInterval(this.state.resizeId!);
  }

  onResize = () => {
    clearTimeout(this.state.resizeId!);
    this.setState({
      resizeId: setTimeout(this.doesItFit, 50),
    });
  };

  doesItFit = () => {
    if (this.nav) {
      const outerWidth = this.outerNav.offsetWidth;
      const totalWidth = this.nav.offsetWidth;
      // check if last item width
      if (this.items.size > 0 && totalWidth > outerWidth) {
        this.moveItemToList();
      } else if (
        this.state.dropdownItems.length > 0 &&
        outerWidth > totalWidth + this.state.lastItemWidth! + this.props.offset
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
        lastItemWidth: this.items.get(prevState.children.length - 1)!
          .clientWidth,
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
      };
    });
  };

  renderChildren = (props: Props) => {
    return React.Children.map(
      this.state.children,
      (child: React.ReactNode, i: number) => {
        return (
          <Item
            innerRef={s => {
              this.items.set(i, s);
            }}
            key={i}
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
            <ToggleButton {...this.props.iconSetting} />
          )}
        </Wrapper>
        {this.state.dropdownItems.length > 0 &&
          this.state.dropdownItems.map((item, i) => <div key={i}>{item}</div>)}
      </Root>
    );
  }
}
