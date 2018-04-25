/**
 * Created by Administrator on 2016/12/25.
 */
'use strict';

const state = {
    init: 0,
    refunding2: 98,
    refunding: 99,
    refunded: 201,
    uncertain: 899,
    failed: 999,
    unexisted: 1099,            // 这个是为了统一化处理外部返回结果
};

const STRING_OF_STATES = {
    [state.init]: "初始化",
    [state.refunding]: "退款中",
    [state.refunding2]: "渠道退款中",
    [state.refunded]: "退款完成",
    [state.uncertain]: "未知",
    [state.failed]: "退款失败",
    [state.unexisted]: '退款不存在',
};

const decodeState = (s) => {
    return STRING_OF_STATES[s]
};

module.exports = {
    state,
    decodeState,
};
