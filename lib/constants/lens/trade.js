'use strict';

var _Object$assign;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX,
    state = _require.state,
    decodeState = _require.decodeState,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation;

var transportState = {
    wdd: 10003,
    dqj: 10004,
    yqj: 10005,
    dgkqr: 10006,
    yfh: 10010,
    yth: 10011,
    yzf: 10012,
    dxh: 10013,

    checkInQueue: 11001,
    checkCompleted: 11002,
    checkCanceled: 11003
};

var messageState = {
    sending: 10001,
    success: 10002,
    failure: 10003
};

var decodeMessageState = function decodeMessageState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, messageState.sending, '发送中'), _defineProperty(_STRINGS, messageState.success, '发送成功'), _defineProperty(_STRINGS, messageState.failure, '发送失败'), _STRINGS);
    return STRINGS[s];
};

var getActionStateAttr = function getActionStateAttr(action) {
    if (action > 10000) {
        return 'transportState';
    }

    return 'state';
};

var decodeTransportState = function decodeTransportState(ts) {
    var _TS;

    var TS = (_TS = {}, _defineProperty(_TS, transportState.wdd, '未到店'), _defineProperty(_TS, transportState.dqj, '待取件（到店）'), _defineProperty(_TS, transportState.dgkqr, '待顾客确认'), _defineProperty(_TS, transportState.yfh, '已发货'), _defineProperty(_TS, transportState.yqj, '已取件'), _defineProperty(_TS, transportState.yth, '已退货'), _defineProperty(_TS, transportState.checkInQueue, '排队中'), _defineProperty(_TS, transportState.checkCompleted, '已完成'), _defineProperty(_TS, transportState.checkCanceled, '已取消'), _TS);
    return TS[ts];
};

var getMethod = {
    helpYourself: 1,
    express: 2,
    atOnce: 3
};

var decodeGetMethod = function decodeGetMethod(gm) {
    var _GM;

    var GM = (_GM = {}, _defineProperty(_GM, getMethod.helpYourself, '顾客自取'), _defineProperty(_GM, getMethod.express, '快递'), _defineProperty(_GM, getMethod.atOnce, '当场立取'), _GM);

    return GM[gm];
};

var action = Object.assign({}, commonAction, {
    confirmArriveAtShop: 10001,
    confirmGet: 10002,
    send: 10003,
    confirmPick: 10004,
    customConfirm: 10005,
    completeCheck: 10006,
    cancelCheck: 10007,
    updateFeedback: 9000
});

var decodeAction = function decodeAction(a) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, action.confirmArriveAtShop, '确认到店'), _defineProperty(_S, action.confirmGet, '确认收货'), _defineProperty(_S, action.send, '发快递'), _defineProperty(_S, action.updateFeedback, '更新评价'), _defineProperty(_S, action.customConfirm, '顾客确认'), _defineProperty(_S, action.confirmPick, '确认取货'), _defineProperty(_S, action.completeCheck, '完成'), _defineProperty(_S, action.cancelCheck, '取消'), _S);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = Object.assign({}, COMMON_STATE_TRAN_MATRIX, (_Object$assign = {}, _defineProperty(_Object$assign, action.confirmArriveAtShop, [transportState.wdd, transportState.dqj]), _defineProperty(_Object$assign, action.confirmGet, [transportState.yfh, transportState.yqj]), _defineProperty(_Object$assign, action.confirmPick, [transportState.dqj, transportState.dgkqr]), _defineProperty(_Object$assign, action.customConfirm, [transportState.dgkqr, transportState.yqj]), _defineProperty(_Object$assign, action.send, [transportState.wdd, transportState.yfh]), _defineProperty(_Object$assign, action.completeCheck, [transportState.checkInQueue, transportState.checkCompleted]), _defineProperty(_Object$assign, action.cancelCheck, [transportState.checkInQueue, transportState.checkCanceled]), _Object$assign));

var category = {
    'makeGlasses': 1,
    'OKGlasses': 2,
    'DoneGlasses': 3,
    'consumables': 4,
    'visionTraining': 5,
    'check': 6,
    'DISCGlasses': 7,
    'SCL': 8,
    'OkGlassCheck': 9,
    'doctorService': 10
};
var decodeCategory = function decodeCategory(c) {
    var _C;

    var C = (_C = {}, _defineProperty(_C, category.makeGlasses, '框架眼镜'), _defineProperty(_C, category.OKGlasses, '角膜塑形镜'), _defineProperty(_C, category.DoneGlasses, '成镜'), _defineProperty(_C, category.consumables, '耗品'), _defineProperty(_C, category.visionTraining, '视训'), _defineProperty(_C, category.check, '检查'), _defineProperty(_C, category.DISCGlasses, '多焦软镜'), _defineProperty(_C, category.SCL, '软性隐形眼镜'), _defineProperty(_C, category.OkGlassCheck, '角膜塑形镜检查'), _defineProperty(_C, category.doctorService, '医生问诊'), _C);
    return C[c];
};
module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    relation: relation,
    decodeRelation: decodeRelation,
    getMethod: getMethod,
    decodeGetMethod: decodeGetMethod,
    transportState: transportState,
    decodeTransportState: decodeTransportState,
    messageState: messageState,
    decodeMessageState: decodeMessageState,
    category: category,
    decodeCategory: decodeCategory,
    getActionStateAttr: getActionStateAttr,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};