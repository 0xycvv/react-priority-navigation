import * as React from 'react';
import styled from 'styled-components';
import { getElementContentWidth } from './utils';

const Root = styled.div`
  min-width: 250px;
  position: relative;
  white-space: nowrap;
`;

const Wrapper = styled.div``;

const Item = styled.div`
  display: inline-block;
  padding: ${(props: Props) =>
    props.itemPadding ? props.itemPadding : '4rem 2rem'};

  &:first-child {
    padding-left: 0;
  }
`;

// Component props
interface Props {
  children: React.ReactNode;
  itemPadding: string;
}

// Component state
interface State {
  resizeId: any;
}

export default class PriorityNav extends React.Component<Props, State> {
  state = {
    resizeId: null,
  };
  nav: HTMLDivElement;
  items: Array<HTMLElement> = [];

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.doesItFit();
  }

  onResize = (e: Event) => {
    // if (this.state.resizeId) {
    //   // tslint:disable-next-line
      clearTimeout(this.state.resizeId!)
    // };
    this.setState({
      resizeId: setTimeout(this.doesItFit, 50),
    });
  };

  doesItFit = () => {
    const total = this.nav.scrollWidth;
    const totalWidth = this.nav.offsetWidth;
    // check if last item width
    const toRemove = this.items.reduce((remove, item) => {
      console.log(remove, item);
      return remove;
    })
    // while (this.items.size > 0 && total > totalWidth) {
    //   this.moveItemToList();
    // }
      // console.log(this.items.get(this.items.size - 1)!.clientWidth);
  };

  moveItemToList = () => {
    console.log('haha');
  }

  renderChildren = (props: Props) => {
    return React.Children.map(
      this.props.children,
      (child: React.ReactNode, i: number) => {
        return (
          <Item
            innerRef={s => {
              this.items.push(s);
            }}
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
      <Root>
        <Wrapper
          innerRef={s => {
            this.nav = s;
          }}
        >
          {this.renderChildren(this.props)}
        </Wrapper>
      </Root>
    );
  }
}
