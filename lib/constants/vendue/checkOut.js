'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _Object$assign2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    transportAction = _require.transportAction,
    decodeTransportAction = _require.decodeTransportAction,
    decodeCommonTransportState = _require.decodeTransportState,
    commonTransportState = _require.transportState,
    state = _require.state,
    decodeState = _require.decodeState,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX,
    TRANSPORT_STATE_TRANS_MATRIX = _require.TRANSPORT_STATE_TRANS_MATRIX;

var action = (0, _assign2.default)({
    takeAway: 20002
}, commonAction, transportAction);
var decodeAction = function decodeAction(a) {
    var DICT = (0, _defineProperty3.default)({}, action.takeAway, '顾客自提');
    return DICT[a] || decodeCommonAction(a) || decodeTransportAction(a);
};

var transportState = (0, _assign2.default)({}, commonTransportState, {
    shipping: 20001
});

var decodeTransportState = function decodeTransportState(ts) {
    var DICT = (0, _defineProperty3.default)({}, transportState.shipping, '暂存中');
    return DICT[ts] || decodeCommonTransportState(ts);
};

var STATE_TRAN_MATRIX = (0, _assign2.default)((_Object$assign2 = {}, (0, _defineProperty3.default)(_Object$assign2, transportAction.taPrepare, [transportState.shipping, transportState.tsInPreparing]), (0, _defineProperty3.default)(_Object$assign2, transportAction.taCancel, [transportState.tsInPreparing, transportState.shipping]), _Object$assign2), COMMON_STATE_TRAN_MATRIX, TRANSPORT_STATE_TRANS_MATRIX);

var getActionStateAttr = function getActionStateAttr(action) {
    if (action > 20000) {
        return 'billState';
    }
    if (action > 10000) {
        return 'transportState';
    }

    return 'state';
};

var getMethod = {
    express: 1,
    bySelf: 2
};

var decodeGetMethod = function decodeGetMethod(gm) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, getMethod.express, '快递'), (0, _defineProperty3.default)(_S, getMethod.bySelf, '自提'), _S);

    return S[gm];
};

module.exports = {
    getActionStateAttr: getActionStateAttr,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    relation: relation,
    decodeRelation: decodeRelation,
    transportState: transportState,
    decodeTransportState: decodeTransportState,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX,

    getMethod: getMethod,
    decodeGetMethod: decodeGetMethod
};