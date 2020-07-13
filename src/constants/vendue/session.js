const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = Object.assign({}, commonState, {
    preparing: 301,
    ready: 310,
    ongoing: 311,
    finished: 401,
    pausing: 410,
});
const decodeState = (s) => {
    const S = {
        // [state.preparing]: '准备中',
        [state.ready]: '预展中',
        [state.ongoing]: '进行中',
        [state.finished]: '已结束',
        [state.pausing]: '暂停中'
    };

    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    ready: 501,
    start: 511,
    finish: 601,
    pause: 610,
});

const decodeAction = (a) => {
    const S = {
        // [action.ready]: '就绪',
        [action.start]: '开始',
        [action.finish]: '结束',
        [action.pause]: '暂停',
    };

    return S[a] || decodeCommonAction(a);
};
const relation = Object.assign({}, commonRelation, {
    administrator: 201,
    worker: 301,
    auctioneer: 302,
});

const decodeRelation = (r) => {
    const R = {
        [relation.worker]: '员工',
        [relation.administrator]: '管理员',
        [relation.auctioneer]: '拍卖师',
    };
    return R[r] || decodeCommonRelation(r);
};
const STATE_TRAN_MATRIX = {
    // [action.ready]: [state.preparing, state.ready],
    [action.start]: [[state.ready,state.pausing], state.ongoing],
    [action.finish]: [[state.ready, state.ongoing, state.pausing], state.finished],
    [action.pause]: [state.ongoing, state.pausing],
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
