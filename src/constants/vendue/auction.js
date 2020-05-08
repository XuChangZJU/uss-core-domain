const {
    relation,
    decodeRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = object.assign({}, commonState, {
    preparing: 301,
    ready: 310,
    ongoing: 311,
    sold: 501,
    unsold: 511,
});
const decodeState = (s) => {
    const S = {
        [state.preparing]: '准备中',
        [state.ready]: '就绪',
        [state.ongoing]: '拍卖中',
        [state.sold]: '成交',
        [state.unsold]: '流拍',
    };

    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    ready: 501,
    start: 511,
    sold: 601,
    unsold: 610,
    resold: 611,
});

const decodeAction = (a) => {
    const S = {
        [action.ready]: '就绪',
        [action.start]: '开拍',
        [action.sold]: '成交',
        [action.unsold]: '流拍',
        [action.resold]: '重拍',
    };

    return S[a] || decodeCommonAction(a);
};

const STATE_TRAN_MATRIX = {
    [action.ready]: [state.preparing, state.ready],
    [action.start]: [state.ready, state.ongoing],
    [action.sold]: [state.ongoing, state.sold],
    [action.unsold]: [state.ongoing, state.unsold],
    [action.resold]: [state.unsold, state.ongoing],
};

module.exports = {
    relation,
    decodeRelation,
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRAN_MATRIX,
};
