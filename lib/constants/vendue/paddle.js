'use strict';

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation;

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


function isPaddleOnline(number) {
    var maxOfflineNum = 10000;
    return number > maxOfflineNum;
}
module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    // state,
    // decodeState,
    action: action,
    decodeAction: decodeAction,
    isPaddleOnline: isPaddleOnline
};