'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _STATE_TRANS_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = (0, _assign2.default)({}, commonState, {
    subscribed: 601,
    unsubscribed: 602
    // expired
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.subscribed, '订阅中'), (0, _defineProperty3.default)(_S, state.unsubscribed, '未订阅'), _S);
    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    subscribe: 1401,
    unsubscribe: 1402,
    renew: 1403
    // expire
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, (0, _defineProperty3.default)(_A, action.subscribe, '订阅'), (0, _defineProperty3.default)(_A, action.unsubscribe, '退订'), (0, _defineProperty3.default)(_A, action.renew, '续费'), _A);
    return A[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.subscribe, [state.unsubscribed, state.subscribed]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.unsubscribe, [[state.subscribed, state.expired], state.unsubscribed]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.expire, [state.subscribed, state.expired]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.renew, [[state.subscribed, state.expired], state.subscribed]), _STATE_TRANS_MATRIX);

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};