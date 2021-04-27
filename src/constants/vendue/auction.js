const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const relation = Object.assign({}, commonRelation, {
    favourite: 301,
});

const decodeRelation = (r) => {
    const R = {
        [relation.favourite]: '收藏',
    };
    return R[r] || decodeCommonRelation(r);
};
const state = Object.assign({}, commonState, {
    // preparing: 301,
    ready: 310,
    ongoing: 311,
    pausing: 312,
    sold: 501,
    unsold: 511,
    breakUp: 601,
    revoke: 610,
});
const decodeState = (s) => {
    const S = {
        // [state.preparing]: '准备中',
        [state.ready]: '预展中',
        [state.ongoing]: '拍卖中',
        [state.sold]: '已成交',
        [state.unsold]: '已流拍',
        [state.breakUp]: '违约',
        [state.pausing]: '暂停',
        [state.revoke]: '撤销',
    };

    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    ready: 501,
    makeReady: 502,
    start: 511,
    restart: 512,
    pause: 513,
    sold: 601,
    unsold: 610,
    breakUp: 701,
    // resold: 611,
    // cancel: 621,
});

const decodeAction = (a) => {
    const S = {
        [action.ready]: '就绪',
        [action.makeReady]: '重新就绪',
        [action.start]: '开拍',
        [action.restart]: '重拍',
        [action.sold]: '成交',
        [action.unsold]: '流拍',
        [action.pause]: '暂停',
        [action.breakUp]: '违约',
        // [action.cancel]: '撤销'
    };

    return S[a] || decodeCommonAction(a);
};

const mode = {
    stock: 1,
    lot: 2,
};

function decodeMode(m) {
    const S = {
        [mode.stock]: '库号命名',
        [mode.lot]: 'Lot号命名',
    };
    return S[m];
};

const STATE_TRAN_MATRIX = {
    [action.ready]: [state.preparing, state.ready],
    [action.start]: [[state.ready, state.pausing], state.ongoing],
    [action.sold]: [state.ongoing, state.sold],
    [action.unsold]: [[state.ongoing, state.sold], state.unsold],
    [action.pause]: [state.ongoing, state.pausing],
    [action.restart]: [state.unsold, state.ongoing],
    [action.makeReady]: [state.unsold, state.ready],
    [action.breakUp]: [state.sold, state.breakUp],
};

const category = {
    guqian: 1,
    yinding: 2,
    jizhibi: 3,
};

const decodeCategory = (c) => {
    const C = {
        [category.guqian]: '古钱',
        [category.yinding]: '银锭',
        [category.jizhibi]: '机制币',
    };
    return C[c];
}
module.exports = {
    relation,
    decodeRelation,
    state,
    decodeState,
    action,
    decodeAction,
    mode,
    decodeMode,
    STATE_TRAN_MATRIX,
    category,
    decodeCategory,
};
