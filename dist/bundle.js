'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var styled = _interopDefault(require('styled-components'));
var Trigger = _interopDefault(require('rc-trigger'));
var ResizeObserver = _interopDefault(require('resize-observer-polyfill'));
var uniqid = require('uniqid');
var debounce = _interopDefault(require('lodash.debounce'));

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
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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

var Root = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: inline-block;\n  width: ", ";\n  /* height: ", "; */\n  vertical-align: middle;\n  cursor: pointer;\n  color: ", ";\n\n  &:hover {\n    color: #999;\n  }\n"], ["\n  display: inline-block;\n  width: ", ";\n  /* height: ", "; */\n  vertical-align: middle;\n  cursor: pointer;\n  color: ", ";\n\n  &:hover {\n    color: #999;\n  }\n"])), function (props) { return (props.size ? props.size + "px" : '16px'); }, function (props) { return (props.size ? props.size + "px" : '16px'); }, function (props) { return (props.color ? props.color : '#000'); });
var ToggleButton = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (React.createElement(Root, __assign({}, props), children || (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
        React.createElement("path", { fill: "currentColor", 
            // tslint:disable-next-line
            d: "M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" })))));
};
var templateObject_1;

var Root$1 = styled.div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n  min-width: ", ";\n  position: relative;\n  white-space: nowrap;\n"], ["\n  min-width: ", ";\n  position: relative;\n  white-space: nowrap;\n"])), function (_a) {
    var minWidth = _a.minWidth;
    return minWidth;
});
var Wrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: inline-block;\n  background: ", ";\n"], ["\n  display: inline-block;\n  background: ",
    ";\n"])), function (_a) {
    var background = _a.background;
    return background;
});
var Item = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: inline-block;\n  padding: ", ";\n"], ["\n  display: inline-block;\n  padding: ", ";\n"])), function (_a) {
    var itemPadding = _a.itemPadding;
    return itemPadding;
});
var PLACEMENT = {
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
var PriorityNav = /** @class */ (function (_super) {
    __extends(PriorityNav, _super);
    function PriorityNav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            children: _this.props.children,
            dropdownItems: [],
            lastItemWidth: [],
            show: false,
        };
        _this.outerNav = React.createRef();
        _this.nav = React.createRef();
        _this.items = new Map();
        // tslint:disable-next-line:member-ordering
        _this.doesItFit = debounce(function () {
            if (_this.nav.current && _this.outerNav.current) {
                var outerWidth_1 = _this.outerNav.current.offsetWidth;
                var totalWidth = _this.nav.current.offsetWidth;
                if (_this.items.size > 0 && totalWidth > outerWidth_1) {
                    _this.moveItemToList();
                }
                else if (_this.state.dropdownItems.length > 0 &&
                    outerWidth_1 >
                        totalWidth +
                            _this.state.lastItemWidth[_this.state.lastItemWidth.length - 1] +
                            _this.props.offset) {
                    _this.moveItemToNav();
                }
            }
            _this.doesItFit();
        }, _this.props.debounce);
        _this.toggleShow = function () {
            _this.setState(function (prevState, props) { return ({
                show: !prevState.show,
            }); });
        };
        // -------------------------------------
        //   Move Item
        // -------------------------------------
        _this.moveItemToList = function () {
            _this.setState(function (prevState) {
                var children = prevState.children.slice();
                var lastItem = children.splice(-1, 1);
                return {
                    children: children,
                    dropdownItems: lastItem.concat(prevState.dropdownItems),
                    lastItemWidth: prevState.lastItemWidth.concat([
                        _this.items.get(prevState.children.length - 1).clientWidth,
                    ]),
                };
            });
        };
        _this.moveItemToNav = function () {
            _this.setState(function (prevState, props) {
                var dropdownItems = prevState.dropdownItems.slice();
                var firstItemFromList = dropdownItems.splice(0, 1);
                return {
                    children: prevState.children.slice().concat(firstItemFromList),
                    dropdownItems: dropdownItems,
                    lastItemWidth: prevState.lastItemWidth.splice(0, 1),
                };
            });
        };
        // -------------------------------------
        //   Render Method
        // -------------------------------------
        _this.renderIcon = function () {
            if (_this.props.icon) {
                if (typeof _this.props.icon === 'function') {
                    return _this.props.icon(_this.props.iconSetting || {});
                }
                return React.createElement(_this.props.icon, _this.props.iconSetting);
            }
            return React.createElement(ToggleButton, __assign({}, _this.props.iconSetting));
        };
        _this.renderDropdownList = function () {
            var dropdownChildren = _this.state.dropdownItems.map(function (item) { return item; });
            return _this.props.dropdownList(dropdownChildren);
        };
        _this.renderChildren = function () {
            var _a = _this.props, children = _a.children, itemPadding = _a.itemPadding, icon = _a.icon, navSetting = _a.navSetting, minWidth = _a.minWidth, props = __rest(_a, ["children", "itemPadding", "icon", "navSetting", "minWidth"]);
            return React.Children.map(_this.state.children, 
            // tslint:disable-next-line
            function (child, i) {
                return (React.createElement(Item, { innerRef: function (s) {
                        _this.items.set(i, s);
                    }, itemPadding: itemPadding, key: uniqid.time() }, child));
            });
        };
        return _this;
    }
    PriorityNav.prototype.componentDidMount = function () {
        this.resizeObserver = new ResizeObserver(this.doesItFit);
        if (this.outerNav.current) {
            this.resizeObserver.observe(this.outerNav.current);
        }
        this.doesItFit();
    };
    PriorityNav.prototype.componentWillUnmount = function () {
        if (this.outerNav.current) {
            this.resizeObserver.unobserve(this.outerNav.current);
        }
    };
    PriorityNav.prototype.render = function () {
        return (React.createElement(Root$1, { minWidth: this.props.minWidth, innerRef: this.outerNav, className: this.props.className },
            React.createElement(Wrapper, __assign({}, this.props.navSetting, { innerRef: this.nav }),
                this.renderChildren(),
                this.state.dropdownItems.length > 0 && (React.createElement(Trigger, { action: ['click'], popupAlign: {
                        points: PLACEMENT[this.props.placement].points,
                        offset: [0, 3],
                    }, popup: this.renderDropdownList() }, this.renderIcon())))));
    };
    PriorityNav.defaultProps = {
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
    return PriorityNav;
}(React.Component));
var templateObject_1$1, templateObject_2, templateObject_3;

exports.default = PriorityNav;
exports.ToggleButton = ToggleButton;
