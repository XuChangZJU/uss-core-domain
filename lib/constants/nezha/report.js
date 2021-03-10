'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _STATE_TRAN_MATRIX;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var state = (0, _assign2.default)({}, commonState, {
    delivered: 101,
    accepted: 105,
    inRepairing: 111,
    paused: 112,
    done: 115,
    committed: 116,
    askingForRestart: 121,
    inRedoing: 125,
    failed: 131,
    cancelled2: 132
});

var decodeState = function decodeState(s) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, state.delivered, '已派单'), (0, _defineProperty3.default)(_TEXT, state.accepted, '已接单'), (0, _defineProperty3.default)(_TEXT, state.inRepairing, '维修中'), (0, _defineProperty3.default)(_TEXT, state.paused, '暂停中'), (0, _defineProperty3.default)(_TEXT, state.done, '已修好'), (0, _defineProperty3.default)(_TEXT, state.committed, '待确认'), (0, _defineProperty3.default)(_TEXT, state.askingForRestart, '申请重修'), (0, _defineProperty3.default)(_TEXT, state.inRedoing, '确认重修'), (0, _defineProperty3.default)(_TEXT, state.failed, '维修失败'), (0, _defineProperty3.default)(_TEXT, state.cancelled2, '已取消'), _TEXT);
    return TEXT[s] || decodeCommonState(s);
};

var action = (0, _assign2.default)({}, commonAction, {
    confirm: 101,
    accept: 105,
    deliverAgain: 106,
    giveUp: 107,
    startRepairing: 111,
    pauseRepairing: 112,
    endRepairing: 115,
    commit: 116,
    admit: 117,
    askForRestart: 121,
    restart: 125,
    rejectRepairing: 126,
    surrender: 131
});

var decodeAction = function decodeAction(s) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, (0, _defineProperty3.default)(_TEXT2, action.confirm, '确认'), (0, _defineProperty3.default)(_TEXT2, action.accept, '接单'), (0, _defineProperty3.default)(_TEXT2, action.deliverAgain, '再次派单'), (0, _defineProperty3.default)(_TEXT2, action.giveUp, '放弃接单'), (0, _defineProperty3.default)(_TEXT2, action.startRepairing, '开始维修'), (0, _defineProperty3.default)(_TEXT2, action.pauseRepairing, '暂停维修'), (0, _defineProperty3.default)(_TEXT2, action.endRepairing, '维修完成'), (0, _defineProperty3.default)(_TEXT2, action.commit, '提交完成'), (0, _defineProperty3.default)(_TEXT2, action.admit, '确认完成'), (0, _defineProperty3.default)(_TEXT2, action.askForRestart, '申请返修'), (0, _defineProperty3.default)(_TEXT2, action.restart, '再次开始维修'), (0, _defineProperty3.default)(_TEXT2, action.rejectRepairing, '拒绝维修'), (0, _defineProperty3.default)(_TEXT2, action.surrender, '放弃维修'), _TEXT2);
    return TEXT[s] || decodeCommonAction(s);
};

var CONSTANTS = {
    allowDeliverGap: 30 * 60 * 1000 // 半小时后才允许主动再次派单
};

var relation = (0, _assign2.default)({}, commonRelation, {
    factoryOwner: 102, // 工厂主
    worker: 101 // 技工
});

var decodeRelation = function decodeRelation(r) {
    var _TEXT3;

    var TEXT = (_TEXT3 = {}, (0, _defineProperty3.default)(_TEXT3, relation.worker, '技工'), (0, _defineProperty3.default)(_TEXT3, relation.factoryOwner, '工厂主'), _TEXT3);

    return TEXT[r] || decodeCommonRelation(r);
};

var STATE_TRAN_MATRIX = (_STATE_TRAN_MATRIX = {}, (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.confirm, [state.init, state.delivered]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.accept, [state.delivered, state.accepted]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.deliverAgain, [state.accepted, state.delivered]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.giveUp, [state.accepted, state.delivered]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.startRepairing, [[state.inRedoing, state.accepted, state.paused], state.inRepairing]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.pauseRepairing, [state.inRepairing, state.paused]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.endRepairing, [state.inRepairing, state.done]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.commit, [[state.inRepairing, state.committed], state.committed]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.admit, [state.committed, state.done]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.askForRestart, [state.done, state.askingForRestart]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.restart, [state.askingForRestart, state.inRedoing]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.rejectRepairing, [state.askingForRestart, state.done]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.surrender, [[state.inRepairing, state.inRedoing], state.failed]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.expire, [state.init, state.expired]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.cancel, [[state.init, state.delivered, state.accepted], state.cancelled2]), (0, _defineProperty3.default)(_STATE_TRAN_MATRIX, action.complete, [state.done, state.completed]), _STATE_TRAN_MATRIX);

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

    var TEXT = (_TEXT4 = {}, (0, _defineProperty3.default)(_TEXT4, mediaType.video, '视频'), (0, _defineProperty3.default)(_TEXT4, mediaType.image, '图片'), (0, _defineProperty3.default)(_TEXT4, mediaType.audio, '音频'), _TEXT4);

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