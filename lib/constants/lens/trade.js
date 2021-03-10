'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Object$assign2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX,
    commonState = _require.state,
    decodeCommonState = _require.decodeState,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation;

var billState = {
    'noBill': 101,
    'pending': 201,
    'done': 301
};

var decodeBillState = function decodeBillState(b) {
    var _B;

    var B = (_B = {}, (0, _defineProperty3.default)(_B, billState.noBill, '未开发票'), (0, _defineProperty3.default)(_B, billState.pending, '发票请求处理中'), (0, _defineProperty3.default)(_B, billState.done, '已完成'), _B);
    return B[b];
};

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

var state = (0, _assign2.default)({}, commonState, {
    financialRefunded: 501
});

var decodeState = function decodeState(s) {
    var S = (0, _defineProperty3.default)({}, state.financialRefunded, '财务已退款');

    return S[s] || decodeCommonState(s);
};

var decodeMessageState = function decodeMessageState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, (0, _defineProperty3.default)(_STRINGS, messageState.sending, '发送中'), (0, _defineProperty3.default)(_STRINGS, messageState.success, '发送成功'), (0, _defineProperty3.default)(_STRINGS, messageState.failure, '发送失败'), _STRINGS);
    return STRINGS[s];
};

var getActionStateAttr = function getActionStateAttr(action) {
    if (action > 20000) {
        return 'billState';
    }
    if (action > 10000) {
        return 'transportState';
    }

    return 'state';
};

var decodeTransportState = function decodeTransportState(ts) {
    var _TS;

    var TS = (_TS = {}, (0, _defineProperty3.default)(_TS, transportState.wdd, '未到店'), (0, _defineProperty3.default)(_TS, transportState.dqj, '待取件（到店）'), (0, _defineProperty3.default)(_TS, transportState.dgkqr, '待顾客确认'), (0, _defineProperty3.default)(_TS, transportState.yfh, '已发货'), (0, _defineProperty3.default)(_TS, transportState.yqj, '已取件'), (0, _defineProperty3.default)(_TS, transportState.yth, '已退货'), (0, _defineProperty3.default)(_TS, transportState.checkInQueue, '待检查'), (0, _defineProperty3.default)(_TS, transportState.checkCompleted, '已完成'), (0, _defineProperty3.default)(_TS, transportState.checkCanceled, '已取消'), _TS);
    return TS[ts];
};

var getMethod = {
    helpYourself: 1,
    express: 2,
    atOnce: 3
};

var decodeGetMethod = function decodeGetMethod(gm) {
    var _GM;

    var GM = (_GM = {}, (0, _defineProperty3.default)(_GM, getMethod.helpYourself, '顾客自取'), (0, _defineProperty3.default)(_GM, getMethod.express, '快递'), (0, _defineProperty3.default)(_GM, getMethod.atOnce, '当场立取'), _GM);

    return GM[gm];
};

var action = (0, _assign2.default)({}, commonAction, {
    financialRefund: 501,
    confirmArriveAtShop: 10001,
    confirmGet: 10002,
    send: 10003,
    confirmPick: 10004,
    customConfirm: 10005,
    completeCheck: 10006,
    cancelCheck: 10007,
    updateFeedback: 9000,
    issueBill: 20001,
    completeBill: 20002
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, action.financialRefund, '财务退款'), (0, _defineProperty3.default)(_S2, action.confirmArriveAtShop, '确认到店'), (0, _defineProperty3.default)(_S2, action.confirmGet, '确认收货'), (0, _defineProperty3.default)(_S2, action.send, '发快递'), (0, _defineProperty3.default)(_S2, action.updateFeedback, '更新评价'), (0, _defineProperty3.default)(_S2, action.customConfirm, '顾客确认'), (0, _defineProperty3.default)(_S2, action.confirmPick, '确认取货'), (0, _defineProperty3.default)(_S2, action.completeCheck, '完成'), (0, _defineProperty3.default)(_S2, action.cancelCheck, '取消'), (0, _defineProperty3.default)(_S2, action.issueBill, '申请开票'), (0, _defineProperty3.default)(_S2, action.completeBill, '完成开票'), _S2);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (0, _assign2.default)({}, COMMON_STATE_TRAN_MATRIX, (_Object$assign2 = {}, (0, _defineProperty3.default)(_Object$assign2, action.financialRefund, [[state.legal2, state.legal, state.abandoned], state.financialRefunded]), (0, _defineProperty3.default)(_Object$assign2, action.confirmArriveAtShop, [transportState.wdd, transportState.dqj]), (0, _defineProperty3.default)(_Object$assign2, action.confirmGet, [transportState.yfh, transportState.yqj]), (0, _defineProperty3.default)(_Object$assign2, action.confirmPick, [transportState.dqj, transportState.dgkqr]), (0, _defineProperty3.default)(_Object$assign2, action.customConfirm, [transportState.dgkqr, transportState.yqj]), (0, _defineProperty3.default)(_Object$assign2, action.send, [transportState.wdd, transportState.yfh]), (0, _defineProperty3.default)(_Object$assign2, action.completeCheck, [transportState.checkInQueue, transportState.checkCompleted]), (0, _defineProperty3.default)(_Object$assign2, action.cancelCheck, [transportState.checkInQueue, transportState.checkCanceled]), (0, _defineProperty3.default)(_Object$assign2, action.issueBill, [billState.noBill, billState.pending]), (0, _defineProperty3.default)(_Object$assign2, action.completeBill, [billState.pending, billState.done]), _Object$assign2));

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
    'gift': 13,
    'classIIIMedicineDevice': 14
};
var decodeCategory = function decodeCategory(c) {
    var _C;

    var C = (_C = {}, (0, _defineProperty3.default)(_C, category.makeGlasses, '框架眼镜'), (0, _defineProperty3.default)(_C, category.OKGlasses, '角膜塑形镜'), (0, _defineProperty3.default)(_C, category.DoneGlasses, '成镜'), (0, _defineProperty3.default)(_C, category.consumables, '耗品'), (0, _defineProperty3.default)(_C, category.visionTraining, '视训'), (0, _defineProperty3.default)(_C, category.check, '验光检查'), (0, _defineProperty3.default)(_C, category.DISCGlasses, '多焦软镜'), (0, _defineProperty3.default)(_C, category.SCL, '软性隐形眼镜'), (0, _defineProperty3.default)(_C, category.OkGlassCheck, '角膜塑形镜检查'), (0, _defineProperty3.default)(_C, category.doctorService, '医生问诊'), (0, _defineProperty3.default)(_C, category.visionTrainingCheck, '视训检查'), (0, _defineProperty3.default)(_C, category.service, '服务/线下宣讲'), (0, _defineProperty3.default)(_C, category.gift, '赠品'), (0, _defineProperty3.default)(_C, category.classIIIMedicineDevice, '三类医疗器械'), _C);
    return C[c];
};

