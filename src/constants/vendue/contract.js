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

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    COMMON_STATE_TRAN_MATRIX,
};