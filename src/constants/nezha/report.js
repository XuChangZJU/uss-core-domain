/**
 * Created by Xc on 2019/10/15.
 */
const {
    action: commonAction,
    state: commonState,
    decodeAction: decodeCommonAction,
    decodeState: decodeCommonState,
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
} = require('../action');

const state = Object.assign({}, commonState, {
    delivered: 101,
    accepted: 105,
    inRepairing: 111,
    done: 115,
    askingForRestart: 121,
    inRedoing: 125,
    failed: 131,
    cancelled2: 132,
});

const decodeState = (s) => {
    const TEXT = {
        [state.delivered]: '已派单',
        [state.accepted]: '已接单',
        [state.inRepairing]: '维修中',
        [state.done]: '已修好',
        [state.askingForRestart]: '申请重修',
        [state.inRedoing]: '确认重修',
        [state.failed]: '维修失败',
        [state.cancelled2]: '已取消',
    };
    return TEXT[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    confirm: 101,
    accept: 105,
    deliverAgain: 106,
    giveUp: 107,
    startRepairing: 111,
    endRepairing: 115,
    askForRestart: 121,
    restart: 125,
    rejectRepairing: 126,
    surrender: 131,
});

const decodeAction = (s) => {
    const TEXT = {
        [action.confirm]: '确认',
        [action.accept]: '接单',
        [action.deliverAgain]: '再次派单',
        [action.giveUp]: '放弃接单',
        [action.startRepairing]: '开始维修',
        [action.endRepairing]: '结束维修',
        [action.askForRestart]: '申请返修',
        [action.restart]: '再次开始维修',
        [action.rejectRepairing]: '拒绝维修',
        [action.surrender]: '放弃维修',
    };
    return TEXT[s] || decodeCommonAction(s);
};

const CONSTANTS = {
    allowDeliverGap: 30 * 60 * 1000,        // 半小时后才允许主动再次派单
};

const relation = Object.assign({}, commonRelation, {
    worker: 101,        // 技工
});

const decodeRelation = (r) => {
    const TEXT = {
        [relation.worker]: '技工',
    };

    return TEXT[r] || decodeCommonRelation(r);
};


const STATE_TRAN_MATRIX = {
    [action.confirm]: [state.init, state.delivered],
    [action.accept]: [state.delivered, state.accepted],
    [action.deliverAgain]: [state.accepted, state.delivered],
    [action.giveUp]: [state.accepted, state.delivered],
    [action.startRepairing]: [[state.inRedoing, state.accepted], state.inRepairing],
    [action.endRepairing]: [state.inRepairing, state.done],
    [action.askForRestart]: [state.done, state.askingForRestart],
    [action.restart]: [state.askingForRestart, state.inRedoing],
    [action.rejectRepairing]: [state.askingForRestart, state.done],
    [action.surrender]: [[state.inRepairing, state.inRedoing], state.failed],
    [action.expire]: [state.init, state.expired],
    [action.cancel]: [[state.init, state.delivered, state.accepted, state.expired], state.cancelled2],
    [action.complete]: [state.done, state.completed],
};

const giveUpReason = [
    '配件不足',
    '距离太远',
    '时间不对',
    '没有把握',
    '个人有急事',
    '与工厂已协商，放弃维修',
    '其它原因',
];

const deliverAgainReason = [
    '联系不上对方',
    '对方迟到太久',
    '与技工已协商，换人维修',
    '其它原因',
];

const cancelReason = [
    '我只是测试一下',
    '已经自己修好了',
    '暂时不修理',
    '其它原因',
];

const mediaType = {
    'video': 1,
    'image': 2,
    'audio': 3,
};

const decodeMediaType = (m) => {
    const TEXT = {
        [mediaType.video]: '视频',
        [mediaType.image]: '图片',
        [mediaType.audio]: '音频',
    };

    return TEXT[m];
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    CONSTANTS,
    relation,
    decodeRelation,
    STATE_TRAN_MATRIX,

    giveUpReason,
    deliverAgainReason,
    cancelReason,
    decodeMediaType,
    mediaType,
};
