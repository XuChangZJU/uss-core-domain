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
    decodeCommonState = _require.decodeState;

var state = {
    normal: 301,
    cancelled: 401,
    completed: 501
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.normal, '待就诊'), (0, _defineProperty3.default)(_S, state.cancelled, '已取消'), (0, _defineProperty3.default)(_S, state.completed, '已完成'), _S);
    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    regist: 301,
    cancel: 401
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, (0, _defineProperty3.default)(_A, action.regist, '确认'), (0, _defineProperty3.default)(_A, action.cancel, '取消'), _A);
    return A[a] || decodeCommonAction(a);
};
var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.regist, [state.normal, state.completed]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.cancel, [state.normal, state.cancelled]), _STATE_TRANS_MATRIX);
module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};