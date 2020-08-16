'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2020/2/20.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var state = {
    noTrade: 301,
    hasTrade: 310,
    expired: 511
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.noTrade, '无交易'), _defineProperty(_S, state.hasTrade, '有交易'), _defineProperty(_S, state.expired, '已过期'), _S);

    return S[s];
};

var action = Object.assign({}, commonAction, {
    expire: 320
});

var decodeAction = function decodeAction(a) {
    var S = _defineProperty({}, action.expire, '过期');

    return S[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = _defineProperty({}, action.expire, [state.noTrade, state.expired]);

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};