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
    available: 401,
    unavailable: 402
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.available, '可用'), (0, _defineProperty3.default)(_S, state.unavailable, '不可用'), _S);
    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    bind: 1201,
    unbind: 1202,
    delete: 1203,
    arrear: 1204,
    halt: 1205
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, (0, _defineProperty3.default)(_A, action.bind, '绑定'), (0, _defineProperty3.default)(_A, action.unbind, '解绑'), (0, _defineProperty3.default)(_A, action.arrear, '欠费'), (0, _defineProperty3.default)(_A, action.halt, '停机'), _A);
    return A[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.bind, [state.available, state.unavailable]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.unbind, [state.unavailable, state.available]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.arrear, [state.available, state.unavailable]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.halt, [state.available, state.unavailable]), _STATE_TRANS_MATRIX);

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};