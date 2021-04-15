const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = Object.assign({}, commonState, {
    intelligentResponse: 501,
    inDialogue: 502,
    finished: 503,
});

const decodeState = (s) => {
    const S = {
        [state.intelligentResponse]: '智能回复中',
        [state.inDialogue]: '对话中',
        [state.finished]: '对话结束',
    };
    return S[s] || decodeCommonState(s);
}

const action = Object.assign({}, commonAction, {
    toManualService: 1401,
    finish: 1402,
});

const decodeAction = (a) => {
    const A = {
        [action.toManualService]: '转人工服务',
        [action.finish]: '结束',
    };
    return A[a] || decodeCommonAction(a);
}

const relation = Object.assign({}, commonRelation, {
    customer: 401,
    service: 402,
});

const decodeRelation = (r) => {
    const R = {
        [relation.customer]: '客户',
        [relation.service]: '客服',
    };
    return R[r] || decodeCommonRelation(r);
}

const STATE_TRAN_MATRIX = {
    [action.toManualService]: [state.intelligentResponse, state.inDialogue],
    [action.finish]: [state.inDialogue, state.finished],
}

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    relation,
    decodeCommonRelation,
    STATE_TRAN_MATRIX,
}