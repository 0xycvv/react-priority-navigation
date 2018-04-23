'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var styled = _interopDefault(require('styled-components'));
var Trigger = _interopDefault(require('rc-trigger'));
var ResizeObserver = _interopDefault(require('resize-observer-polyfill'));
var uniqid = require('uniqid');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".rc-trigger-popup {\n  position: absolute;\n  left: -9999px;\n  top: -9999px;\n  z-index: 1050;\n}\n.rc-trigger-popup-hidden {\n  display: none;\n}\n.rc-trigger-popup-zoom-enter,\n.rc-trigger-popup-zoom-appear {\n  opacity: 0;\n  animation-duration: 0.3s;\n  animation-fill-mode: both;\n  animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);\n  animation-play-state: paused;\n}\n.rc-trigger-popup-zoom-leave {\n  animation-duration: 0.3s;\n  animation-fill-mode: both;\n  animation-timing-function: cubic-bezier(0.6, -0.3, 0.74, 0.05);\n  animation-play-state: paused;\n}\n.rc-trigger-popup-zoom-enter.rc-trigger-popup-zoom-enter-active,\n.rc-trigger-popup-zoom-appear.rc-trigger-popup-zoom-appear-active {\n  animation-name: rcTriggerZoomIn;\n  animation-play-state: running;\n}\n.rc-trigger-popup-zoom-leave.rc-trigger-popup-zoom-leave-active {\n  animation-name: rcTriggerZoomOut;\n  animation-play-state: running;\n}\n@keyframes rcTriggerZoomIn {\n  0% {\n    opacity: 0;\n    transform-origin: 50% 50%;\n    transform: scale(0, 0);\n  }\n  100% {\n    opacity: 1;\n    transform-origin: 50% 50%;\n    transform: scale(1, 1);\n  }\n}\n@keyframes rcTriggerZoomOut {\n  0% {\n    opacity: 1;\n    transform-origin: 50% 50%;\n    transform: scale(1, 1);\n  }\n  100% {\n    opacity: 0;\n    transform-origin: 50% 50%;\n    transform: scale(0, 0);\n  }\n}\n.rc-trigger-popup-mask {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  bottom: 0;\n  background-color: #373737;\n  background-color: rgba(55, 55, 55, 0.6);\n  height: 100%;\n  filter: alpha(opacity=50);\n  z-index: 1050;\n}\n.rc-trigger-popup-mask-hidden {\n  display: none;\n}\n.rc-trigger-popup-fade-enter,\n.rc-trigger-popup-fade-appear {\n  opacity: 0;\n  animation-duration: 0.3s;\n  animation-fill-mode: both;\n  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  animation-play-state: paused;\n}\n.rc-trigger-popup-fade-leave {\n  animation-duration: 0.3s;\n  animation-fill-mode: both;\n  animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  animation-play-state: paused;\n}\n.rc-trigger-popup-fade-enter.rc-trigger-popup-fade-enter-active,\n.rc-trigger-popup-fade-appear.rc-trigger-popup-fade-appear-active {\n  animation-name: rcTriggerMaskFadeIn;\n  animation-play-state: running;\n}\n.rc-trigger-popup-fade-leave.rc-trigger-popup-fade-leave-active {\n  animation-name: rcDialogFadeOut;\n  animation-play-state: running;\n}\n@keyframes rcTriggerMaskFadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes rcDialogFadeOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n";
styleInject(css);

const Root = styled.div `
  display: inline-block;
  width: ${(props) => (props.size ? `${props.size}px` : '16px')};
  /* height: ${props => (props.size ? `${props.size}px` : '16px')}; */
  vertical-align: middle;
  cursor: pointer;
  color: ${props => (props.color ? props.color : '#000')};

  &:hover {
    color: #999;
  }
`;
const ToggleButton = (_a) => {
    var { children } = _a, props = __rest(_a, ["children"]);
    return (React.createElement(Root, Object.assign({}, props), children || (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
        React.createElement("path", { fill: "currentColor", 
            // tslint:disable-next-line
            d: "M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" })))));
};

