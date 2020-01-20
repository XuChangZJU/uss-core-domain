'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2020/1/20.
 */

var state = {
    alive: 101,
    completed: 111
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.alive, '打卡中'), _defineProperty(_S, state.completed, '已结束'), _S);

    return S[s];
};

var action = {
    complete: 111
};

var decodeAction = function decodeAction(a) {
    var S = _defineProperty({}, action.complete, '结束');

    return S[a];
};

var STATE_TRAN_MATRIX = _defineProperty({}, action.complete, [state.alive, state.completed]);

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};