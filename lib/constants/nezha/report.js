'use strict';

var _STATE_TRAN_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2019/10/15.
 */
var _require = require('../action'),
    commonAction = _require.action,
    commonState = _require.state,
    decodeCommonAction = _require.decodeAction,
    decodeCommonState = _require.decodeState,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var state = Object.assign({}, commonState, {
    delivered: 101,
    accepted: 105,
    inRepairing: 111,
    done: 115,
    askingForRestart: 121,
    inRedoing: 125,
    failed: 131,
    cancelled2: 132
});

var decodeState = function decodeState(s) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, state.delivered, '已派单'), _defineProperty(_TEXT, state.accepted, '已接单'), _defineProperty(_TEXT, state.inRepairing, '维修中'), _defineProperty(_TEXT, state.done, '已修好'), _defineProperty(_TEXT, state.askingForRestart, '申请重修'), _defineProperty(_TEXT, state.inRedoing, '确认重修'), _defineProperty(_TEXT, state.failed, '维修失败'), _defineProperty(_TEXT, state.cancelled2, '已取消'), _TEXT);
    return TEXT[s] || decodeCommonState(s);
};

var action = Object.assign({}, commonAction, {
    confirm: 101,
    accept: 105,
    deliverAgain: 106,
    giveUp: 107,
    startRepairing: 111,
    endRepairing: 115,
    askForRestart: 121,
    restart: 125,
    surrender: 131
});

var decodeAction = function decodeAction(a) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, _defineProperty(_TEXT2, action.confirm, '确认'), _defineProperty(_TEXT2, action.accept, '接单'), _defineProperty(_TEXT2, action.deliverAgain, '再次派单'), _defineProperty(_TEXT2, action.giveUp, '放弃接单'), _defineProperty(_TEXT2, action.startRepairing, '开始维修'), _defineProperty(_TEXT2, action.endRepairing, '结束维修'), _defineProperty(_TEXT2, action.askForRestart, '申请返修'), _defineProperty(_TEXT2, action.restart, '再次开始维修'), _defineProperty(_TEXT2, action.surrender, '放弃维修'), _TEXT2);
    return TEXT[s] || decodeCommonAction(s);
};

var CONSTANTS = {
    allowDeliverGap: 30 * 60 * 1000 // 半小时后才允许主动再次派单
};

var relation = Object.assign({}, commonRelation, {
    worker: 101 // 技工
});

var decodeRelation = function decodeRelation(r) {
    var TEXT = _defineProperty({}, relation.worker, '技工');

    return TEXT[r] || decodeCommonRelation(r);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, _defineProperty(_STATE_TRAN_MATRIX, action.confirm, [state.init, state.delivered]), _defineProperty(_STATE_TRAN_MATRIX, action.accept, [state.delivered, state.accepted]), _defineProperty(_STATE_TRAN_MATRIX, action.deliverAgain, [state.accepted, state.delivered]), _defineProperty(_STATE_TRAN_MATRIX, action.giveUp, [state.accepted, state.delivered]), _defineProperty(_STATE_TRAN_MATRIX, action.startRepairing, [state.accepted, state.inRepairing]), _defineProperty(_STATE_TRAN_MATRIX, action.endRepairing, [state.inRepairing, state.done]), _defineProperty(_STATE_TRAN_MATRIX, action.askForRestart, [state.done, state.askingForRestart]), _defineProperty(_STATE_TRAN_MATRIX, action.restart, [state.askingForRestart, state.inRedoing]), _defineProperty(_STATE_TRAN_MATRIX, action.surrender, [[state.inRepairing, state.inRedoing], state.failed]), _defineProperty(_STATE_TRAN_MATRIX, action.expire, [state.init, state.expired]), _defineProperty(_STATE_TRAN_MATRIX, action.cancel, [[state.init, state.expired], state.cancelled2]), _STATE_TRAN_MATRIX);

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    CONSTANTS: CONSTANTS,
    relation: relation,
    decodeRelation: decodeRelation,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};