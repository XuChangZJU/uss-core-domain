'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var STRINGS = (_STRINGS = {}, (0, _defineProperty3.default)(_STRINGS, state.fresh, '新的'), (0, _defineProperty3.default)(_STRINGS, state.pushed, '已推送的'), (0, _defineProperty3.default)(_STRINGS, state.failed1, '推送失败的'), _STRINGS);

    return STRINGS[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};