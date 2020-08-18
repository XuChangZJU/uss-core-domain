/**
 * Created by Xc on 2020/2/20.
 */
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    } = require('../action');

const state = {
    noTrade: 301,
    hasTrade: 310,
    expired: 511,
};
const category = {
    'makeGlasses': 1,
    'OKGlasses': 2,
    'DoneGlasses': 3,
    'consumables': 4,
    'visionTraining': 5,
    'makeGlassesRecheck': 6,
    'OKGlassesRecheck': 7,
    'visionTraining': 8,
}
const decodeCategory = (c) => {
    const C = {
        [category.makeGlasses]: 1,
        [category.OKGlasses]: 2,
        [category.DoneGlasses]: 3,
        [category.consumables]: 4,
        [category.visionTraining]: 5,
        [category.makeGlassesRecheck]: 6,
        [category.OKGlassesRecheck]: 7,
        [category.visionTraining]: 8,
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

const relation = Object.assign({}, commonRelation, {
    seller: 1001,        // 营业员
});

const decodeRelation = (r) => {
    const T = {
        [relation.seller]: '营业员',
    };

    return T[r] || decodeCommonRelation(r);
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
    relation,
    decodeRelation,
    STATE_TRANS_MATRIX,
};
