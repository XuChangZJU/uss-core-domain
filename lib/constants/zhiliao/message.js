'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _STATE_TRANS_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = (0, _assign2.default)({}, commonState, {
    unsent: 401,
    // sent: 401,
    // received: 402,
    unread: 402,
    read: 403,
    withdrawn: 411,
    concealed: 412
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.unsent, '未发送'), (0, _defineProperty3.default)(_S, state.unread, '未读'), (0, _defineProperty3.default)(_S, state.read, '已读'), (0, _defineProperty3.default)(_S, state.withdrawn, '已撤回'), (0, _defineProperty3.default)(_S, state.concealed, '已删除'), _S);
    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    send: 1301,
    // receive: 1302,
    read: 1303,
    withdraw: 1311,
    conceal: 1312
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, (0, _defineProperty3.default)(_A, action.send, '发送'), (0, _defineProperty3.default)(_A, action.read, '阅读'), (0, _defineProperty3.default)(_A, action.withdraw, '撤回'), (0, _defineProperty3.default)(_A, action.conceal, '删除'), _A);
    return A[a] || decodeCommonAction(a);
};

var relation = (0, _assign2.default)({}, commonRelation, {
    sender: 301,
    receiver: 302
});

var decodeRelation = function decodeRelation(r) {
    var _R;

    var R = (_R = {}, (0, _defineProperty3.default)(_R, relation.sender, '发送者'), (0, _defineProperty3.default)(_R, relation.receiver, '接受者'), _R);
    return R[r] || decodeCommonRelation(r);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.send, [state.unsent, state.unread]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.read, [state.unread, state.read]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.withdraw, [[state.unread, state.read], state.withdrawn]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.conceal, [[state.unsent, state.unread, state.read], state.cancelled]), _STATE_TRANS_MATRIX);
module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};