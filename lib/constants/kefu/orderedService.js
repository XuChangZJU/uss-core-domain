'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = Object.assign({}, commonState, {
    subscribed: 601,
    unsubscribed: 602
    // expired
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.subscribed, '订阅中'), _defineProperty(_S, state.unsubscribed, '未订阅'), _S);
    return S[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    subscribe: 1401,
    unsubscribe: 1402,
    renew: 1403
    // expire
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, _defineProperty(_A, action.subscribe, '订阅'), _defineProperty(_A, action.unsubscribe, '退订'), _defineProperty(_A, action.renew, '续费'), _A);
    return A[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.subscribe, [state.unsubscribed, state.subscribed]), _defineProperty(_STATE_TRANS_MATRIX, action.unsubscribe, [[state.subscribed, state.expired], state.unsubscribed]), _defineProperty(_STATE_TRANS_MATRIX, action.expire, [state.subscribed, state.expired]), _defineProperty(_STATE_TRANS_MATRIX, action.renew, [[state.subscribed, state.expired], state.subscribed]), _STATE_TRANS_MATRIX);

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};