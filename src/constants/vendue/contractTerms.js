const {
    action,
    decodeAction,
    state,
    decodeState,
    COMMON_STATE_TRAN_MATRIX
} = require('../action');

/**
 * 合同状态：legal生效的、competed完成的、aborted中止的
 * 合同动作：complete完成，abort中止
 */
// const state = Object.assign({}, commonState, {
//     unsold: 301,
//     sold: 311,
//     settled: 401
// });
// const decodeState = (s) => {
//     const S = {
//         [state.unsold]: '未成交',
//         [state.sold]: '成交',
//         [state.settled]: '已结算',
//     };
//     return S[s] || decodeCommonState(s);
// };
module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    COMMON_STATE_TRAN_MATRIX,
};