'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    state = _require.state,
    decodeState = _require.decodeState,
    decodeTransportAction = _require.decodeTransportAction,
    TRANSPORT_STATE_TRANS_MATRIX = _require.TRANSPORT_STATE_TRANS_MATRIX,
    commonTransportAction = _require.transportAction,
    commonTransportState = _require.transportState,
    decodeCommonTransportState = _require.decodeTransportState,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX;

var transportState = (0, _assign2.default)({}, commonTransportState, {
    unsend: 10001,
    arrived: 10003
});
var decodeTransportState = function decodeTransportState(ts) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, transportState.unsend, '待取货'), (0, _defineProperty3.default)(_TEXT, transportState.arrived, '已取货'), _TEXT);
    return TEXT[ts] || decodeCommonTransportState(ts);
};
var action = (0, _assign2.default)({}, commonAction, commonTransportAction, {
    tradeSend: 10011,
    tradeAccept: 10021,
    tradeReject: 10022,
    tradeAbort: 10101,

    confirmArrive: 31000
});

var decodeAction = function decodeAction(a) {
    var TEXT = (0, _defineProperty3.default)({}, action.confirmArrive, '确认提货');

    return TEXT[a] || decodeCommonAction(a) || decodeTransportAction(a);
};

var STATE_TRANS_MATRIX = (0, _assign2.default)({}, COMMON_STATE_TRAN_MATRIX, TRANSPORT_STATE_TRANS_MATRIX, (0, _defineProperty3.default)({}, action.confirmArrive, [transportState.unsend, transportState.arrived]));

var getMethod = {
    helpYourself: 1,
    express: 2
};

var decodeGetMethod = function decodeGetMethod(gm) {
    var _GM;

    var GM = (_GM = {}, (0, _defineProperty3.default)(_GM, getMethod.helpYourself, '顾客自取'), (0, _defineProperty3.default)(_GM, getMethod.express, '快递'), _GM);

    return GM[gm];
};

module.exports = {
    transportState: transportState,
    decodeTransportState: decodeTransportState,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX,
    getMethod: getMethod,
    decodeGetMethod: decodeGetMethod
};