"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
require("./sheet.sass");
var vue_1 = require("vue");
var theme_1 = require("../../composables/theme");
var BButton_1 = require("../button/BButton");
var IsLoadingButton = vue_1.h(BButton_1["default"], {
    size: 'is-large',
    variant: 'is-link',
    isOutlined: true,
    isLoading: true,
    "class": 'is-borderless is-fullwidth'
});
exports["default"] = vue_1.defineComponent({
    name: 'b-sheet',
    props: __assign(__assign({}, theme_1.DefaultThemePropsDefinition), { tag: {
            type: String,
            "default": 'main'
        }, isLoading: {
            type: Boolean,
            "default": false
        } }),
    setup: function (props, _a) {
        var slots = _a.slots;
        var themeClasses = theme_1.useTheme(props).themeClasses;
        return function () {
            return vue_1.h(props.tag, { "class": __spreadArrays(['b-sheet', { 'is-loading': props.isLoading }], themeClasses.value) }, props.isLoading ? (slots.loading ? slots.loading() : IsLoadingButton) : slots["default"] && slots["default"]());
        };
    }
});
