'use strict';

var _Object$assign;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX,
    commonState = _require.state,
    decodeCommonState = _require.decodeState,
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

var state = Object.assign({}, commonState, {
    financialRefunded: 501
});

var decodeState = function decodeState(s) {
    var S = _defineProperty({}, state.financialRefunded, '财务已退款');

    return S[s] || decodeCommonState(s);
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

    var TS = (_TS = {}, _defineProperty(_TS, transportState.wdd, '未到店'), _defineProperty(_TS, transportState.dqj, '待取件（到店）'), _defineProperty(_TS, transportState.dgkqr, '待顾客确认'), _defineProperty(_TS, transportState.yfh, '已发货'), _defineProperty(_TS, transportState.yqj, '已取件'), _defineProperty(_TS, transportState.yth, '已退货'), _defineProperty(_TS, transportState.checkInQueue, '待检查'), _defineProperty(_TS, transportState.checkCompleted, '已完成'), _defineProperty(_TS, transportState.checkCanceled, '已取消'), _TS);
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
    financialRefund: 501,
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
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, action.financialRefund, '财务退款'), _defineProperty(_S2, action.confirmArriveAtShop, '确认到店'), _defineProperty(_S2, action.confirmGet, '确认收货'), _defineProperty(_S2, action.send, '发快递'), _defineProperty(_S2, action.updateFeedback, '更新评价'), _defineProperty(_S2, action.customConfirm, '顾客确认'), _defineProperty(_S2, action.confirmPick, '确认取货'), _defineProperty(_S2, action.completeCheck, '完成'), _defineProperty(_S2, action.cancelCheck, '取消'), _S2);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = Object.assign({}, COMMON_STATE_TRAN_MATRIX, (_Object$assign = {}, _defineProperty(_Object$assign, action.financialRefund, [[state.legal2, state.legal, state.abandoned], state.financialRefunded]), _defineProperty(_Object$assign, action.confirmArriveAtShop, [transportState.wdd, transportState.dqj]), _defineProperty(_Object$assign, action.confirmGet, [transportState.yfh, transportState.yqj]), _defineProperty(_Object$assign, action.confirmPick, [transportState.dqj, transportState.dgkqr]), _defineProperty(_Object$assign, action.customConfirm, [transportState.dgkqr, transportState.yqj]), _defineProperty(_Object$assign, action.send, [transportState.wdd, transportState.yfh]), _defineProperty(_Object$assign, action.completeCheck, [transportState.checkInQueue, transportState.checkCompleted]), _defineProperty(_Object$assign, action.cancelCheck, [transportState.checkInQueue, transportState.checkCanceled]), _Object$assign));

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
    'doctorService': 10,
    'visionTrainingCheck': 11,
    'service': 12,
    'gift': 13
};
var decodeCategory = function decodeCategory(c) {
    var _C;

    var C = (_C = {}, _defineProperty(_C, category.makeGlasses, '框架眼镜'), _defineProperty(_C, category.OKGlasses, '角膜塑形镜'), _defineProperty(_C, category.DoneGlasses, '成镜'), _defineProperty(_C, category.consumables, '耗品'), _defineProperty(_C, category.visionTraining, '视训'), _defineProperty(_C, category.check, '验光检查'), _defineProperty(_C, category.DISCGlasses, '多焦软镜'), _defineProperty(_C, category.SCL, '软性隐形眼镜'), _defineProperty(_C, category.OkGlassCheck, '角膜塑形镜检查'), _defineProperty(_C, category.doctorService, '医生问诊'), _defineProperty(_C, category.visionTrainingCheck, '视训检查'), _defineProperty(_C, category.service, '服务/线下宣讲'), _defineProperty(_C, category.gift, '赠品'), _C);
    return C[c];
};

var mainCategory = {
    makeBill: 1,
    check: 2,
    others: 3
};

var decodeMainCategory = function decodeMainCategory(mc) {
    var _MC;

    var MC = (_MC = {}, _defineProperty(_MC, mainCategory.makeBill, '开单'), _defineProperty(_MC, mainCategory.check, '检查'), _defineProperty(_MC, mainCategory.others, '其他'), _MC);
    return MC[mc];
};

var getMainCategory = function getMainCategory(c) {
    var _C2;

    var C = (_C2 = {}, _defineProperty(_C2, category.makeGlasses, mainCategory.makeBill), _defineProperty(_C2, category.OKGlasses, mainCategory.makeBill), _defineProperty(_C2, category.DoneGlasses, mainCategory.makeBill), _defineProperty(_C2, category.consumables, mainCategory.makeBill), _defineProperty(_C2, category.visionTraining, mainCategory.makeBill), _defineProperty(_C2, category.check, mainCategory.check), _defineProperty(_C2, category.DISCGlasses, mainCategory.makeBill), _defineProperty(_C2, category.SCL, mainCategory.makeBill), _defineProperty(_C2, category.OkGlassCheck, mainCategory.check), _defineProperty(_C2, category.doctorService, mainCategory.check), _defineProperty(_C2, category.visionTrainingCheck, mainCategory.check), _defineProperty(_C2, category.service, mainCategory.others), _defineProperty(_C2, category.gift, mainCategory.makeBill), _C2);
    return C[c];
};

var getCategory = function getCategory(mc) {
    var _MC2;

    var MC = (_MC2 = {}, _defineProperty(_MC2, mainCategory.makeBill, [category.makeGlasses, category.OKGlasses, category.visionTraining, category.DISCGlasses, category.SCL, category.gift, category.DoneGlasses, category.consumables]), _defineProperty(_MC2, mainCategory.check, [category.OkGlassCheck, category.visionTrainingCheck, category.check, category.doctorService]), _defineProperty(_MC2, mainCategory.others, [category.service]), _MC2);
    return MC[mc];
};

var checkType = {
    'firstVisit': 1,
    'revisit': 2
};
var decodeCheckType = function decodeCheckType(ct) {
    var _CT;

    var CT = (_CT = {}, _defineProperty(_CT, checkType.firstVisit, '初诊'), _defineProperty(_CT, checkType.revisit, '复查'), _CT);
    return CT[ct];
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
    mainCategory: mainCategory,
    decodeMainCategory: decodeMainCategory,
    getMainCategory: getMainCategory,
    getCategory: getCategory,
    checkType: checkType,
    decodeCheckType: decodeCheckType,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};