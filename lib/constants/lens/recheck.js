'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2020/2/20.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var state = {
    inactive: 2001, // 待推送
    active: 2002, // 推送中
    confirmed: 2003, // 用户已确认
    completed: 2004, // 复查完成
    expired: 100001 // 过期
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.inactive, '未到期'), _defineProperty(_S, state.active, '已到期'), _defineProperty(_S, state.confirmed, '已确认'), _defineProperty(_S, state.completed, '已完成'), _defineProperty(_S, state.expired, '已过期'), _S);

    return S[s];
};

var action = {
    activate: 2002,
    confirm: 2003,
    complete: 2004,
    expire: 2005
};

var decodeAction = function decodeAction(a) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, action.activate, '激活'), _defineProperty(_S2, action.confirm, '确认'), _defineProperty(_S2, action.complete, '完成'), _defineProperty(_S2, action.expire, '过期'), _S2);

    return S[a];
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.activate, [state.inactive, state.active]), _defineProperty(_STATE_TRANS_MATRIX, action.confirm, [state.active, state.confirmed]), _defineProperty(_STATE_TRANS_MATRIX, action.complete, [[state.inactive, state.active, state.confirmed, state.expired], state.confirmed]), _defineProperty(_STATE_TRANS_MATRIX, action.expire, [[state.active, state.confirmed], state.expired]), _STATE_TRANS_MATRIX);

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};