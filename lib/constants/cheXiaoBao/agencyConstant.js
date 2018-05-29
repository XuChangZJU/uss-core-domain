/**
 * Created by Administrator on 2018/4/17.
 */
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('./stationConstant'),
    StationType = _require.type;

var state = {
    unpaid: 10, // 未支付
    paid: 20, // 已支付
    matching1: 25, // 已呼叫司机1
    wfd1: 30, // 等待司机（取车）
    da1: 40, // 司机已到
    onWay1: 50, // 去的路上
    wfs: 60, // 等待服务
    served: 70, // 服务中
    serveEnd: 80, // 服务完成
    matching2: 85, // 已呼叫司机2
    wfd2: 90, // 等待司机（还车）
    da2: 100, // 司机已到
    onWay2: 110, // 回去的路上
    wfr: 120, // 等待收车
    end: 400, // 收车完成
    end2: 401, // 人工介入完成

    emergent: 701, // 服务完没有司机接单（必须人工介入处理）

    failed1: 1001, // 没有司机接单
    cancelled2: 1003, // 支付后放弃
    over2: 1005, // 支付后放弃并已结清
    over3: 1007, // 失败已结算
    cancelled1: 1010, // 未支付放弃

    init: 10000, // 初始
    expired: 10001 // 未支付超时

};

var decodeState = function decodeState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, state.init, '初始'), _defineProperty(_STRINGS, state.unpaid, '未支付'), _defineProperty(_STRINGS, state.paid, '已支付'), _defineProperty(_STRINGS, state.matching1, '寻找司机'), _defineProperty(_STRINGS, state.wfd1, '等待司机取车'), _defineProperty(_STRINGS, state.da1, '司机到达取车点'), _defineProperty(_STRINGS, state.onWay1, '去目的地途中'), _defineProperty(_STRINGS, state.wfs, '等待服务'), _defineProperty(_STRINGS, state.served, '正在服务中'), _defineProperty(_STRINGS, state.serveEnd, '服务完成'), _defineProperty(_STRINGS, state.matching2, '寻找返程司机'), _defineProperty(_STRINGS, state.wfd2, '等待司机还车'), _defineProperty(_STRINGS, state.da2, '司机到达取车点'), _defineProperty(_STRINGS, state.onWay2, '归途中'), _defineProperty(_STRINGS, state.wfr, '等待车主收车'), _defineProperty(_STRINGS, state.end, '已完成'), _defineProperty(_STRINGS, state.end2, '已完成'), _defineProperty(_STRINGS, state.emergent, '等待人工处理'), _defineProperty(_STRINGS, state.over2, '取消后已退款'), _defineProperty(_STRINGS, state.over3, '失败后已退款'), _defineProperty(_STRINGS, state.cancelled1, '已取消'), _defineProperty(_STRINGS, state.expired, '已超时'), _defineProperty(_STRINGS, state.cancelled2, '已取消'), _defineProperty(_STRINGS, state.failed1, '找不到司机'), _STRINGS);

    return STRINGS[s];
};

var type = StationType;

var decodeType = function decodeType(t) {
    var STRINGS = _defineProperty({}, StationType.check, '年检');

    return STRINGS[t];
};

module.exports = {
    state: state,
    type: type,
    decodeState: decodeState,
    decodeType: decodeType
};