/**
 * Created by Xc on 2020/2/20.
 */
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,

} = require('../action');
const state = Object.assign({}, commonState,{
    inactive: 2001,          // 待推送
    active: 2002,            // 推送中
    confirmed: 2003,         // 用户已确认
    completed: 2004,         // 复查完成
    expired: 100001,        // 过期
    killed: 100010,         // 用户已回绝
});

const decodeState = (s) => {
    const S = {
        [state.inactive]: '未到复查时间',
        [state.active]: '已到复查时间',
        [state.confirmed]: '已确认',
        [state.completed]: '已完成',
        [state.expired]: '已过期',
        [state.killed]: '已回绝'
    };

    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    activate: 2002,
    confirm: 2003,
    complete: 2004,
    expire: 2005,
    kill: 2006,
});

const decodeAction = (a) => {
    const S = {
        [action.activate]: '激活',
        [action.confirm]: '确认',
        [action.complete]: '完成',
        [action.expire]: '过期',
        [action.kill]: '回绝',
    };

    return S[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.activate]: [state.inactive, state.active],
    [action.confirm]: [state.active, state.confirmed],
    [action.complete]: [[state.inactive, state.active, state.confirmed, state.expired, state.killed], state.confirmed],
    [action.expire]: [[state.active, state.confirmed], state.expired],
    [action.kill]: [state.expired, state.killed]
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};
