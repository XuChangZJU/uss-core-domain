/**
 * Created by Administrator on 2018/4/17.
 */
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var source = {
    didi: 1
};

var decodeSource = function decodeSource(s) {
    var STRING = (0, _defineProperty3.default)({}, source.didi, '滴滴代驾');

    return STRING[s];
};

var type = {
    realTime: 0,
    booking: 1
};

var decodeType = function decodeType(t) {
    var _STRING2;

    var STRING = (_STRING2 = {}, (0, _defineProperty3.default)(_STRING2, type.realTime, '实时单'), (0, _defineProperty3.default)(_STRING2, type.booking, '预约单'), _STRING2);

    return STRING[t];
};

var state = {
    init: 0, // 未下单
    fresh: 1, // 新单
    cancelled: 2, // 已取消
    expired: 3, // 已超时
    accepted: 4, // 已接单
    arrived: 5, // 已到达
    started: 6, // 开始服务
    finished: 7, // 服务完成
    cleared: 8, // 计费完成

    driverCancelled: 101, // 司机取消
    mistake: 102 // 出错
};

var decodeState = function decodeState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, (0, _defineProperty3.default)(_STRINGS, state.init, '初始'), (0, _defineProperty3.default)(_STRINGS, state.fresh, '已下单'), (0, _defineProperty3.default)(_STRINGS, state.cancelled, '已取消'), (0, _defineProperty3.default)(_STRINGS, state.expired, '已过期'), (0, _defineProperty3.default)(_STRINGS, state.accepted, '已接单'), (0, _defineProperty3.default)(_STRINGS, state.arrived, '司机已到达'), (0, _defineProperty3.default)(_STRINGS, state.started, '服务开始'), (0, _defineProperty3.default)(_STRINGS, state.finished, '服务结束'), (0, _defineProperty3.default)(_STRINGS, state.cleared, '结算完成'), (0, _defineProperty3.default)(_STRINGS, state.driverCancelled, '司机取消'), (0, _defineProperty3.default)(_STRINGS, state.mistake, '出错'), _STRINGS);
    return STRINGS[s];
};

module.exports = {
    source: source,
    decodeSource: decodeSource,
    type: type,
    decodeType: decodeType,
    state: state,
    decodeState: decodeState
};