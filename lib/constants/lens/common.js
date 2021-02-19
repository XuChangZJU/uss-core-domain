'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _STATE_TRANS_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2020/2/20.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = (0, _assign2.default)({}, commonState, {
    online: 501,
    offline: 511
});

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.online, '使用中'), (0, _defineProperty3.default)(_S, state.offline, '已停用'), _S);

    return S[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    enable: 501,
    disable: 511
});

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, action.enable, '启用'), (0, _defineProperty3.default)(_S2, action.disable, '禁用'), _S2);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.enable, [state.offline, state.online]), (0, _defineProperty3.default)(_STATE_TRANS_MATRIX, action.disable, [state.online, state.offline]), _STATE_TRANS_MATRIX);

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};