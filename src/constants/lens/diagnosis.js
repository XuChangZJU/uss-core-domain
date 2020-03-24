/**
 * Created by Xc on 2020/2/20.
 */
const { action: commonAction, decodeAction: decodeCommonAction } = require('../action');
const state = {
    active: 301,
    completed: 310,
    expired: 511,
};

const decodeState = (s) => {
    const S = {
        [state.active]: '诊疗中',
        [state.completed]: '已完成',
        [state.expired]: '已过期',
    };

    return S[s];
};

const action = Object.assign({},commonAction,{
    complete: 310,
});

const decodeAction = (a) => {
    const S = {
        [action.complete]: '完成',
        [action.expire]: '结束',
    };

    return S[a]|| decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.complete]: [state.active, state.completed],
    [action.expire]: [state.active, state.expired],
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};
