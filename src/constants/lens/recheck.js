/**
 * Created by Xc on 2020/2/20.
 */
const { action: commonAction, decodeAction: decodeCommonAction } = require('../action');
const state = {
    inactive: 2001,          // 待推送
    active: 2002,            // 推送中
    confirmed: 2003,         // 用户已确认
    completed: 2004,         // 复查完成
    expired: 100001,          // 过期
};

const decodeState = (s) => {
    const S = {
        [state.inactive]: '未到期',
        [state.active]: '已到期',
        [state.confirmed]: '已确认',
        [state.completed]: '已完成',
        [state.expired]: '已过期'
    };

    return S[s];
};

const action = {
    activate: 2002,
    confirm: 2003,
    complete: 2004,
    expire: 2005,
};

const decodeAction = (a) => {
    const S = {
        [action.activate]: '激活',
        [action.confirm]: '确认',
        [action.complete]: '完成',
        [action.expire]: '过期',
    };

    return S[a];
};

const STATE_TRANS_MATRIX = {
    [action.activate]: [state.inactive, state.active],
    [action.confirm]: [state.active, state.confirmed],
    [action.complete]: [[state.inactive, state.active, state.confirmed, state.expired], state.confirmed],
    [action.expire]: [[state.active, state.confirmed], state.expired],
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};
