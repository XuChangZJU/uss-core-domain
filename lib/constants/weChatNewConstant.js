'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/6/8.
 */
var state = {
    fresh: 1,
    pushed: 2,
    failed: 3
};

var decodeState = function decodeState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, state.fresh, '新的'), _defineProperty(_STRINGS, state.pushed, '已推送的'), _defineProperty(_STRINGS, state.failed1, '推送失败的'), _STRINGS);

    return STRINGS[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};