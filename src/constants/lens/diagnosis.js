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
    fitted: 310,
    unfitted: 301,
    expired: 511,
};
const category = {
    'normal': 1,
    'OKGlasses': 2,
    'check': 3,
}
const decodeCategory = (c) => {
    const C = {
        [category.normal]: '普通业务',
        [category.OKGlasses]: '角膜塑形镜业务',
        [category.check]: '检查'
    }
    return C[c];
}
const decodeState = (s) => {
    const S = {
        [state.unfitted]: '价格不匹配',
        [state.fitted]: '价格匹配',
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
    doctor: 1002
});

const decodeRelation = (r) => {
    const T = {
        [relation.seller]: '营业员',
        [relation.doctor]: '业务扩展人员',
    };

    return T[r] || decodeCommonRelation(r);
};

const STATE_TRANS_MATRIX = {
    [action.expire]: [state.unfitted, state.expired],
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
