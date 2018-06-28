/**
 * Created by Administrator on 2018/6/21.
 */
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
    unposted: 10, // 未投递
    posted: 30, // 已投递（下了快递单）
    sending: 40, // 寄送中
    end: 400, // 接收完成
    cancelled: 1001 // 主动取消
};

var decodeState = function decodeState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, state.unposted, '未投递'), _defineProperty(_STRINGS, state.posted, '已投递'), _defineProperty(_STRINGS, state.sending, '寄送中'), _defineProperty(_STRINGS, state.end, '已完成'), _defineProperty(_STRINGS, state.cancelled, '已取消'), _STRINGS);

    return STRINGS[s];
};

var type = {
    sendTo: 1, // 寄送
    return: 2 // 寄还
};

var decodeType = function decodeType(t) {
    var _STRINGS2;

    var STRINGS = (_STRINGS2 = {}, _defineProperty(_STRINGS2, type.sendTo, '寄送'), _defineProperty(_STRINGS2, type.return, '寄还'), _STRINGS2);

    return STRINGS[t];
};

module.exports = {
    state: state,
    decodeState: decodeState,
    type: type,
    decodeType: decodeType
};