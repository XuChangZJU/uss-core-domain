'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _STATE_TRAN_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = (0, _assign2.default)({}, commonState, {
    stored: 301,
    notStored: 302,
    sold: 401,
    returned: 402
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.stored, '已入库'), (0, _defineProperty3.default)(_S, state.notStored, '未入库'), (0, _defineProperty3.default)(_S, state.sold, '已售出'), (0, _defineProperty3.default)(_S, state.returned, '已退还'), _S);
    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    inStore: 301,
    outStore: 302,
    sell: 401,
    return: 402
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, (0, _defineProperty3.default)(_A, action.inStore, '入库'), (0, _defineProperty3.default)(_A, action.outStore, '出库'), (0, _defineProperty3.default)(_A, action.sell, '售出'), (0, _defineProperty3.default)(_A, action.return, '退还'), _A);
    return A[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.inStore, [state.notStored, state.stored]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.outStore, [state.stored, state.notStored]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.sell, [state.stored, state.sold]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.return, [state.stored, state.returned]), _STATE_TRAN_MATRIX);

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};