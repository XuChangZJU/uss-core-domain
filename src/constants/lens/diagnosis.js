/**
 * Created by Xc on 2020/2/20.
 */
const { action: commonAction, decodeAction: decodeCommonAction } = require('../action');
const state = {
    noTrade: 301,
    hasTrade: 310,
    expired: 511,
};
const category = {
    '配镜': 1,
    '角膜塑形镜': 2,
    '成镜': 3,
    '耗品': 4,
    '视训': 5,
    '配镜复查': 6,
    '角膜塑形镜复查': 7,
    '视训复查': 8,
}
const decodeCategory = (c) => {
    const C = {
        [category.成镜]: 1,
        [category.角膜塑形镜]: 2,
        [category.成镜]: 3,
        [category.耗品]: 4,
        [category.视训]: 5,
        [category.配镜复查]: 6,
        [category.角膜塑形镜复查]: 7,
        [category.视训复查]: 8,
    }
    return C[c];
}
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
    category,
    decodeCategory,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};
