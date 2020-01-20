/**
 * Created by Administrator on 2020/1/20.
 */

const state = {
    alive: 101,
    completed: 111,
};

const decodeState = (s) => {
    const S = {
        [state.alive]: '打卡中',
        [state.completed]: '已结束',
    };

    return S[s];
};

const action = {
    complete: 111,
};

const decodeAction = (a) => {
    const S = {
        [action.complete]: '结束',
    };

    return S[a];
};


const STATE_TRAN_MATRIX = {
    [action.complete]: [state.alive, state.completed],
};

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRAN_MATRIX,
};
