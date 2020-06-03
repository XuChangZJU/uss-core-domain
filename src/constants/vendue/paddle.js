const {
    action,
    decodeAction,
    state: commonState,
    decodeState: decodeCommonState,
    relation,
    decodeRelation,
} = require('../action');


const state = Object.assign({}, commonState, {
    unsettled: 501,
    settled: 511,
});

const decodeState = (s) => {
    const S = {
        [state.unsettled]: '未结算',
        [state.settled]: '已结算',
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