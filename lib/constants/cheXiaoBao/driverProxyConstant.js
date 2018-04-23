/**
 * Created by Administrator on 2018/4/17.
 */
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var source = {
    didi: 1
};

var decodeSource = function decodeSource(s) {
    var STRING = _defineProperty({}, source.didi, '滴滴代驾');

    return STRING[s];
};

var type = {
    realTime: 0,
    booking: 1
};

var decodeType = function decodeType(t) {
    var _STRING2;

    var STRING = (_STRING2 = {}, _defineProperty(_STRING2, type.realTime, '实时单'), _defineProperty(_STRING2, type.booking, '预约单'), _STRING2);

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

    driverCancelled: 101 // 司机取消
};

var decodeState = function decodeState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, state.init, '初始'), _defineProperty(_STRINGS, state.fresh, '已下单'), _defineProperty(_STRINGS, state.cancelled, '已取消'), _defineProperty(_STRINGS, state.expired, '已过期'), _defineProperty(_STRINGS, state.accepted, '已接单'), _defineProperty(_STRINGS, state.arrived, '司机已到达'), _defineProperty(_STRINGS, state.started, '服务开始'), _defineProperty(_STRINGS, state.finished, '服务结束'), _defineProperty(_STRINGS, state.cleared, '结算完成'), _defineProperty(_STRINGS, state.driverCancelled, '司机取消'), _STRINGS);
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