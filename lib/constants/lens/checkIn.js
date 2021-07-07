'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2020/2/20.
 */
var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction;

var category = {
    start: 1,
    off: 2,
    business: 3
};
var decodeCategory = function decodeCategory(c) {
    var _C;

    var C = (_C = {}, (0, _defineProperty3.default)(_C, category.start, '上班'), (0, _defineProperty3.default)(_C, category.off, '下班'), (0, _defineProperty3.default)(_C, category.business, '出差'), _C);
    return C[c];
};
var state = {
    normal: 1,
    add: 2,
    late: 3,
    earlyLeave: 4,
    different: 8,
    business: 16,
    noCheckIn: 32,
    askForLeave: 40
};
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.normal, '正常打卡'), (0, _defineProperty3.default)(_S, state.add, '补卡'), (0, _defineProperty3.default)(_S, state.late, '迟到'), (0, _defineProperty3.default)(_S, state.earlyLeave, '早退'), (0, _defineProperty3.default)(_S, state.different, '打卡门店与排班门店不同'), (0, _defineProperty3.default)(_S, state.business, '出差'), (0, _defineProperty3.default)(_S, state.noCheckIn, '缺卡'), (0, _defineProperty3.default)(_S, state.askForLeave, '请假'), _S);
    return S[s];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    category: category,
    decodeCategory: decodeCategory,
    state: state,
    decodeState: decodeState
};