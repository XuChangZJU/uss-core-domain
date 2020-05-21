const {
    relation,
    decodeRelation,
    action,
    decodeAction,
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



module.exports = {
    relation,
    decodeRelation,
    state,
    decodeState,
    action,
    decodeAction,
};

