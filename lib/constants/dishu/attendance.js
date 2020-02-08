'use strict';

var _STATE_TRAN_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2020/1/20.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var state = {
    inactive: 81,
    alive: 101,
    completed: 111
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.inactive, '尚未开始'), _defineProperty(_S, state.alive, '打卡中'), _defineProperty(_S, state.completed, '已结束'), _S);

    return S[s];
};

var action = Object.assign({}, commonAction, {
    wakeUp: 101,
    complete: 111
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, action.wakeUp, '唤醒'), _defineProperty(_S2, action.complete, '结束'), _S2);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, _defineProperty(_STATE_TRAN_MATRIX, action.wakeUp, [state.inactive, state.alive]), _defineProperty(_STATE_TRAN_MATRIX, action.complete, [state.alive, state.completed]), _STATE_TRAN_MATRIX);

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};