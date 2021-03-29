'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _STATE_TRAN_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pick = require('lodash/pick');
var assign = require('lodash/assign');

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState;

var state = {
    contracted: 1001,
    convertible: 1101,
    completed: 1201,
    cancelled: 2001,
    aborted: 2002
};

var decodeState = function decodeState(s) {
    var _DICT;

    var DICT = (_DICT = {}, (0, _defineProperty3.default)(_DICT, state.contracted, '生效中'), (0, _defineProperty3.default)(_DICT, state.convertible, '可结算'), (0, _defineProperty3.default)(_DICT, state.completed, '结算完成'), (0, _defineProperty3.default)(_DICT, state.cancelled, '已取消'), (0, _defineProperty3.default)(_DICT, state.aborted, '已中止'), _DICT);
    return DICT[s] || decodeCommonState(s);
};

var action = assign({
    pay: 1101,
    complete: 1201,
    cancel: 2001,
    abort: 2002
}, pick(commonAction, ['create', 'update', 'remove', 'changePrice']));

var decodeAction = function decodeAction(a) {
    var _DICT2;

    var DICT = (_DICT2 = {}, (0, _defineProperty3.default)(_DICT2, action.pay, '买家支付'), (0, _defineProperty3.default)(_DICT2, action.complete, '结算'), (0, _defineProperty3.default)(_DICT2, action.cancel, '取消'), (0, _defineProperty3.default)(_DICT2, action.abort, '中止'), _DICT2);
    return DICT[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.pay, [state.contracted, state.convertible]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.complete, [state.convertible, state.completed]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.cancel, [state.contracted, state.cancelled]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.abort, [state.contracted, state.aborted]), _STATE_TRAN_MATRIX);

module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};