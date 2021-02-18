'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2020/1/20.
 */
var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation;

var type = {
    rand: 1, // 随堂打卡
    work: 2, // 考勤打卡
    sign: 3, // 签到打卡
    patrol: 4 // 巡检打卡
};

/**
 * static指静态打卡，即在创建打卡的时候就要收集信息
 * @param t
 */
var isTypeStatic = function isTypeStatic(t) {
    return [type.work, type.sign].includes(t);
};

var decodeType = function decodeType(t) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, type.rand, '随堂打卡'), (0, _defineProperty3.default)(_S, type.work, '考勤打卡'), (0, _defineProperty3.default)(_S, type.sign, '签到打卡'), (0, _defineProperty3.default)(_S, type.patrol, '巡检打卡'), _S);

    return S[t];
};

var state = {
    alive: 101,
    dead: 111
};

var decodeState = function decodeState(s) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, state.alive, '活跃的'), (0, _defineProperty3.default)(_S2, state.dead, '结束的'), _S2);

    return S[s];
};

var action = (0, _assign2.default)({}, CommonAction, {
    makeDead: 111
});

var decodeAction = function decodeAction(a) {
    var S = (0, _defineProperty3.default)({}, action.makeDead, '使结束');

    return S[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = (0, _defineProperty3.default)({}, action.makeDead, [state.alive, state.dead]);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    type: type,
    decodeType: decodeType,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX,
    isTypeStatic: isTypeStatic
};