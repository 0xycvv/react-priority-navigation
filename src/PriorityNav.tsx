import debounce from 'lodash.debounce';
import * as React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { useToggleButton } from './ToggleButton';
import {
  DivElement,
  PriorityNavProps,
  PriorityNavState,
} from './types';
import { classNames, css } from './utils';

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
    padding: 5px;
  }
  .PriorityNav_Button:hover {
    color: #999;
  }
`;

const Div = React.forwardRef<HTMLDivElement, DivElement>(
  (props, ref) => (
    <div ref={ref} {...props} className={props.className} />
  ),
);

function reducer(state: PriorityNavState, action: any) {
  switch (action.type) {
    case 'move':
      const lastChild = state.children[state.children.length - 1];
      const children = state.children.slice(0, -1);
      return {
        ...state,
        children,
        dropdownItems: [lastChild, ...state.dropdownItems],
        ...(action.payload.lastItem && {
          lastItemWidth: [
            ...state.lastItemWidth,
            action.payload.lastItem.clientWidth,
          ],
        }),
      };
    case 'return':
      const [
        firstItemFromList,
        ...dropdownItems
      ] = state.dropdownItems;
      const [_, ...lastItemWidth] = state.lastItemWidth;
      return {
        children: [...state.children, firstItemFromList],
        dropdownItems,
        lastItemWidth,
      };
    default:
      return state;
  }
}

export const PriorityNav: React.FC<PriorityNavProps> = (props) => {
  const outerNav = React.useRef<HTMLDivElement>(null);
  const nav = React.useRef<HTMLDivElement>(null);
  const items = React.useRef(new Map<number, HTMLDivElement>())
    .current;

  const initialState: PriorityNavState = {
    children: props.children as React.ReactElement[],
    dropdownItems: [],
    lastItemWidth: [],
  };
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const outerNavWidth = useResizeObserve(outerNav);

  React.useEffect(() => {
    doesItFit();
  }, [state.children, state.dropdownItems, outerNavWidth]);

  const doesItFit = debounce(() => {
    if (nav.current && outerNav.current) {
      const outerWidth = outerNav.current.offsetWidth;
      const totalWidth = nav.current.offsetWidth;

      if (state.children.length > 0 && totalWidth > outerWidth) {
        moveItemToList();
      } else if (
        state.dropdownItems.length > 0 &&
        outerWidth >
          totalWidth +
            state.lastItemWidth[state.lastItemWidth.length - 1] +
            (props.offset || 0)
      ) {
        moveItemToNav();
      }
    }
  }, props.debounce);

  const moveItemToList = () => {
    dispatch({
      type: 'move',
      payload: {
        lastItem: items.get(state.children.length - 1),
      },
    });
  };

  const moveItemToNav = () => {
    dispatch({
      type: 'return',
    });
  };

  const { isOpen, ...buttonProps } = useToggleButton();

  return (
    <>
      <Div
        style={{
          minWidth: props.minWidth,
        }}
        ref={outerNav}
        className={classNames('PriorityNav_Root', props.className)}
      >
        <Style css={styles} />
        <Div ref={nav} className={classNames('PriorityNav_Main')}>
          {React.Children.map(state.children, (child, i: number) => {
            return (
              <Div
                ref={(s: HTMLDivElement) => {
                  if (s) {
                    items.set(i, s);
                  }
                }}
                style={{
                  padding: props.itemPadding,
                }}
                className={'PriorityNav_Item'}
                key={i}
              >
                {child}
              </Div>
            );
          })}
          {state.dropdownItems.length > 0 &&
            props.dropdown({
              dropdownItems: state.dropdownItems as React.ReactElement[],
              buttonProps,
              isOpen,
            })}
        </Div>
      </Div>
    </>
  );
};

PriorityNav.defaultProps = {
  itemPadding: 0,
  offset: 0,
  debounce: 0,
  minWidth: '250px',
};

function useResizeObserve(ref: React.RefObject<HTMLElement>) {
  const [width, setWidth] = React.useState(
    ref.current
      ? ref.current.clientWidth
      : window
      ? window.innerWidth
      : 0,
  );

  function handleWidth() {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
    }
  }

  React.useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(handleWidth);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, [ref]);

  return width;
}
