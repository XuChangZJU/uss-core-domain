'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

function decodeTimeSlot(timeSlot) {
    var t = {
        1: '上午',
        2: '下午',
        3: '晚上',
        4: '全天'
    };
    return t[timeSlot];
}

var _require2 = require('./trade'),
    category = _require2.category,
    decodeCategory = _require2.decodeCategory;

var type = {
    appointment: 1,
    register: 2
};

var decodeType = function decodeType(t) {
    var _T;

    var T = (_T = {}, _defineProperty(_T, type.appointment, '预约'), _defineProperty(_T, type.register, '挂号'), _T);
    return T[t];
};

var state = {
    normal: 301,
    cancelled: 401,
    completed: 501
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.normal, '正常的'), _defineProperty(_S, state.cancelled, '已取消'), _defineProperty(_S, state.completed, '已完成'), _S);
    return S[s] || decodeCommonRelation(s);
};

var action = Object.assign({
    regist: 1,
    cancel: 1
}, commonAction);

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, _defineProperty(_A, action.regist, '挂号'), _defineProperty(_A, action.cancel, '取消'), _A);
    return A[a] || decodeCommonAction(a);
};
var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.regist, [state.normal, state.completed]), _defineProperty(_STATE_TRANS_MATRIX, action.cancel, [state.normal, state.cancelled]), _STATE_TRANS_MATRIX);
module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    type: type,
    decodeType: decodeType,
    category: category,
    decodeCategory: decodeCategory,
    decodeTimeSlot: decodeTimeSlot,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};