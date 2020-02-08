/**
 * Created by Administrator on 2020/1/20.
 */
const { action: commonAction, decodeAction: decodeCommonAction } = require('../action');
const state = {
    inactive: 81,
    alive: 101,
    completed: 111,
};

const decodeState = (s) => {
    const S = {
        [state.inactive]: '尚未开始',
        [state.alive]: '打卡中',
        [state.completed]: '已结束',
    };

    return S[s];
};

const action = Object.assign({}, commonAction, {
    wakeUp: 101,
    complete: 111,
});

const decodeAction = (a) => {
    const S = {
        [action.wakeUp]: '唤醒',
        [action.complete]: '结束',
    };

    return S[a] || decodeCommonAction(a);
};


const STATE_TRAN_MATRIX = {
    [action.wakeUp]: [state.inactive, state.alive],
    [action.complete]: [state.alive, state.completed],
};

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRAN_MATRIX,
};
