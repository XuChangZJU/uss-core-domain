/**
 * Created by Xc on 2020/2/20.
 */
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
} = require('../action');

const state = {
    pending: 301,
    processing: 401,
    completed: 501,
};

const decodeState = (s) => {
    const S = {
        [state.pending]: '待处理',
        [state.processing]: '处理中',
        [state.completed]: '已完成',
    };

    return S[s];
};

const action = Object.assign({}, commonAction, {
    manage: 301,
});

const decodeAction = (a) => {
    const S = {
        [action.manage]: '处理',
    };

    return S[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.manage]: [state.processing, state.pending],
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};
