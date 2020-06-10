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
    // pausing: 410,
    // aborted: 411,
});
const category = Object.assign({}, {
    pureOnline: 1,
    offline: 2,
    delayed: 3,
});

const STRINGS_OF_ORIGINS = {
    [category.pureOnline]: "纯线上",
    [category.offline]: "线下",
    [category.delayed]: "延时拍",
};

function decodeCategory(o) {
    return STRINGS_OF_ORIGINS[o];
}
const decodeState = (s) => {
    const S = {
        [state.preparing]: '准备中',
        [state.ready]: '已就绪',
        [state.ongoing]: '进行中',
        [state.finished]: '已结束',
        // [state.pausing]: '暂停中',
        // [state.stopped]: '已中断'
    };

    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    ready: 501,
    start: 511,
    finish: 601,
    // pause: 610,
    // stop: 611,
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
        // [action.pause]: '暂停',
        // [action.stop]: '停止',
    };

    return S[a] || decodeCommonAction(a);
};

const STATE_TRAN_MATRIX = {
    [action.ready]: [state.preparing, state.ready],
    [action.start]: [state.ready, state.ongoing],
    [action.finish]: [state.ongoing, state.finished],
    // [action.pause]: [state.ongoing, state.pausing],
    // [action.stop]: [[state.preparing, state.ready, state.ongoing, state.pausing], state.stopped],
};

module.exports = {
    relation,
    decodeRelation,
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRAN_MATRIX,
    category,
    decodeCategory,
};
