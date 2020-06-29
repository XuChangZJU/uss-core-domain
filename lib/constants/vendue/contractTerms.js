'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState,
    COMMON_STATE_TRAN_MATRIX = _require.COMMON_STATE_TRAN_MATRIX;

/**
 * 合同状态：legal生效的、competed完成的、aborted中止的
 * 合同动作：complete完成，abort中止
 */


var state = Object.assign({}, commonState, {
    unsold: 301,
    sold: 311,
    settled: 401
});
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.unsold, '未成交'), _defineProperty(_S, state.sold, '成交'), _defineProperty(_S, state.settled, '已结算'), _S);
    return S[s] || decodeCommonState(s);
};
module.exports = {
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    COMMON_STATE_TRAN_MATRIX: COMMON_STATE_TRAN_MATRIX
};