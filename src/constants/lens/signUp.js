const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    // state: commonState,
    decodeState: decodeCommonState,
} = require('../action');


const state = {
    normal: 301,
    cancelled: 401,
    completed: 501,
}

const decodeState = (s) => {
    const S = {
        [state.normal]: '待就诊',
        [state.cancelled]: '已取消',
        [state.completed]: '已完成',
    }
    return S[s] || decodeCommonState(s);
}

const action = Object.assign({}, commonAction, {
    regist: 301,
    cancel: 401,
});

const decodeAction = (a) => {
    const A = {
        [action.regist]: '确认',
        [action.cancel]: '取消',
    }
    return A[a] || decodeCommonAction(a);
}
const STATE_TRANS_MATRIX = {
    [action.regist]: [state.normal, state.completed],
    [action.cancel]: [state.normal, state.cancelled],
};

const {
    category,
    decodeCategory
} = require('./trade');

module.exports = {
    action,
    decodeAction,
    category,
    decodeCategory,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};