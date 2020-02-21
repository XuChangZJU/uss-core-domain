'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2020/2/20.
 */
var state = {
    active: 301,
    completed: 310,
    expired: 511
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.active, '诊疗中'), _defineProperty(_S, state.completed, '已完成'), _defineProperty(_S, state.expired, '已过期'), _S);

    return S[s];
};

var action = {
    complete: 310,
    expire: 511
};

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, action.complete, '完成'), _defineProperty(_S2, action.expire, '结束'), _S2);

    return S[a];
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.complete, [state.active, state.completed]), _defineProperty(_STATE_TRANS_MATRIX, action.expire, [state.active, state.completed]), _STATE_TRANS_MATRIX);

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};