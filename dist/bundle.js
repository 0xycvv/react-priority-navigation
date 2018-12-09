'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var ResizeObserver = _interopDefault(require('resize-observer-polyfill'));
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

var classNames = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.filter(Boolean).join(' ');
};
var css = function (styles) { return styles; };

var ToggleButton = function (props) { return (React.createElement("div", __assign({ className: "PriorityNav_Button" }, props),
    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", width: "1rem", height: "1rem" },
        React.createElement("path", { fill: "currentColor", 
            // tslint:disable-next-line
            d: "M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" })))); };

var Style = function (_a) {
    var css$$1 = _a.css;
    return (React.createElement("style", { dangerouslySetInnerHTML: {
            __html: css$$1,
        } }));
};
var styles = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .PriorityNav_Root {\n    position: relative;\n    white-space: nowrap;\n  }\n  .PriorityNav_Main {\n    display: inline-block;\n  }\n  .PriorityNav_Item {\n    display: inline-block;\n  }\n  .PriorityNav_Button {\n    display: inline-block;\n    vertical-align: middle;\n    cursor: pointer;\n    &:hover {\n      color: #999;\n    }\n  }\n"], ["\n  .PriorityNav_Root {\n    position: relative;\n    white-space: nowrap;\n  }\n  .PriorityNav_Main {\n    display: inline-block;\n  }\n  .PriorityNav_Item {\n    display: inline-block;\n  }\n  .PriorityNav_Button {\n    display: inline-block;\n    vertical-align: middle;\n    cursor: pointer;\n    &:hover {\n      color: #999;\n    }\n  }\n"])));
var Div = React.forwardRef(function (props, ref) { return (React.createElement("div", __assign({ ref: ref }, props, { className: props.className }))); });
var PriorityNav = /** @class */ (function (_super) {
    __extends(PriorityNav, _super);
    function PriorityNav() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            children: _this.props.children,
            dropdownItems: [],
            lastItemWidth: [],
            isOpen: false,
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
                    _this.doesItFit();
                }
                else if (_this.state.dropdownItems.length > 0 &&
                    outerWidth_1 >
                        totalWidth +
                            _this.state.lastItemWidth[_this.state.lastItemWidth.length - 1] +
                            _this.props.offset) {
                    _this.moveItemToNav();
                    _this.doesItFit();
                }
            }
        }, _this.props.debounce);
        _this.toggleShow = function () {
            _this.setState(function (prevState) { return ({
                isOpen: !prevState.isOpen,
            }); });
        };
        _this.getButtonProps = function () {
            return {
                onClick: _this.toggleShow,
            };
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
                    return _this.props.icon();
                }
                return _this.props.icon;
            }
            return React.createElement(ToggleButton, __assign({}, _this.getButtonProps()));
        };
        _this.renderDropdownList = function () {
            var dropdownChildren = _this.state.dropdownItems.map(function (item) { return item; });
            return _this.props.dropdownList(dropdownChildren, _this.state.isOpen);
        };
        _this.renderChildren = function () {
            var _a = _this.props, children = _a.children, itemPadding = _a.itemPadding, props = __rest(_a, ["children", "itemPadding"]);
            return React.Children.map(_this.state.children, function (child, i) {
                return (React.createElement(Div, { ref: function (s) { return _this.setItems(i, s); }, style: {
                        padding: itemPadding,
                    }, className: 'PriorityNav_Item', key: i }, child));
            });
        };
        _this.setItems = function (i, s) {
            if (s) {
                _this.items.set(i, s);
            }
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
        return (React.createElement(React.Fragment, null,
            React.createElement(Div, { style: {
                    minWidth: this.props.minWidth,
                }, ref: this.outerNav, className: classNames('PriorityNav_Root', this.props.className) },
                React.createElement(Style, { css: styles }),
                React.createElement(Div, { ref: this.nav, className: classNames('PriorityNav_Main') },
                    this.renderChildren(),
                    this.renderIcon())),
            this.renderDropdownList()));
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
        icon: undefined,
    };
    return PriorityNav;
}(React.Component));
var templateObject_1;

exports.default = PriorityNav;
exports.ToggleButton = ToggleButton;
