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

var origin = {
    huaweiCloud: 1,
    aliCloud: 2
};

var state = (0, _assign2.default)({}, commonState, {
    binded: 301,
    unbinded: 302
    // expired
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.binded, '已绑定'), (0, _defineProperty3.default)(_S, state.unbinded, '已解绑'), _S);
    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    // create
    // bind: 1101,
    unbind: 1102
    // expire
});

var decodeAction = function decodeAction(a) {
    var A = (0, _defineProperty3.default)({}, action.unbind, '解绑');
    return A[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.expire, [state.binded, state.expired]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.unbind, [[state.binded, state.expired], state.unbinded]), _STATE_TRANS_MATRIX);

module.exports = {
    origin: origin,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};