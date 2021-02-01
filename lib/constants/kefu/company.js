'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = Object.assign({}, commonState, {
    online: 501,
    offline: 511
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.online, '使用中'), _defineProperty(_S, state.offline, '已停用'), _S);
    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    enable: 1301,
    disable: 1302
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, _defineProperty(_A, action.enable, '启用'), _defineProperty(_A, action.disable, '禁用'), _A);
    return A[a] || decodeCommonAction(a);
};

var relation = Object.assign({}, commonRelation, {
    // owner
    service: 401
});

var decodeRelation = function decodeRelation(r) {
    var R = _defineProperty({}, relation.service, '客服');
    return R[r] || decodeCommonRelation(r);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.enable, [state.offline, state.online]), _defineProperty(_STATE_TRANS_MATRIX, action.disable, [state.online, state.offline]), _STATE_TRANS_MATRIX);
module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};