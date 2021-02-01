const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = Object.assign({}, commonState, {
    online: 501,
    offline: 511,
});

const decodeState = (s) => {
    const S = {
        [state.online]: '使用中',
        [state.offline]: '已停用',
    };
    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    enable: 1301,
    disable: 1302,
});

const decodeAction = (a) => {
    const A = {
        [action.enable]: '启用',
        [action.disable]: '禁用',
    };
    return A[a] || decodeCommonAction(a);
};

const relation = Object.assign({}, commonRelation, {
    // owner
    service: 401,
});

const decodeRelation = (r) => {
    const R = {
        [relation.service]: '客服',
    };
    return R[r] || decodeCommonRelation(r);
};

const STATE_TRANS_MATRIX = {
    [action.enable]: [state.offline, state.online],
    [action.disable]: [state.online, state.offline],
};
module.exports = {
    relation,
    decodeRelation,
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};