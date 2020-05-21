const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = object.assign({}, commonState, {
    preparing: 301,
    ready: 310,
    ongoing: 311,
    finished: 401,
    pausing: 410,
});
const decodeState = (s) => {
    const S = {
        [state.preparing]: '准备中',
        [state.ready]: '就绪',
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
const relation = Object.assign({}, commonRelation, {
    guardian: 101,
    worker: 102,
    administrator: 110
});

const decodeRelation = (r) => {
    const R = {
        [relation.guardian]: '守护者',
        [relation.worker]: '员工',
        [relation.administrator]: '管理员',
    };
    return R[r] || decodeCommonRelation(r);
};
const decodeAction = (a) => {
    const S = {
        [action.ready]: '就绪',
        [action.start]: '开始',
        [action.finish]: '结束',
        [action.pause]: '暂停',
    };

    return S[a] || decodeCommonAction(a);
};

const STATE_TRAN_MATRIX = {
    [action.ready]: [state.preparing, state.ready],
    [action.start]: [[state.ready, state.pausing], state.ongoing],
    [action.finish]: [[state.ongoing, state.pausing], state.finished],
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
