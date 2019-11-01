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
    rejectRepairing: 126,
    surrender: 131
});

var decodeAction = function decodeAction(s) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, _defineProperty(_TEXT2, action.confirm, '确认'), _defineProperty(_TEXT2, action.accept, '接单'), _defineProperty(_TEXT2, action.deliverAgain, '再次派单'), _defineProperty(_TEXT2, action.giveUp, '放弃接单'), _defineProperty(_TEXT2, action.startRepairing, '开始维修'), _defineProperty(_TEXT2, action.endRepairing, '结束维修'), _defineProperty(_TEXT2, action.askForRestart, '申请返修'), _defineProperty(_TEXT2, action.restart, '再次开始维修'), _defineProperty(_TEXT2, action.rejectRepairing, '拒绝维修'), _defineProperty(_TEXT2, action.surrender, '放弃维修'), _TEXT2);
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

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, _defineProperty(_STATE_TRAN_MATRIX, action.confirm, [state.init, state.delivered]), _defineProperty(_STATE_TRAN_MATRIX, action.accept, [state.delivered, state.accepted]), _defineProperty(_STATE_TRAN_MATRIX, action.deliverAgain, [state.accepted, state.delivered]), _defineProperty(_STATE_TRAN_MATRIX, action.giveUp, [state.accepted, state.delivered]), _defineProperty(_STATE_TRAN_MATRIX, action.startRepairing, [[state.inRedoing, state.accepted], state.inRepairing]), _defineProperty(_STATE_TRAN_MATRIX, action.endRepairing, [state.inRepairing, state.done]), _defineProperty(_STATE_TRAN_MATRIX, action.askForRestart, [state.done, state.askingForRestart]), _defineProperty(_STATE_TRAN_MATRIX, action.restart, [state.askingForRestart, state.inRedoing]), _defineProperty(_STATE_TRAN_MATRIX, action.rejectRepairing, [state.askingForRestart, state.done]), _defineProperty(_STATE_TRAN_MATRIX, action.surrender, [[state.inRepairing, state.inRedoing], state.failed]), _defineProperty(_STATE_TRAN_MATRIX, action.expire, [state.init, state.expired]), _defineProperty(_STATE_TRAN_MATRIX, action.cancel, [[state.init, state.delivered, state.accepted, state.expired], state.cancelled2]), _defineProperty(_STATE_TRAN_MATRIX, action.complete, [state.done, state.completed]), _STATE_TRAN_MATRIX);

var giveUpReason = ['配件不足', '距离太远', '时间不对', '没有把握', '个人有急事', '与工厂已协商，放弃维修', '其它原因'];

var deliverAgainReason = ['联系不上对方', '对方迟到太久', '与技工已协商，换人维修', '其它原因'];

var cancelReason = ['我只是测试一下', '已经自己修好了', '暂时不修理', '其它原因'];

var mediaType = {
    'video': 1,
    'image': 2,
    'audio': 3
};

var decodeMediaType = function decodeMediaType(m) {
    var _TEXT4;

    var TEXT = (_TEXT4 = {}, _defineProperty(_TEXT4, mediaType.video, '视频'), _defineProperty(_TEXT4, mediaType.image, '图片'), _defineProperty(_TEXT4, mediaType.audio, '音频'), _TEXT4);

    return TEXT[m];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    CONSTANTS: CONSTANTS,
    relation: relation,
    decodeRelation: decodeRelation,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX,

    giveUpReason: giveUpReason,
    deliverAgainReason: deliverAgainReason,
    cancelReason: cancelReason,
    decodeMediaType: decodeMediaType,
    mediaType: mediaType
};