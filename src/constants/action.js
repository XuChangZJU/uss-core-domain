/**
 * Created by Administrator on 2018/7/18.
 */
// 全局抽象的动作 0-1000
const action = {
    create: 1,
    update: 2,
    remove: 3,
    grant: 11,
    revoke: 12,
    abandon: 13,
    confirmToPay: 31,       // 确认下单
    cancel: 32,             // 取消
    pay: 33,                  // 支付
    abort: 34,                  // 中断
    expire: 35,             // 过期
    makePaid: 36,           // 管理员确认支付
};

// 全局抽象的关系 0-1000
const relation = {
    owner: 1,
};

// 全局抽象的状态 0 - 100
const state = {
    init: 1,
    unpaid: 10,
    legal: 20,
    expired: 30,
    aborted: 40,
    cancelled: 50,
};

const decodeState = (s) => {
    const STRINGS = {
        [state.init]: '初始的',
        [state.unpaid]: '待支付的',
        [state.legal]: '生效的',
        [state.expired]: '过期的',
        [state.aborted]: '中止的',
        [state.cancelled]: '取消的',
    }
};

const decodeAction = (a) => {
    const STRINGS = {
        [action.create]: '创建',
        [action.update]: '更新数据',
        [action.remove]: '删除',
        [action.grant]: '授予',
        [action.revoke]: '回收',
        [action.abandon]: '放弃',
        [action.confirmToPay]: '确认下单',
        [action.pay]: '支付成功',
        [action.cancel]: '取消支付',
        [action.abort]: '中止',
        [action.expire]: '过期',
        [action.makePaid]: '自动支付',
    };

    return STRINGS[a];
};

const decodeRelation = (r) => {
    const STRINGS = {
        [relation.owner]: '所有者',
    };
    return STRINGS[r];
}

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    relation,
    decodeRelation,
};
