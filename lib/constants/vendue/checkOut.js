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
    state = _require.state,
    decodeState = _require.decodeState,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX;

var action = (0, _assign2.default)({}, commonAction, {
    // enter: 10002,
    // show: 10003,
    prepare: 10005,
    cancelPrepare: 10105,
    ship: 10006,
    cancelShip: 10106,
    receive: 10007
});
var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, (0, _defineProperty3.default)(_A, action.prepare, '请求发货'), (0, _defineProperty3.default)(_A, action.cancelPrepare, '取消请求'), (0, _defineProperty3.default)(_A, action.ship, '发货'), (0, _defineProperty3.default)(_A, action.cancelShip, '取消发货'), (0, _defineProperty3.default)(_A, action.receive, '收货'), _A);
    return A[a] || decodeCommonAction(a);
};

var transportState = {
    /* unrecieved: 10001,
    stored: 10002,
    inPreview: 10003, */
    keeping: 10004,
    preparing: 10005,
    shipped: 10006,
    received: 10007
};

var decodeTransportState = function decodeTransportState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, transportState.unrecieved, '未到库'), (0, _defineProperty3.default)(_S, transportState.stored, '库存'), (0, _defineProperty3.default)(_S, transportState.inPreview, '预展中'), (0, _defineProperty3.default)(_S, transportState.keeping, '暂存中'), (0, _defineProperty3.default)(_S, transportState.preparing, '待发货'), (0, _defineProperty3.default)(_S, transportState.shipped, '已发货'), (0, _defineProperty3.default)(_S, transportState.received, '已收货'), _S);

    return S[s];
};
var STATE_TRAN_MATRIX = (0, _assign2.default)({}, COMMON_STATE_TRAN_MATRIX, (_Object$assign2 = {}, (0, _defineProperty3.default)(_Object$assign2, action.prepare, [transportState.keeping, transportState.preparing]), (0, _defineProperty3.default)(_Object$assign2, action.cancelPrepare, [transportState.preparing, transportState.keeping]), (0, _defineProperty3.default)(_Object$assign2, action.ship, [transportState.preparing, transportState.shipped]), (0, _defineProperty3.default)(_Object$assign2, action.cancelShip, [transportState.shipped, transportState.preparing]), (0, _defineProperty3.default)(_Object$assign2, action.receive, [transportState.shipped, transportState.received]), _Object$assign2));
var getActionStateAttr = function getActionStateAttr(action) {
    if (action > 20000) {
        return 'billState';
    }
    if (action > 10000) {
        return 'transportState';
    }

    return 'state';
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
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};