'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState,
    transportState = _require.transportState,
    transportAction = _require.transportAction,
    decodeTransportState = _require.decodeTransportState,
    decodeTransportAction = _require.decodeTransportAction,
    TRANSPORT_STATE_TRANS_MATRIX = _require.TRANSPORT_STATE_TRANS_MATRIX,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX;

var action = (0, _assign2.default)({}, commonAction, transportAction);
var decodeAction = function decodeAction(a) {
    return decodeTransportAction(a) || decodeCommonAction(a);
};

var state = (0, _assign2.default)({}, commonState, transportState);

var decodeState = function decodeState(s) {
    return decodeTransportState(s) || decodeCommonState(s);
};

var STATE_TRANS_MATRIX = (0, _assign2.default)({}, TRANSPORT_STATE_TRANS_MATRIX, COMMON_STATE_TRAN_MATRIX);

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};