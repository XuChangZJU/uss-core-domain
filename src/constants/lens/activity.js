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
const decodeState = {
    [state.ongoing]: '进行中',
    [state.finished]: '已结束',
    [state.cancelled]: '已取消'
}
const action = Object.assign({},commonAction,{
    cancel: 301,
    restart: 401,
});

const decodeAction = (a) => {
    const A = {
        [action.restart]: '重新开始',
    };

    return A[a]|| decodeCommonAction(a);
};
const STATE_TRANS_MATRIX = {
    [action.cancel]: [state.ongoing, state.cancelled],
    [action.restart]: [state.cancelled, state.ongoing],
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