/**
 * Created by Administrator on 2017/1/16.
 */
"use strict";

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STRING_OF_STATES;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var state = {
    init: 1,
    inShopCart: 2,
    unpaid: 5,
    paid: 10,
    gettingRidOf: 20,
    sending: 30,
    sendingProblem: 40,
    confirmed: 50,
    applyingForRefunding: 60,
    refunding: 70,
    refunded: 201,
    closed: 501,
    finished: 901,
    changing: 911
};

var STRING_OF_STATES = (_STRING_OF_STATES = {}, (0, _defineProperty3.default)(_STRING_OF_STATES, state.init, "初始"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.inShopCart, "购物车中"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.unpaid, "未支付"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.paid, "已支付"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.gettingRidOf, "备货中"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.sending, "等待收货"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.sendingProblem, "收货异常处理中"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.confirmed, "已确认"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.applyingForRefunding, "申请退款处理中"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.refunding, "退款中"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.refunded, "退款成功"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.closed, "已关闭"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.finished, "已完成"), (0, _defineProperty3.default)(_STRING_OF_STATES, state.changing, "更换中"), _STRING_OF_STATES);

var decodeState = function decodeState(s) {
    return STRING_OF_STATES[s];
};

var relationState = {
    avail: 1, //  可分享
    root: 2, //  可分享（管理员添加）
    init: 200, //  不可分享，等待购买
    refunded: 201, // 不可分享（订单已退款）
    unavailable: 202, // 不可分享（商品已下架）
    disabled: 203, // 不可分享（用户被禁用及其它）
    outDated: 204 // 不可分享（过期）
};

var decodeRelationState = function decodeRelationState(s) {
    var _STRING_OF_RS;

    var STRING_OF_RS = (_STRING_OF_RS = {}, (0, _defineProperty3.default)(_STRING_OF_RS, relationState.init, '等待购买'), (0, _defineProperty3.default)(_STRING_OF_RS, relationState.avail, '可分享'), (0, _defineProperty3.default)(_STRING_OF_RS, relationState.root, 'VIP'), (0, _defineProperty3.default)(_STRING_OF_RS, relationState.refunded, '已退款'), (0, _defineProperty3.default)(_STRING_OF_RS, relationState.unavailable, '已下架'), (0, _defineProperty3.default)(_STRING_OF_RS, relationState.disabled, '已禁止'), (0, _defineProperty3.default)(_STRING_OF_RS, relationState.outDated, '已过期'), _STRING_OF_RS);

    return STRING_OF_RS[s];
};

var bonusType = {
    level1: 1,
    level2: 2
};

var decodeBonusType = function decodeBonusType(b) {
    var _STRING;

    var STRING = (_STRING = {}, (0, _defineProperty3.default)(_STRING, bonusType.level1, '直接'), (0, _defineProperty3.default)(_STRING, bonusType.level2, '次级'), _STRING);

    return STRING[b];
};

var bonusState = {
    paid: 1,
    extractable: 101,
    refunded: 201
};

var decodeBonusState = function decodeBonusState(s) {
    var _STRING2;

    var STRING = (_STRING2 = {}, (0, _defineProperty3.default)(_STRING2, bonusState.paid, '已结算'), (0, _defineProperty3.default)(_STRING2, bonusState.extractable, '可提取'), (0, _defineProperty3.default)(_STRING2, bonusState.refunded, '已退款'), _STRING2);
    return STRING[s];
};

var evaluate = {
    good: 2,
    neutral: 1,
    bad: 0
};

var decodeEvaluate = function decodeEvaluate(r) {
    var _STRING3;

    var STRING = (_STRING3 = {}, (0, _defineProperty3.default)(_STRING3, evaluate.good, '好评'), (0, _defineProperty3.default)(_STRING3, evaluate.neutral, '中评'), (0, _defineProperty3.default)(_STRING3, evaluate.bad, '差评'), _STRING3);
    return STRING[r];
};

module.exports = {
    state: state,
    decodeState: decodeState,
    relationState: relationState,
    decodeRelationState: decodeRelationState,
    bonusType: bonusType,
    decodeBonusType: decodeBonusType,
    bonusState: bonusState,
    decodeBonusState: decodeBonusState,
    evaluate: evaluate,
    decodeEvaluate: decodeEvaluate
};