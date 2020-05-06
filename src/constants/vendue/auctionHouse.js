const {
    relation,
    decodeRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

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

const STATE_TRANS_MATRIX = {
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
    STATE_TRANS_MATRIX,
};
