'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2020/2/20.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var state = {
    pending: 301,
    processing: 401,
    completed: 501
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.pending, '待处理'), _defineProperty(_S, state.processing, '处理中'), _defineProperty(_S, state.completed, '已完成'), _S);

    return S[s];
};

var relation = Object.assign({}, commonRelation, {
    supporter: 301
});
var decodeRelation = function decodeRelation(r) {
    var R = _defineProperty({}, relation.supporter, '客服');

    return R[r] || decodeCommonRelation(a);
};

var action = Object.assign({}, commonAction, {
    manage: 301
});

var decodeAction = function decodeAction(a) {
    var S = _defineProperty({}, action.manage, '处理');

    return S[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = _defineProperty({}, action.manage, [state.processing, state.pending]);

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    relation: relation,
    decodeRelation: decodeRelation,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};