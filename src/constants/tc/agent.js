const {
    relation,
    decodeRelation,
    action,
    decodeAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = Object.assign({}, commonState, {
    normal: 301,
    success: 401,
    failed: 501,
});

const decodeState = (s) => {
    const S = {
        [state.normal]: '生效中',
        [state.success]: '成功',
        [state.failed]: '失败',
    };

    return S[s] || decodeCommonState(s);
};


module.exports = {
    relation,
    decodeRelation,
    state,
    decodeState,
    action,
    decodeAction,
};
