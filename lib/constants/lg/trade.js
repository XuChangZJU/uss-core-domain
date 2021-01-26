'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, transportState.unsend, '未发货'), _defineProperty(_TEXT, transportState.sending, '待收货'), _defineProperty(_TEXT, transportState.arrived, '已收货'), _TEXT);

    return TEXT[a] || decodeCommonAction(a);
};
var action = Object.assign({}, commonAction, {
    send: 10001,
    confirmArrive: 10002
});

var decodeAction = function decodeAction(a) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, _defineProperty(_TEXT2, action.send, '发快递'), _defineProperty(_TEXT2, action.confirmArrive, '确认收货'), _TEXT2);

    return TEXT[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.send, [transportState.unsend, transportState.sending]), _defineProperty(_STATE_TRANS_MATRIX, action.confirmArrive, [transportState.sending, transportState.arrived]), _STATE_TRANS_MATRIX);

module.exports = {
    transportState: transportState,
    decodeTransportState: decodeTransportState,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};