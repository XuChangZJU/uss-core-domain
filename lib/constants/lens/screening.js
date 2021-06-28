'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STATE_TRANS_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var _require2 = require('./trade'),
    category = _require2.category,
    decodeCategory = _require2.decodeCategory;

var state = {
    ongoing: 301,
    finished: 401,
    cancelled: 501
};
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.ongoing, '进行中'), (0, _defineProperty3.default)(_S, state.finished, '已结束'), (0, _defineProperty3.default)(_S, state.cancelled, '已取消'), _S);
    return S[s];
};
var action = (0, _assign2.default)({}, commonAction, {
    cancel: 301,
    restart: 401,
    finish: 501
});

var decodeAction = function decodeAction(a) {
    var _A;

    var A = (_A = {}, (0, _defineProperty3.default)(_A, action.cancel, '取消'), (0, _defineProperty3.default)(_A, action.restart, '重新开始'), (0, _defineProperty3.default)(_A, action.finish, '完成'), _A);

    return A[a] || decodeCommonAction(a);
};
var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.cancel, [state.ongoing, state.cancelled]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.restart, [state.cancelled, state.ongoing]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.finish, [state.ongoing, state.finished]), _STATE_TRANS_MATRIX);

module.exports = {
    action: action,
    category: category,
    decodeCategory: decodeCategory,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};