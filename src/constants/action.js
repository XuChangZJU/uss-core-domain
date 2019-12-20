/**
 * Created by Administrator on 2018/7/18.
 */
// 全局抽象的动作 0-1000
const action = {
    create: 1,
    update: 2,
    remove: 3,
    createSub: 4,

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
    expire: 35,             // 过期
    makePaid: 36,           // 管理员确认支付
    abandon: 37,            // 卖方主动中止
    complete: 38,           // 完成
    abort2: 39,             // 中止（异步）
    abandon2: 40,           // 卖方主动中止（异步）
    abort2Success: 41,       // 异步中止成功
    abandon2Success: 42,     // 异步中止成功

    send: 61,                 // 发货（后续状态sent）
    reject: 62,              // 拒绝（后续状态rejected）
    apply: 65,              // 申请（后续状态applied）
    agree: 66,              // 同意（后续状态agreed
};

// 全局抽象的关系 0-1000
const relation = {
    owner: 1,
    manager: 2,         // 管理员
    grantee: 11,        // 被授权者（泛义上的)
};

// 全局抽象的状态 0 - 100
const   state = {
    init: 1,

    // pay相关的
    unpaid: 31,
    legal: 32,
    aborted: 34,            // 支付后取消
    cancelled: 35,          // 未支付放弃
    cantPaid: 36,           // 当unpaid的支付因为某个实体的状态暂时无法支付时可以使用这个状态储存一下（比如相关产品没有库存了）
    abandoned: 37,          // 卖方中止（pay在外部结算）

    aborting: 38,
    abandoning: 39,

    refunding: 51,
    refunded: 52,

    // 发货相关
    sent: 61,               // 已发货
    rejected: 62,           // 拒签收
    // 申请相关
    applied: 65,
    agreed: 66,


    // userEntityGrant相关的
    confirmed: 1001,

    // 公共的
    expired: 100001,
    completed: 100002,
};

const decodeState = (s) => {
    const STRINGS = {
        [state.init]: '初始的',

        [state.unpaid]: '待支付的',
        [state.legal]: '生效的',
        [state.aborted]: '中止的',
        [state.cancelled]: '取消的',
        [state.cantPaid]: '暂不可支付的',
        [state.refunding]: '退款中',
        [state.refunded]: '已退款',
        [state.abandoned]: '已取消',

        [state.aborting]: '正在中止',
        [state.abandoning]: '正在取消',

        [state.sent]: '已发货',
        [state.rejected]: '已拒收',
        [state.applied]: '已申请',
        [state.agreed]: '已同意',

        [state.confirmed]: '确认的',
        [state.expired]: '过期的',
        [state.completed]: '已完成',
    };

    return STRINGS[s];
};

const decodeAction = (a) => {
    const STRINGS = {
        [action.create]: '创建',
        [action.update]: '更新数据',
        [action.remove]: '删除',
        [action.createSub]: '创建子结点',

        [action.authGrant]: '授予权限',
        [action.authRevoke]: '回收权限',
        [action.authAbandon]: '放弃权限',
        // [action.authExpire]: '过期权限',
        [action.authConfirm]: '确认权限',

        [action.transfer]: '转让',

        [action.confirmToPay]: '确认下单',
        [action.pay]: '支付成功',
        [action.cancel]: '取消',
        [action.abort]: '中止',
        [action.expire]: '过期',
        [action.makePaid]: '自动支付',
        [action.complete]: '完成',
        [action.abandon]: '取消',
        [action.abort2]: '异步中止',
        [action.abort2Success]: '异步中止成功',
        [action.abandon2]: '异步取消',
        [action.abandon2Success]: '异步取消成功',


        [action.send]: '发货',
        [action.reject]: '拒收',
        [action.apply]: '申请',
        [action.agree]: '同意',
    };

    return STRINGS[a];
};

const decodeRelation = (r) => {
    const STRINGS = {
        [relation.owner]: '所有者',
        [relation.grantee]: '被授权者',
    };
    return STRINGS[r];
};


const COMMON_STATE_TRAN_MATRIX = {
    [action.confirmToPay]: [state.init, state.unpaid],
    [action.pay]: [state.unpaid, state.legal],
    [action.makePaid]: [[state.init, state.unpaid], state.legal],
    [action.cancel]: [[state.init, state.unpaid], state.cancelled],
    [action.abort]: [state.legal, state.aborted],
    [action.abort2]: [state.legal, state.aborting],
    [action.abort2Success]: [state.aborting, state.aborted],
    [action.abandon]: [state.legal, state.abandoned],
    [action.abandon2]: [state.legal, state.abandoning],
    [action.abandon2Success]: [state.abandoning, state.abandoned],
    [action.complete]: [state.legal, state.completed],
    [action.expire]: [[state.init, state.unpaid], state.expired],
    [action.send]: [state.legal, state.sent],
    [action.confirm]: [[state.applied, state.sent], state.confirmed],
    [action.complete]: [[state.legal, state.confirmed], state.completed],

    [action.apply]: [[state.init, state.rejected], state.applied],
    [action.reject]: [[state.sent, state.applied], state.rejected],
    [action.agree]: [state.applied, state.agreed],
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    relation,
    decodeRelation,

    COMMON_STATE_TRAN_MATRIX,
};
