const {
    relation,
    decodeRelation,
    action,
    decodeAction,
    state: commonState,
    decodeState: decodeCommonState,
} = require('../action');

const state = Object.assign({}, commonState, {
    active: 301,
    inactive: 311,
    succeed: 401,
});
const decodeState = (s) => {
    const S = {
        active: '进行中',
        inactive: '已完成',
        succeed: '成交',
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