const Root$1 = styled.div `
  background: #fff;
  max-width: 250px;
`;
const DropdownList = ({ children }) => (React.createElement(Root$1, null, children));

const Root$2 = styled.div `
  min-width: ${(props) => props.minWidth ? props.minWidth : '250px'};
  position: relative;
  white-space: nowrap;
`;
const Wrapper = styled.div `
  display: inline-block;
  background: ${(props) => props.background ? props.background : 'unset'};
`;
const Item = styled.div `
  display: inline-block;
  padding: ${(props) => props.itempadding ? props.itempadding : 'unset'};

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
class PriorityNav extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            resizeId: null,
            children: this.props.children,
            dropdownItems: [],
            lastItemWidth: [],
            show: false,
        };
        this.items = new Map();
        this.onResize = () => {
            window.clearTimeout(this.state.resizeId);
            this.setState({
                resizeId: window.setTimeout(this.doesItFit, this.props.delay),
            });
        };
        this.doesItFit = () => {
            if (this.nav) {
                const outerWidth = this.outerNav.offsetWidth;
                const totalWidth = this.nav.offsetWidth;
                if (this.items.size > 0 && totalWidth > outerWidth) {
                    this.moveItemToList();
                }
                else if (this.state.dropdownItems.length > 0 &&
                    outerWidth >
                        totalWidth +
                            this.state.lastItemWidth[this.state.lastItemWidth.length - 1] +
                            this.props.offset) {
                    this.moveItemToNav();
                }
            }
        };
        this.moveItemToList = () => {
            this.setState((prevState, props) => {
                const children = [...prevState.children];
                const lastItem = children.splice(-1, 1);
                return {
                    children,
                    dropdownItems: lastItem.concat(prevState.dropdownItems),
                    lastItemWidth: [
                        ...prevState.lastItemWidth,
                        this.items.get(prevState.children.length - 1).clientWidth,
                    ],
                };
            });
        };
        this.moveItemToNav = () => {
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
        this.toggleShow = () => {
            this.setState((prevState, props) => ({
                show: !prevState.show,
            }));
        };
        this.renderDropdownList = () => {
            let children = this.state.dropdownItems.map(item => item);
            if (this.props.dropdownList) {
                return this.props.dropdownList(children);
            }
            return (React.createElement(DropdownList, null, children.map(item => React.createElement("div", { key: uniqid.time() }, item))));
        };
        this.renderChildren = () => {
            const _a = this.props, { children, itemPadding } = _a, props = __rest(_a, ["children", "itemPadding"]);
            return React.Children.map(this.state.children, 
            // tslint:disable-next-line
            (child, i) => {
                return (React.createElement(Item, { innerRef: s => {
                        this.items.set(i, s);
                    }, key: uniqid.time(), itempadding: itemPadding }, React.cloneElement(child, props)));
            });
        };
    }
    componentDidMount() {
        this.doesItFit();
        const resizeObserver = new ResizeObserver(this.onResize);
        resizeObserver.observe(this.outerNav);
    }
    componentWillUnmount() {
        window.clearInterval(this.state.resizeId);
    }
    render() {
        return (React.createElement(Root$2, { minWidth: this.props.minWidth, innerRef: s => {
                this.outerNav = s;
            } },
            React.createElement(Wrapper, Object.assign({}, this.props.navSetting, { innerRef: s => {
                    this.nav = s;
                } }),
                this.renderChildren(),
                this.state.dropdownItems.length > 0 && (React.createElement(Trigger, { action: ['click'], popupAlign: {
                        points: PLACEMENT[this.props.placement].points,
                        offset: [0, 3],
                    }, popup: this.renderDropdownList() }, this.props.icon ? (React.createElement(this.props.icon, Object.assign({}, this.props.iconSetting))) : (React.createElement(ToggleButton, Object.assign({}, this.props.iconSetting))))))));
    }
}
PriorityNav.defaultProps = {
    itemPadding: 0,
    offset: 0,
    delay: 0,
    placement: 'bottomRight',
};

exports.default = PriorityNav;
exports.ToggleButton = ToggleButton;
exports.DropdownList = DropdownList;
