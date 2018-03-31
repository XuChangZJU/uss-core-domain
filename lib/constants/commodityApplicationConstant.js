/**
 * Created by Administrator on 2017/1/16.
 */
"use strict";

const state = {
    init: 1,
    inShopCart: 2,
    unpaid: 5,
    paid: 10,
    gettingRidOf: 20,
    sending: 30,
    sendingProblem: 40,
    confirmed: 50,
    applyingForRefunding: 60,
    refunding: 70,
    refunded: 201,
    closed: 501,
    finished: 901,
    changing: 911
};

const STRING_OF_STATES = {
    [state.init]: "初始",
    [state.inShopCart]: "购物车中",
    [state.unpaid]: "未支付",
    [state.paid]: "已支付",
    [state.gettingRidOf]: "备货中",
    [state.sending]: "等待收货",
    [state.sendingProblem]: "收货异常处理中",
    [state.confirmed]: "已确认",
    [state.applyingForRefunding]: "申请退款处理中",
    [state.refunding]: "退款中",
    [state.refunded]: "退款成功",
    [state.closed]: "已关闭",
    [state.finished]: "已完成",
    [state.changing]: "更换中"
};

const decodeState = s => {
    return STRING_OF_STATES[s];
};

const relationState = {
    avail: 1, //  可分享
    root: 2, //  可分享（管理员添加）
    init: 200, //  不可分享，等待购买
    refunded: 201, // 不可分享（订单已退款）
    unavailable: 202, // 不可分享（商品已下架）
    disabled: 203, // 不可分享（用户被禁用及其它）
    outDated: 204 // 不可分享（过期）
};

const decodeRelationState = s => {
    const STRING_OF_RS = {
        [relationState.init]: '等待购买',
        [relationState.avail]: '可分享',
        [relationState.root]: 'VIP',
        [relationState.refunded]: '已退款',
        [relationState.unavailable]: '已下架',
        [relationState.disabled]: '已禁止',
        [relationState.outDated]: '已过期'
    };

    return STRING_OF_RS[s];
};

const bonusType = {
    level1: 1,
    level2: 2
};

const decodeBonusType = b => {
    const STRING = {
        [bonusType.level1]: '直接',
        [bonusType.level2]: '次级'
    };

    return STRING[b];
};

const bonusState = {
    paid: 1,
    extractable: 101,
    refunded: 201
};

const decodeBonusState = s => {
    const STRING = {
        [bonusState.paid]: '已结算',
        [bonusState.extractable]: '可提取',
        [bonusState.refunded]: '已退款'
    };
    return STRING[s];
};

const evaluate = {
    good: 2,
    neutral: 1,
    bad: 0
};

const decodeEvaluate = r => {
    const STRING = {
        [evaluate.good]: '好评',
        [evaluate.neutral]: '中评',
        [evaluate.bad]: '差评'
    };
    return STRING[r];
};

module.exports = {
    state,
    decodeState,
    relationState,
    decodeRelationState,
    bonusType,
    decodeBonusType,
    bonusState,
    decodeBonusState,
    evaluate,
    decodeEvaluate
};