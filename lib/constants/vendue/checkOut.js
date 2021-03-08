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
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX;

var action = (0, _assign2.default)({}, commonAction, {
    send: 10002
});
var decodeAction = function decodeAction(a) {
    var A = (0, _defineProperty3.default)({}, action.send, '发货');
    return A[a] || decodeCommonAction(a);
};

var transportState = {
    unsettled: 10001,
    inPreparing: 10002,
    shipped: 10003
};

var decodeTransportState = function decodeTransportState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, transportState.unsettled, '未结算'), (0, _defineProperty3.default)(_S, transportState.inPreparing, '未发货'), (0, _defineProperty3.default)(_S, transportState.shipped, '已发货'), _S);

    return S[s];
};
var STATE_TRAN_MATRIX = (0, _assign2.default)({}, COMMON_STATE_TRAN_MATRIX, (0, _defineProperty3.default)({}, action.send, [transportState.inPreparing, transportState.shipped]));
module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    relation: relation,
    decodeRelation: decodeRelation,
    transportState: transportState,
    decodeTransportState: decodeTransportState,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};