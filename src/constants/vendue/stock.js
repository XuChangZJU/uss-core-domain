const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = Object.assign({}, commonState, {
    stored: 301,
    notStored: 302,
    sold: 401,
    returned:402,
});

const decodeState = (s) => {
    const S = {
        [state.stored]: '已入库',
        [state.notStored]: '未入库',
        [state.sold]: '已售出',
        [state.returned]: '已退还'
    };
    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    inStore: 301,
    outStore: 302,
    sell: 401,
    return: 402,
});

const decodeAction = (a) => {
    const A = {
        [action.inStore]: '入库',
        [action.outStore]: '出库',
        [action.sell]: '售出',
        [action.return]: '退还',
    };
    return A[a] || decodeCommonAction(a);
};

const STATE_TRAN_MATRIX = {
    [action.inStore]: [state.notStored, state.stored],
    [action.outStore]: [state.stored, state.notStored],
    [action.sell]: [state.stored, state.sold],
    [action.return]: [state.stored, state.returned],
};

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRAN_MATRIX,
};