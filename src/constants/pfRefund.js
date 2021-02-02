'use strict';

const state = {
    refunding: 10001,
    refunded: 10201,
    cancelled: 10899,
    abnormal: 11001,
};

const decodeState = (s) => {
    const TEXT = {
        [state.refunding]: "退款中",
        [state.refunded]: "退款完成",
        [state.cancelled]: "已取消",
        [state.abnormal]: "退款异常",
    };
    
    return TEXT[s]
};

const action = {
    refundSuccess: 10201,
    refundManually: 10202,
    refundFailure: 11001,
    cancel: 10899,
};

const decodeAction = (a) => {
    const TEXT = {
        [action.refundSuccess]: '退款成功',
        [action.refundFailure]: '退款失败',
        [action.refundManually]: '手动退款完成',
        [action.cancel]: '退款异常',
    };

    return TEXT[a];
};

const STATE_TRANS_MATRIX = {
    [action.refundSuccess]: [state.refunding, state.refunded],
    [action.refundFailure]: [state.refunding, state.abnormal],
    [action.cancel]: [state.refunding, state.cancelled],
    [action.refundManually]: [state.abnormal, state.refunded],
};

const channel = {
    // 微信电商收付通部分
    original: 1,
    balance: 2,
    otherBalance: 3,
    otherBankCard: 4,    
};

const decodeChannel = (c) => {
    const TEXT = {
        [channel.original]: '原路退回',
        [channel.balance]: '退到余额',
        [channel.otherBalance]: '退到其他余额帐户',
        [channel.otherBankCard]: '退到其他银行帐户',
    };

    return TEXT[c];
}

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRANS_MATRIX,

    channel,
    decodeChannel,
};
