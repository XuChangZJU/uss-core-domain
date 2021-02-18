/**
 * Created by Administrator on 2018/6/21.
 */
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    unposted: 10, // 未投递
    posted: 30, // 已投递（下了快递单）
    sending: 40, // 寄送中
    end: 400, // 接收完成
    cancelled: 1001 // 主动取消
};

var decodeState = function decodeState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, (0, _defineProperty3.default)(_STRINGS, state.unposted, '未投递'), (0, _defineProperty3.default)(_STRINGS, state.posted, '已投递'), (0, _defineProperty3.default)(_STRINGS, state.sending, '寄送中'), (0, _defineProperty3.default)(_STRINGS, state.end, '已完成'), (0, _defineProperty3.default)(_STRINGS, state.cancelled, '已取消'), _STRINGS);

    return STRINGS[s];
};

var type = {
    sendTo: 1, // 寄送
    return: 2 // 寄还
};

var decodeType = function decodeType(t) {
    var _STRINGS2;

    var STRINGS = (_STRINGS2 = {}, (0, _defineProperty3.default)(_STRINGS2, type.sendTo, '寄送'), (0, _defineProperty3.default)(_STRINGS2, type.return, '寄还'), _STRINGS2);

    return STRINGS[t];
};

module.exports = {
    state: state,
    decodeState: decodeState,
    type: type,
    decodeType: decodeType
};