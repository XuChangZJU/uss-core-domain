'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STATE_TRAN_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2020/1/20.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var state = {
    inactive: 81,
    alive: 101,
    completed: 111
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.inactive, '未开始'), (0, _defineProperty3.default)(_S, state.alive, '打卡中'), (0, _defineProperty3.default)(_S, state.completed, '已结束'), _S);

    return S[s];
};

var action = (0, _assign2.default)({}, commonAction, {
    wakeUp: 101,
    complete: 111
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, action.wakeUp, '唤醒'), (0, _defineProperty3.default)(_S2, action.complete, '结束'), _S2);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.wakeUp, [state.inactive, state.alive]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.complete, [state.alive, state.completed]), _STATE_TRAN_MATRIX);

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};