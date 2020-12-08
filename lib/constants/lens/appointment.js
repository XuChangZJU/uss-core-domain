'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var category = {
    appointment: 1,
    register: 2
};

var decodeCategory = function decodeCategory(c) {
    var _C;

    var C = (_C = {}, _defineProperty(_C, category.appointment, '预约'), _defineProperty(_C, category.register, '挂号'), _C);
    return C[c] || decodeCommonRelation(c);
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

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    category: category,
    decodeCategory: decodeCategory
};