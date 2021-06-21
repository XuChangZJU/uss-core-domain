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
    TransportState = _require.transportState,
    TRANSPORT_STATE_TRANS_MATRIX = _require.TRANSPORT_STATE_TRANS_MATRIX,
    decodeCommonTransportState = _require.decodeTransportState,
    decodeCommonTransportAction = _require.decodeTransportAction,
    decodeCommonState = _require.decodeState,
    TransportAction = _require.transportAction,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

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

var transportState = (0, _assign2.default)({}, TransportState, {
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
});

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
    if (action > 30000) {
        return 'transportState';
    }
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

    var TS = (_TS = {}, (0, _defineProperty3.default)(_TS, transportState.wdd, '未到店'), (0, _defineProperty3.default)(_TS, transportState.dqj, '已到店'), (0, _defineProperty3.default)(_TS, transportState.dgkqr, '待完成取货'), (0, _defineProperty3.default)(_TS, transportState.yqj, '已取件'), (0, _defineProperty3.default)(_TS, transportState.yth, '已退货'), (0, _defineProperty3.default)(_TS, transportState.checkInQueue, '待检查'), (0, _defineProperty3.default)(_TS, transportState.checkCompleted, '已完成'), (0, _defineProperty3.default)(_TS, transportState.checkCanceled, '已取消'), _TS);
    return TS[ts] || decodeCommonTransportState(ts);
};

var getMethodId = {
    HelpYourself: 1,
    Express: 2,
    AtOnce: 3,
    Agent: 4
};

var decodeGetMethodId = function decodeGetMethodId(gm) {
    var _GM;

    var GM = (_GM = {}, (0, _defineProperty3.default)(_GM, getMethodId.HelpYourself, '顾客自取'), (0, _defineProperty3.default)(_GM, getMethodId.Express, '快递'), (0, _defineProperty3.default)(_GM, getMethodId.AtOnce, '当场立取'), (0, _defineProperty3.default)(_GM, getMethodId.Agent, '委托代收'), _GM);

    return GM[gm];
};

var action = (0, _assign2.default)({}, commonAction, TransportAction, {
    financialRefund: 501,
    confirmArriveAtShop: 10001,
    confirmPick: 10004,
    customConfirm: 10005,
    completeCheck: 10006,
    cancelCheck: 10007,
    issueBill: 20001,
    completeBill: 20002
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, action.financialRefund, '财务退款'), (0, _defineProperty3.default)(_S2, action.confirmArriveAtShop, '确认到店'), (0, _defineProperty3.default)(_S2, action.customConfirm, '完成取货'), (0, _defineProperty3.default)(_S2, action.confirmPick, '确认取货'), (0, _defineProperty3.default)(_S2, action.completeCheck, '完成'), (0, _defineProperty3.default)(_S2, action.cancelCheck, '取消'), (0, _defineProperty3.default)(_S2, action.issueBill, '申请开票'), (0, _defineProperty3.default)(_S2, action.completeBill, '完成开票'), _S2);

    return S[a] || decodeCommonAction(a) || decodeCommonTransportAction(a);
};

var STATE_TRAN_MATRIX = (0, _assign2.default)({}, COMMON_STATE_TRAN_MATRIX, TRANSPORT_STATE_TRANS_MATRIX, (_Object$assign2 = {}, (0, _defineProperty3.default)(_Object$assign2, action.taPrepare, [transportState.wdd, transportState.tsSending]), (0, _defineProperty3.default)(_Object$assign2, action.financialRefund, [[state.legal2, state.legal, state.abandoned], state.financialRefunded]), (0, _defineProperty3.default)(_Object$assign2, action.confirmArriveAtShop, [transportState.wdd, transportState.dqj]), (0, _defineProperty3.default)(_Object$assign2, action.confirmPick, [transportState.dqj, transportState.dgkqr]), (0, _defineProperty3.default)(_Object$assign2, action.customConfirm, [transportState.dgkqr, transportState.yqj]), (0, _defineProperty3.default)(_Object$assign2, action.completeCheck, [transportState.checkInQueue, transportState.checkCompleted]), (0, _defineProperty3.default)(_Object$assign2, action.cancelCheck, [transportState.checkInQueue, transportState.checkCanceled]), (0, _defineProperty3.default)(_Object$assign2, action.issueBill, [[billState.noBill, billState.pending], billState.pending]), (0, _defineProperty3.default)(_Object$assign2, action.completeBill, [billState.pending, billState.done]), _Object$assign2));

