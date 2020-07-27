const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    relation,
    decodeRelation,
} = require('../action');

const state = {
    active: 301,
    inactive: 401
};

const decodeState = (s) => {
    const S = {
        [state.active]: '生效中',
        [state.inactive]: '已完成',
    };

    return S[s];
};

const action = Object.assign({},commonAction,{
    complete: 310,
});

const decodeAction = (a) => {
    const S = {
        [action.complete]: '完成',
    };

    return S[a]|| decodeCommonAction(a);
};

const STATE_TRANS_MATRIX = {
    [action.complete]: [state.active, state.inactive],
};

module.exports = {
    relation,
    decodeRelation,
    state,
    decodeState,
    action,
    decodeAction,
};
