'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var debounce = _interopDefault(require('lodash.debounce'));
var React = require('react');
var React__default = _interopDefault(React);
var ResizeObserver = _interopDefault(require('resize-observer-polyfill'));

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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var DefaultIcon = function () { return (React__default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", width: "1rem", height: "1rem" },
    React__default.createElement("path", { fill: "currentColor", 
        // tslint:disable-next-line
        d: "M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z" }))); };

function useToggleButton() {
    var _a = __read(React.useState(false), 2), isOpen = _a[0], setIsOpen = _a[1];
    return {
        isOpen: isOpen,
        bind: {
            onClick: function () { return setIsOpen(!isOpen); },
        },
    };
}
var ToggleButton = function (props) { return (React.createElement("div", __assign({ className: "PriorityNav_Button" }, props), props.children || React.createElement(DefaultIcon, null))); };

var classNames = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.filter(Boolean).join(' ');
};
var css = function (styles) { return styles; };

var Style = function (_a) {
    var css = _a.css;
    return (React.createElement("style", { dangerouslySetInnerHTML: {
            __html: css,
        } }));
};
var styles = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  .PriorityNav_Root {\n    position: relative;\n    white-space: nowrap;\n  }\n  .PriorityNav_Main {\n    display: inline-block;\n  }\n  .PriorityNav_Item {\n    display: inline-block;\n  }\n  .PriorityNav_Button {\n    display: inline-block;\n    vertical-align: middle;\n    cursor: pointer;\n    padding: 5px;\n  }\n  .PriorityNav_Button:hover {\n    color: #999;\n  }\n"], ["\n  .PriorityNav_Root {\n    position: relative;\n    white-space: nowrap;\n  }\n  .PriorityNav_Main {\n    display: inline-block;\n  }\n  .PriorityNav_Item {\n    display: inline-block;\n  }\n  .PriorityNav_Button {\n    display: inline-block;\n    vertical-align: middle;\n    cursor: pointer;\n    padding: 5px;\n  }\n  .PriorityNav_Button:hover {\n    color: #999;\n  }\n"])));
var Div = React.forwardRef(function (props, ref) { return (React.createElement("div", __assign({ ref: ref }, props, { className: props.className }))); });
function reducer(state, action) {
    switch (action.type) {
        case 'move':
            var lastChildren = state.children.splice(-1, 1);
            return __assign({}, state, { children: state.children, dropdownItems: __spread(lastChildren).concat(state.dropdownItems) }, (action.payload.lastItem && {
                lastItemWidth: __spread(state.lastItemWidth, [
                    action.payload.lastItem.clientWidth,
                ]),
            }));
        case 'return':
            var copyDropdownItems = __spread(state.dropdownItems);
            var firstItemFromList = copyDropdownItems.splice(0, 1);
            var lastItemWidth = __spread(state.lastItemWidth);
            lastItemWidth.splice(0, 1);
            return {
                children: __spread(state.children, firstItemFromList),
                dropdownItems: copyDropdownItems,
                lastItemWidth: lastItemWidth,
            };
        default:
            return state;
    }
}
var PriorityNav = function (props) {
    var outerNav = React.useRef(null);
    var nav = React.useRef(null);
    var items = React.useRef(new Map())
        .current;
    var initalState = {
        children: props.children,
        dropdownItems: [],
        lastItemWidth: [],
    };
    var _a = __read(React.useReducer(reducer, initalState), 2), state = _a[0], dispatch = _a[1];
    var outerNavWidth = useResizeObserve(outerNav);
    React.useEffect(function () {
        doesItFit();
    }, [state.children, state.dropdownItems, outerNavWidth]);
    var doesItFit = debounce(function () {
        if (nav.current && outerNav.current) {
            var outerWidth_1 = outerNav.current.offsetWidth;
            var totalWidth = nav.current.offsetWidth;
            if (state.children.length > 0 && totalWidth > outerWidth_1) {
                moveItemToList();
            }
            else if (state.dropdownItems.length > 0 &&
                outerWidth_1 >
                    totalWidth +
                        state.lastItemWidth[state.lastItemWidth.length - 1] +
                        (props.offset || 0)) {
                moveItemToNav();
            }
        }
    }, props.debounce);
    var moveItemToList = function () {
        dispatch({
            type: 'move',
            payload: {
                lastItem: items.get(state.children.length - 1),
            },
        });
    };
    var moveItemToNav = function () {
        dispatch({
            type: 'return',
        });
    };
    var _b = useToggleButton(), isOpen = _b.isOpen, buttonProps = __rest(_b, ["isOpen"]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Div, { style: {
                minWidth: props.minWidth,
            }, ref: outerNav, className: classNames('PriorityNav_Root', props.className) },
            React.createElement(Style, { css: styles }),
            React.createElement(Div, { ref: nav, className: classNames('PriorityNav_Main') },
                React.Children.map(state.children, function (child, i) {
                    return (React.createElement(Div, { ref: function (s) {
                            if (s) {
                                items.set(i, s);
                            }
                        }, style: {
                            padding: props.itemPadding,
                        }, className: 'PriorityNav_Item', key: i }, child));
                }),
                state.dropdownItems.length > 0 &&
                    props.dropdown({
                        dropdownItems: state.dropdownItems,
                        buttonProps: buttonProps,
                        isOpen: isOpen,
                    })))));
};
PriorityNav.defaultProps = {
    itemPadding: 0,
    offset: 0,
    debounce: 0,
    minWidth: '250px',
    navSetting: {
        background: 'unset',
    },
};
function useResizeObserve(ref) {
    var _a = __read(React.useState(ref.current
        ? ref.current.clientWidth
        : window
            ? window.innerWidth
            : 0), 2), width = _a[0], setWidth = _a[1];
    function handleWidth() {
        if (ref.current) {
            setWidth(ref.current.clientWidth);
        }
    }
    React.useLayoutEffect(function () {
        var resizeObserver = new ResizeObserver(handleWidth);
        if (ref.current) {
            resizeObserver.observe(ref.current);
        }
        return function () {
            if (ref.current) {
                resizeObserver.unobserve(ref.current);
            }
        };
    }, [ref]);
    return width;
}
var templateObject_1;

exports.PriorityNav = PriorityNav;
exports.ToggleButton = ToggleButton;
exports.useToggleButton = useToggleButton;
