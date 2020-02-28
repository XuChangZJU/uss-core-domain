'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var state = {
    unbinded: 301,
    binded: 310,
    expired: 511
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.unbinded, '未绑定'), _defineProperty(_S, state.binded, '已绑定'), _defineProperty(_S, state.expired, '已过期'), _S);

    return S[s];
};

var action = Object.assign({}, commonAction, {
    bind: 310,
    expire: 511
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, action.bind, '绑定'), _defineProperty(_S2, action.expire, '过期'), _S2);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.bind, [state.unbinded, state.binded]), _defineProperty(_STATE_TRANS_MATRIX, action.expire, [state.unbinded, state.expired]), _STATE_TRANS_MATRIX);

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};