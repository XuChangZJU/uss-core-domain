'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _STATE_TRANS_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = (0, _assign2.default)({}, commonState, {
    waitingForAccept: 301
});

var decodeState = function decodeState(s) {
    var S = (0, _defineProperty3.default)({}, state.waitingForAccept, '待商家确认退款');
    return decodeCommonState(s) || S[s];
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.refund, [state.waitingForAccept, state.refunding]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.cancel, [state.waitingForAccept, state.cancelled]), _STATE_TRANS_MATRIX);
module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};