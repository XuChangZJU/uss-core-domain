const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const omit = require('lodash/omit');
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
    enable: 501,
    disable: 511,
});

const decodeAction = (a) => {
    const S = {
        [action.enable]: '启用',
        [action.disable]: '禁用',
    };

    return S[a] || decodeCommonAction(a);
};
const relation = omit(Object.assign({}, commonRelation, {
    worker: 401,
    auctioneer: 402,
    stockKeeper: 403,
    settler: 404,
    stuff: 405,
    freeGranter: 406,
}), ['financial']);


const decodeRelation = (r) => {
    const R = {
        [relation.worker]: '员工',
        [relation.auctioneer]: '拍卖师',
        [relation.stockKeeper]: '库管员',
        [relation.settler]: '结算员',
        [relation.stuff]: '业务员',
        [relation.freeGranter]: '免保授权人',
    };
    return R[r] || decodeCommonRelation(r);
};

const STATE_TRAN_MATRIX = {
    [action.enable]: [state.offline, state.online],
    [action.disable]: [state.online, state.offline],
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