var mainCategory = {
    makeBill: 1,
    check: 2,
    others: 3
};

var decodeMainCategory = function decodeMainCategory(mc) {
    var _MC;

    var MC = (_MC = {}, (0, _defineProperty3.default)(_MC, mainCategory.makeBill, '开单'), (0, _defineProperty3.default)(_MC, mainCategory.check, '检查'), (0, _defineProperty3.default)(_MC, mainCategory.others, '其他'), _MC);
    return MC[mc];
};

var getMainCategory = function getMainCategory(c) {
    var _C2;

    var C = (_C2 = {}, (0, _defineProperty3.default)(_C2, category.makeGlasses, mainCategory.makeBill), (0, _defineProperty3.default)(_C2, category.OKGlasses, mainCategory.makeBill), (0, _defineProperty3.default)(_C2, category.DoneGlasses, mainCategory.makeBill), (0, _defineProperty3.default)(_C2, category.consumables, mainCategory.makeBill), (0, _defineProperty3.default)(_C2, category.visionTraining, mainCategory.makeBill), (0, _defineProperty3.default)(_C2, category.check, mainCategory.check), (0, _defineProperty3.default)(_C2, category.DISCGlasses, mainCategory.makeBill), (0, _defineProperty3.default)(_C2, category.SCL, mainCategory.makeBill), (0, _defineProperty3.default)(_C2, category.OkGlassCheck, mainCategory.check), (0, _defineProperty3.default)(_C2, category.doctorService, mainCategory.check), (0, _defineProperty3.default)(_C2, category.visionTrainingCheck, mainCategory.check), (0, _defineProperty3.default)(_C2, category.service, mainCategory.others), (0, _defineProperty3.default)(_C2, category.gift, mainCategory.makeBill), (0, _defineProperty3.default)(_C2, category.classIIIMedicineDevice, mainCategory.makeBill), _C2);
    return C[c];
};

var getCategory = function getCategory(mc) {
    var _MC2;

    var MC = (_MC2 = {}, (0, _defineProperty3.default)(_MC2, mainCategory.makeBill, [category.makeGlasses, category.OKGlasses, category.visionTraining, category.DISCGlasses, category.SCL, category.gift, category.DoneGlasses, category.consumables, category.classIIIMedicineDevice]), (0, _defineProperty3.default)(_MC2, mainCategory.check, [category.OkGlassCheck, category.visionTrainingCheck, category.check, category.doctorService]), (0, _defineProperty3.default)(_MC2, mainCategory.others, [category.service]), _MC2);
    return MC[mc];
};

var checkType = {
    'firstVisit': 1,
    'revisit': 2
};
var decodeCheckType = function decodeCheckType(ct) {
    var _CT;

    var CT = (_CT = {}, (0, _defineProperty3.default)(_CT, checkType.firstVisit, '初诊'), (0, _defineProperty3.default)(_CT, checkType.revisit, '复查'), _CT);
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
    billState: billState,
    decodeBillState: decodeBillState,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};