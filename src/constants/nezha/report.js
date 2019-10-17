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
    surrender: 131,
});

const decodeAction = (a) => {
    const TEXT = {
        [action.confirm]: '确认',
        [action.accept]: '接单',
        [action.deliverAgain]: '再次派单',
        [action.giveUp]: '放弃接单',
        [action.startRepairing]: '开始维修',
        [action.endRepairing]: '结束维修',
        [action.askForRestart]: '申请返修',
        [action.restart]: '再次开始维修',
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

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    CONSTANTS,
    relation,
    decodeRelation,
};
