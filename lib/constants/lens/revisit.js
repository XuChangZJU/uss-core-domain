'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2020/2/20.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var state = {
    pending: 301,
    processing: 401,
    waitingForData: 501,
    completed: 601,
    noData: 701
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.pending, '待处理'), (0, _defineProperty3.default)(_S, state.processing, '处理中'), (0, _defineProperty3.default)(_S, state.completed, '已完成'), (0, _defineProperty3.default)(_S, state.waitingForData, '已完成等待通话记录生成'), (0, _defineProperty3.default)(_S, state.noData, '无通话记录'), _S);
    return S[s];
};

var action = (0, _assign2.default)({}, commonAction, {
    manage: 301
});

var decodeAction = function decodeAction(a) {
    var S = (0, _defineProperty3.default)({}, action.manage, '处理');

    return S[a] || decodeCommonAction(a);
};

var STATE_TRANS_MATRIX = (0, _defineProperty3.default)({}, action.manage, [state.pending, state.processing]);

var type = {
    recheck: 1,
    appointment: 2
};

var decodeType = function decodeType(t) {
    var _T;

    var T = (_T = {}, (0, _defineProperty3.default)(_T, type.recheck, '邀请复查'), (0, _defineProperty3.default)(_T, type.appointment, '询问预约未到原因'), _T);
    return T[t];
};

module.exports = {
    type: type,
    decodeType: decodeType,
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};