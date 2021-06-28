const {
    action: commonAction,
    decodeAction: decodeCommonAction,
} = require('../action');

const {
    category,
    decodeCategory
} = require('./trade');

const state = {
    ongoing: 301,
    finished: 401,
    cancelled: 501,
}
const decodeState = (s) => {
    const S = {
        [state.ongoing]: '进行中',
        [state.finished]: '已结束',
        [state.cancelled]: '已取消'
    };
    return S[s];

}
const action = Object.assign({},commonAction,{
    cancel: 301,
    restart: 401,
    finish: 501,
});

const decodeAction = (a) => {
    const A = {
        [action.cancel]: '取消',
        [action.restart]: '重新开始',
        [action.finish]: '完成',
    };

    return A[a]|| decodeCommonAction(a);
};
const STATE_TRANS_MATRIX = {
    [action.cancel]: [state.ongoing, state.cancelled],
    [action.restart]: [state.cancelled, state.ongoing],
    [action.finish]: [state.ongoing, state.finished],
};

module.exports = {
    action,
    category,
    decodeCategory,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
};