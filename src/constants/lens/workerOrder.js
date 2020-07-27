const {
    action,
    decodeAction,
    state: CommonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = {
    pending: 301,
    solved: 401
};

const decodeState = (s) => {
    const S = {
        [state.pending]: '待处理',
        [state.solved]: '已处理',
    };

    return S[s];
};



module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
};