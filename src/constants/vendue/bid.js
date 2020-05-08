const {
    relation,
    decodeRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = object.assign({}, commonState, {
    active: 301,
    inactive: 311,
});
const decodeState = (s) => {
    const S = {
        active: '最高',
        inactive: '非最高'
    };
    return S[s] || decodeCommonState(s);
};

const action = Object.assign({}, commonAction, {
    cancel: 501,
});

const decodeAction = (a) => {
    const S = {
        [action.cancel]: '撤销',
    };

    return S[a] || decodeCommonAction(a);
};


module.exports = {
    relation,
    decodeRelation,
    state,
    decodeState,
    action,
    decodeAction,
};

