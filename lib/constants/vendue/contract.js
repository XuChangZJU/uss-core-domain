'use strict';

var _STATE_TRAN_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    state = _require.state,
    decodeState = _require.decodeState;

var action = Object.assign({}, commonAction, {
    sign: 301,
    performance: 302
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, _defineProperty(_A, action.sign, '签订'), _defineProperty(_A, action.performance, '履行'), _A);
    return A[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, _defineProperty(_STATE_TRAN_MATRIX, action.sign, [state.init, state.legal]), _defineProperty(_STATE_TRAN_MATRIX, action.performance, [state.legal, state.completed]), _defineProperty(_STATE_TRAN_MATRIX, action.abort, [[state.init, state.legal], state.aborted]), _STATE_TRAN_MATRIX);

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};