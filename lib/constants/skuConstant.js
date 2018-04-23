/**
 * Created by Administrator on 2018/3/29.
 */
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    var STRING = (_STRING = {}, _defineProperty(_STRING, state.available, '在售'), _defineProperty(_STRING, state.few, '货源紧张'), _defineProperty(_STRING, state.willOff, '将下架'), _defineProperty(_STRING, state.unavailable, '不可售'), _defineProperty(_STRING, state.off, '下架'), _defineProperty(_STRING, state.forbidden, '禁售'), _defineProperty(_STRING, state.lack, '缺货'), _STRING);

    return STRING[a];
};

module.exports = {
    state: state,
    decodeState: decodeState
};