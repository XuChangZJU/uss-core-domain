const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    // state: commonState,
    // decodeState: decodeCommonState,
    relation,
    decodeRelation,
} = require('../action');

const action = Object.assign({}, commonAction, {
    refund: 1001,
});

const decodeAction = (a) => {
    const Dict = {
        [action.refund]: '退款',
    };

    return Dict[a] || decodeCommonAction(a);
};

// const state = Object.assign({}, commonState, {
//     unsettled: 501,
//     settled: 511,
//     breakUp: 601,
// });
//
// const decodeState = (s) => {
//     const S = {
//         [state.unsettled]: '未结算',
//         [state.settled]: '已结算',
//         [state.breakUp]: '违约',
//     };
//
//     return S[s] || decodeCommonState(s);
// };
function isPaddleOnline(number){
    const maxOfflineNum = 10000;
    return ( number > maxOfflineNum);
}
module.exports = {
    relation,
    decodeRelation,
    // state,
    // decodeState,
    action,
    decodeAction,
    isPaddleOnline,
};