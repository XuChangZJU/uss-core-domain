'use strict';

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction,
    state = _require.state,
    decodeState = _require.decodeState,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX;

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
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    COMMON_STATE_TRAN_MATRIX: COMMON_STATE_TRAN_MATRIX
};