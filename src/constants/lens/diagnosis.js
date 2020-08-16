/**
 * Created by Xc on 2020/2/20.
 */
const { action: commonAction, decodeAction: decodeCommonAction } = require('../action');
const state = {
    noTrade: 301,
    hasTrade: 310,
    expired: 511,
};

const decodeState = (s) => {
    const S = {
        [state.noTrade]: '无交易',
        [state.hasTrade]: '有交易',
        [state.expired]: '已过期',
    };

    return S[s];
};

const action = Object.assign({},commonAction,{
    expire: 320,
});

const decodeAction = (a) => {
    const S = {
        [action.expire]: '过期',
    };

    return S[a]|| decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.expire]: [state.noTrade, state.expired],
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};
