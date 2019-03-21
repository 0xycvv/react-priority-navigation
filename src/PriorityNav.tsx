import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import debounce from 'lodash.debounce';

import { classNames, css } from './utils';
import {
  PriorityNavProps,
  PriorityNavState,
  DefaultProps,
} from './types';
import ToggleButton from './ToggleButton';

export const Style = ({ css }: { css: any }) => (
  <style
    dangerouslySetInnerHTML={{
      __html: css,
    }}
  />
);

const styles = css`
  .PriorityNav_Root {
    position: relative;
    white-space: nowrap;
  }
  .PriorityNav_Main {
    display: inline-block;
  }
  .PriorityNav_Item {
    display: inline-block;
  }
  .PriorityNav_Button {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    &:hover {
      color: #999;
    }
  }
`;

type DivElement = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Div = React.forwardRef<HTMLDivElement, DivElement>(
  (props, ref) => (
    <div ref={ref} {...props} className={props.className} />
  ),
);

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
    icon: undefined,
  };
  state = {
    children: this.props.children,
    dropdownItems: [],
    lastItemWidth: [],
    isOpen: false,
  };
  outerNav: React.RefObject<HTMLDivElement> = React.createRef();
  nav: React.RefObject<HTMLDivElement> = React.createRef();
  items: Map<number, HTMLDivElement> = new Map();
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
        this.doesItFit();
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
        this.doesItFit();
      }
    }
  }, this.props.debounce);

  toggleShow = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  getButtonProps = () => {
    return {
      onClick: this.toggleShow,
    };
  };

  render() {
    return (
      <>
        <Div
          style={{
            minWidth: this.props.minWidth,
          }}
          ref={this.outerNav}
          className={classNames(
            'PriorityNav_Root',
            this.props.className,
          )}
        >
          <Style css={styles} />
          <Div
            ref={this.nav}
            className={classNames('PriorityNav_Main')}
          >
            {this.renderChildren()}
            {this.state.dropdownItems.length > 0 && this.renderIcon()}
          </Div>
        </Div>
        {this.renderDropdownList()}
      </>
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
        return this.props.icon();
      }
      return this.props.icon;
    }
    return <ToggleButton {...this.getButtonProps()} />;
  };

  private renderDropdownList = () => {
    const dropdownChildren = this.state.dropdownItems.map(
      item => item,
    );
    return this.props.dropdownList(
      dropdownChildren,
      this.state.isOpen,
    );
  };

  private renderChildren = () => {
    const { children, itemPadding, ...props } = this.props;
    return React.Children.map(
      this.state.children,
      (child: React.ReactElement<any>, i: number) => {
        return (
          <Div
            ref={(s: HTMLDivElement) => this.setItems(i, s)}
            style={{
              padding: itemPadding,
            }}
            className={'PriorityNav_Item'}
            key={i}
          >
            {child}
          </Div>
        );
      },
    );
  };

  private setItems = (i: number, s: HTMLDivElement | null) => {
    if (s) {
      this.items.set(i, s);
    }
  };
}
