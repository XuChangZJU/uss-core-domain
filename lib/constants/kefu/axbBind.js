'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var origin = {
    huaweiCloud: 1,
    aliCloud: 2
};

var state = Object.assign({}, commonState, {
    binded: 301,
    unbinded: 302
    // expired
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.binded, '已绑定'), _defineProperty(_S, state.unbinded, '已解绑'), _S);
    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    // create
    // bind: 1101,
    unbind: 1102
    // expire
});

var decodeAction = function decodeAction(a) {
    var A = _defineProperty({}, action.unbind, '解绑');
    return A[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.expire, [state.binded, state.expired]), _defineProperty(_STATE_TRANS_MATRIX, action.unbind, [[state.binded, state.expired], state.unbinded]), _STATE_TRANS_MATRIX);

module.exports = {
    origin: origin,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};