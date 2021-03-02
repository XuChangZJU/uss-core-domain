'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STATE_TRANS_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    state = _require.state,
    decodeState = _require.decodeState;

var transportState = {
    unsend: 10001,
    sending: 10002,
    arrived: 10003
};
var decodeTransportState = function decodeTransportState(a) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, transportState.unsend, '未发货'), (0, _defineProperty3.default)(_TEXT, transportState.sending, '待收货'), (0, _defineProperty3.default)(_TEXT, transportState.arrived, '已收货'), _TEXT);

    return TEXT[a] || decodeCommonAction(a);
};
var action = (0, _assign2.default)({}, commonAction, {
    send: 10001,
    confirmArrive: 10002
});

var decodeAction = function decodeAction(a) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, (0, _defineProperty3.default)(_TEXT2, action.send, '发快递'), (0, _defineProperty3.default)(_TEXT2, action.confirmArrive, '确认收货'), _TEXT2);

    return TEXT[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.send, [transportState.unsend, transportState.sending]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.confirmArrive, [transportState.sending, transportState.arrived]), _STATE_TRANS_MATRIX);

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