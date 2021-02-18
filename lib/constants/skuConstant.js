/**
 * Created by Administrator on 2018/3/29.
 */
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    available: 1, // 在售
    few: 2, // 货源紧张
    willOff: 3, // 将下架

    unavailable: 200, // 不可售
    off: 201, // 下架
    forbidden: 202, // 禁售
    lack: 203 // 缺货
};

var decodeState = function decodeState(a) {
    var _STRING;

    var STRING = (_STRING = {}, (0, _defineProperty3.default)(_STRING, state.available, '在售'), (0, _defineProperty3.default)(_STRING, state.few, '货源紧张'), (0, _defineProperty3.default)(_STRING, state.willOff, '将下架'), (0, _defineProperty3.default)(_STRING, state.unavailable, '不可售'), (0, _defineProperty3.default)(_STRING, state.off, '下架'), (0, _defineProperty3.default)(_STRING, state.forbidden, '禁售'), (0, _defineProperty3.default)(_STRING, state.lack, '缺货'), _STRING);

    return STRING[a];
};

module.exports = {
    state: state,
    decodeState: decodeState
};