var categoryId = {
    'Glasses': 1,
    'OKGlasses': 2,
    'DoneGlasses': 3,
    'Others': 4,
    'Training': 5,
    'Check': 6,
    'DISCGlasses': 7,
    'BandgeGlasses': 8,
    'OkGlassTry': 9,
    'Inquiry': 10,
    'TrainingCheck': 11,
    'Service': 12,
    'Gift': 13,
    'OkGlassRecheck': 14,
    'CareLiquid': 15,
    'Food': 16,
    'OkGlassFetch': 17,
    'Screening': 18,
    'Compensation': 19,
    'ActivityCheck': 20,
    'TeenagerScreening': 21,
    'OkGlassLearning': 22
};
var decodeCategoryId = function decodeCategoryId(c) {
    var _C;

    var C = (_C = {}, (0, _defineProperty3.default)(_C, categoryId.Glasses, '框架眼镜'), (0, _defineProperty3.default)(_C, categoryId.OKGlasses, '角膜塑形镜'), (0, _defineProperty3.default)(_C, categoryId.DoneGlasses, '成镜'), (0, _defineProperty3.default)(_C, categoryId.Others, '其它'), (0, _defineProperty3.default)(_C, categoryId.Training, '视训'), (0, _defineProperty3.default)(_C, categoryId.Check, '验光检查'), (0, _defineProperty3.default)(_C, categoryId.DISCGlasses, '多焦软镜'), (0, _defineProperty3.default)(_C, categoryId.BandgeGlasses, '绷带镜'), (0, _defineProperty3.default)(_C, categoryId.OkGlassTry, '角膜塑形镜试戴'), (0, _defineProperty3.default)(_C, categoryId.Inquiry, '医生问诊'), (0, _defineProperty3.default)(_C, categoryId.TrainingCheck, '弱视检查'), (0, _defineProperty3.default)(_C, categoryId.Service, '服务/线下宣讲'), (0, _defineProperty3.default)(_C, categoryId.Gift, '赠品'), (0, _defineProperty3.default)(_C, categoryId.OkGlassRecheck, '角膜塑形镜复查'), (0, _defineProperty3.default)(_C, categoryId.CareLiquid, '护理液'), (0, _defineProperty3.default)(_C, categoryId.Food, '眼保健食品'), (0, _defineProperty3.default)(_C, categoryId.OkGlassFetch, '角膜塑形镜取镜'), (0, _defineProperty3.default)(_C, categoryId.Screening, '筛查(幼儿)'), (0, _defineProperty3.default)(_C, categoryId.Compensation, '补件'), (0, _defineProperty3.default)(_C, categoryId.ActivityCheck, '活动验光'), (0, _defineProperty3.default)(_C, categoryId.TeenagerScreening, '筛查（青少年）'), (0, _defineProperty3.default)(_C, categoryId.OkGlassLearning, '角膜塑形镜摘戴学习'), _C);
    return C[c];
};

var mainCategoryId = {
    MakeBill: 1,
    Check: 2,
    Service: 3
};

var decodeMainCategoryId = function decodeMainCategoryId(mc) {
    var _MC;

    var MC = (_MC = {}, (0, _defineProperty3.default)(_MC, mainCategoryId.MakeBill, '开单'), (0, _defineProperty3.default)(_MC, mainCategoryId.Check, '检查'), (0, _defineProperty3.default)(_MC, mainCategoryId.Service, '服务'), _MC);
    return MC[mc];
};

var relation = (0, _assign2.default)({}, commonRelation, {
    seller: 1001, // 营业员
    customer: 301,
    doctor: 401,
    VIP: 501,
    regularCostomer: 601,
    hospitalInsider: 701,
    others: 801
});

var decodeRelation = function decodeRelation(r) {
    var _T;

    var T = (_T = {}, (0, _defineProperty3.default)(_T, relation.seller, '营业员'), (0, _defineProperty3.default)(_T, relation.customer, '顾客'), (0, _defineProperty3.default)(_T, relation.doctor, '验光医生'), (0, _defineProperty3.default)(_T, relation.VIP, 'VIP顾客'), (0, _defineProperty3.default)(_T, relation.regularCostomer, '熟客'), (0, _defineProperty3.default)(_T, relation.hospitalInsider, '医院内部人士'), (0, _defineProperty3.default)(_T, relation.others, '其他'), _T);
    return T[r] || decodeCommonRelation(r);
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    relation: relation,
    decodeRelation: decodeRelation,
    transportState: transportState,
    decodeTransportState: decodeTransportState,
    messageState: messageState,
    decodeMessageState: decodeMessageState,
    getMethodId: getMethodId,
    decodeGetMethodId: decodeGetMethodId,
    categoryId: categoryId,
    decodeCategoryId: decodeCategoryId,
    getActionStateAttr: getActionStateAttr,
    mainCategoryId: mainCategoryId,
    decodeMainCategoryId: decodeMainCategoryId,
    billState: billState,
    decodeBillState: decodeBillState,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};