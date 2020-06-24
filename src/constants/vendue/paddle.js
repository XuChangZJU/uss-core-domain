const {
    action,
    decodeAction,
    // state: commonState,
    // decodeState: decodeCommonState,
    relation,
    decodeRelation,
} = require('../action');


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
function isPaddleOnline(paddleId){
    const maxOfflineNum = 10000;
    return (paddleId > maxOfflineNum);
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