const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    relation,
    decodeRelation
} = require('../action');

const state = {
    unbinded: 301,
    binded: 310,
    expired: 511,
};

const decodeState = (s) => {
    const S = {
        [state.unbinded]: '未绑定',
        [state.binded]: '已绑定',
        [state.expired]: '已过期',
    };

    return S[s];
};

const action = Object.assign({}, commonAction ,{
    bind: 310,
    expire: 511,
});

const decodeAction = (a) => {
    const S = {
        [action.bind]: '绑定',
        [action.expire]: '过期',
    };

    return S[a]||decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.bind]: [state.unbinded, state.binded],
    [action.expire]: [state.unbinded, state.expired],
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
    relation,
    decodeRelation,
};
