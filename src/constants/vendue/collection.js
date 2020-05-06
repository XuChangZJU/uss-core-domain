const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
    relation,
    decodeRelation,
} = require('../action');

const state = Object.assign({}, commonState, {
    stored: 301,
    notStored: 302,
});

const decodeState = (s) => {
    const S = {
        [state.stored]: '已入库',
        [state.notStored]: '未入库',
    };
    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    inStore: 301,
    outStore: 302,
});

const decodeAction = (a) => {
    const A = {
        [action.inStore]: '入库',
        [action.outStore]: '出库',
    };
    return A[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.inStore]: [state.notStored, state.stored],
    [action.outStore]: [state.stored, state.notStored],
};

module.exports = {
    relation,
    decodeRelation,
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRANS_MATRIX,
};