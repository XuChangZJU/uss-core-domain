/**
 * Created by Administrator on 2018/7/18.
 */
// 全局抽象的动作 0-1000
const action = {
    create: 1,
    update: 2,
    remove: 3,

    authGrant: 11,
    authRevoke: 12,
    authAbandon: 13,
    // authExpire: 14,
    authConfirm: 15,

    transfer: 21,           // 转让

    confirmToPay: 31,       // 确认下单
    cancel: 32,             // 取消
    pay: 33,                  // 支付
    abort: 34,                  // 中断
    payExpire: 35,             // 过期
    makePaid: 36,           // 管理员确认支付
};

// 全局抽象的关系 0-1000
const relation = {
    owner: 1,
    grantee: 11,        // 被授权者（泛义上的)
};

// 全局抽象的状态 0 - 100
const state = {
    init: 1,

    // pay相关的
    unpaid: 31,
    legal: 32,
    aborted: 34,
    cancelled: 35,
    cantPaid: 36,           // 当unpaid的支付因为某个实体的状态暂时无法支付时可以使用这个状态储存一下（比如相关产品没有库存了）

    // userEntityGrant相关的
    confirmed: 1001,

    // 公共的
    expired: 100001,
};

const decodeState = (s) => {
    const STRINGS = {
        [state.init]: '初始的',

        [state.unpaid]: '待支付的',
        [state.legal]: '生效的',
        [state.aborted]: '中止的',
        [state.cancelled]: '取消的',
        [state.cantPaid]: '暂不可支付的',

        [state.confirmed]: '确认的',
        [state.expired]: '过期的',
    }
};

const decodeAction = (a) => {
    const STRINGS = {
        [action.create]: '创建',
        [action.update]: '更新数据',
        [action.remove]: '删除',

        [action.authGrant]: '授予权限',
        [action.authRevoke]: '回收权限',
        [action.authAbandon]: '放弃权限',
        // [action.authExpire]: '过期权限',
        [action.authConfirm]: '确认权限',

        [action.transfer]: '转让',

        [action.confirmToPay]: '确认下单',
        [action.pay]: '支付成功',
        [action.cancel]: '取消支付',
        [action.abort]: '中止',
        [action.payExpire]: '过期',
        [action.makePaid]: '自动支付',
    };

    return STRINGS[a];
};

const decodeRelation = (r) => {
    const STRINGS = {
        [relation.owner]: '所有者',
        [relation.grantee]: '被授权者',
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
