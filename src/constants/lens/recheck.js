/**
 * Created by Xc on 2020/2/20.
 */
const pick = require('lodash/pick');
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
} = require('../action');

const state = {
    inactive: 2001,          // 待推送
    active: 2002,            // 推送中
    confirmed: 2003,         // 预约已创建
    completed: 2004,         // 复查完成
    expired: 100001,        // 过期
    dead: 100002,
};

const decodeState = (s) => {
    const S = {
        [state.inactive]: '未到复查时间',
        [state.active]: '已到复查时间',
        [state.confirmed]: '已预约',
        [state.completed]: '已完成',
        [state.expired]: '已过期',
        [state.dead]: '已放弃',
    };

    return S[s];
};

const action = Object.assign({}, pick(commonAction, ['create', 'update', 'remove']), {
    activate: 2002,
    confirm: 2003,
    complete: 2004,
    expire: 100001,
    makeDead: 100002,
});

const decodeAction = (a) => {
    const S = {
        [action.activate]: '激活',
        [action.confirm]: '预约',
        [action.complete]: '完成',
        [action.expire]: '过期',
        [action.makeDead]: '放弃',
    };

    return S[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.activate]: [state.inactive, state.active],
    [action.confirm]: [[state.inactive, state.active], state.confirmed],
    [action.complete]: [[state.inactive, state.active, state.confirmed, state.expired], state.completed],
    [action.expire]: [[state.active, state.confirmed], state.expired],
    [action.makeDead]: [state.expired, state.dead],
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};
