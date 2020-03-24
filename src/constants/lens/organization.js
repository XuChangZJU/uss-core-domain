const {
    relation,
    decodeRelation,
} = require('../action');

const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX: COMMON_STATE_TRANS_MATRIX,
} = require('./common');

const action = Object.assign({}, commonAction, {
    bind: 1001,
    unbind: 1002,
});

const decodeAction = (a) => {
    const TEXT = {
        [action.bind]: '绑定',
        [action.unbind]: '解绑',
    };
    return TEXT[a] || decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = Object.assign({}, COMMON_STATE_TRANS_MATRIX, {
    [action.bind]: [state.init, state.online],
    [action.unbind]: [state.online, state.offline],
});

module.exports = {
    relation,
    decodeRelation,
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRANS_MATRIX,
};
