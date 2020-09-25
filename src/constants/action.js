/**
 * Created by Administrator on 2018/7/18.
 */
// 全局抽象的动作 0-1000
const action = {
    create: 1,
    update: 2,
    remove: 3,
    createSub: 4,
    getList: 5,
    updateRelationData: 6,

    authGrant: 11,
    authRevoke: 12,
    authAbandon: 13,
    // authExpire: 14,
    authGrantMulti: 14,     // 复制一个对象后将新对象owner关系授权
    authConfirm: 15,
    authGrantMulti2: 16,    // 仅发散关系

    transfer: 21,           // 转让
    acquire: 22,            // 申请
    assign: 23,             // 授权（建立一个已有的entity和某个user间的关系

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
    makeAbandoned: 43,       // 管理员强制中止

    startToPay: 44,          // 开始支付
    payPartially: 45,          //部分支付成功

    refund: 51,                 // 退款
    refundSuccess: 52,          // 退款成功
    refundPartially: 53,        // 部分退款成功
};

// 全局抽象的关系 0-1000
const relation = {
    owner: 1,
    manager: 2,         // 管理员
    financial: 3,         // 财务

    grantee: 11,        // 被授权者（泛义上的)
};

// 全局抽象的状态 0 - 100
const   state = {
    init: 1,

    // pay相关的
    unpaid: 31,
    legal: 32,
    legal2: 33,             // makePaid出来的
    aborted: 34,            // 支付后取消
    cancelled: 35,          // 未支付放弃
    cantPaid: 36,           // 当unpaid的支付因为某个实体的状态暂时无法支付时可以使用这个状态储存一下（比如相关产品没有库存了）
    abandoned: 37,          // 卖方中止（pay在外部结算）


    aborting: 38,
    abandoning: 39,
    paying: 40,
    partialPaid: 41,

    refunding: 51,
    refunded: 52,
    partialRefunded: 53,

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
        [state.legal2]: '手动生效的',
        [state.aborted]: '中止的',
        [state.cancelled]: '取消的',
        [state.cantPaid]: '暂不可支付的',
        [state.abandoned]: '已取消',
        [state.partialPaid]: '已部分支付',
        [state.paying]: '支付中',
        [state.refunding]: '退款中',
        [state.refunded]: '已退款',
        [state.partialRefunded]: '已部分退款',

        [state.aborting]: '正在中止',
        [state.abandoning]: '正在取消',

        [state.confirmed]: '确认的',
        [state.expired]: '过期的',
        [state.completed]: '已完成',
    };

    return STRINGS[s];
};

const decodeAction = (a) => {
    const STRINGS = {
        [action.create]: '创建',
        [action.update]: '更新',
        [action.remove]: '删除',
        [action.createSub]: '创建子结点',
        [action.getList]: '获取列表',

        [action.authGrant]: '授权',//授予权限
        [action.authRevoke]: '回收',
        [action.authAbandon]: '放弃',
        // [action.authExpire]: '过期',
        [action.authConfirm]: '确认',
        [action.authGrantMulti]: '散发',
        [action.authGrantMulti2]: '邀请',
        [action.transfer]: '转让',
        [action.acquire]: '申请',
        [action.assign]: '直接授权',

        [action.confirmToPay]: '确认下单',
        [action.startToPay]: '开始支付',
        [action.pay]: '支付成功',
        [action.payPartially]: '部分支付成功',
        [action.cancel]: '取消',
        [action.abort]: '中止',
        [action.expire]: '过期',
        [action.makePaid]: '手动设置支付',
        [action.makeAbandoned]: '手动设置中止',
        [action.complete]: '完成',
        [action.abandon]: '取消',
        [action.abort2]: '异步中止',
        [action.abort2Success]: '异步中止成功',
        [action.abandon2]: '异步取消',
        [action.abandon2Success]: '异步取消成功',


        [action.refund]: '退款',
        [action.refundSuccess]: '退款成功',
        [action.refundPartially]: '部分退款成功',
    };

    return STRINGS[a];
};

const decodeRelation = (r) => {
    const STRINGS = {
        [relation.owner]: '所有者',
        [relation.manager]: '管理者',
        [relation.financial]: '财务帐户',
        [relation.grantee]: '被授权者',
    };
    return STRINGS[r];
};


const COMMON_STATE_TRAN_MATRIX = {
    [action.confirmToPay]: [state.init, state.unpaid],
    [action.pay]: [[state.unpaid, state.paying], state.legal],
    [action.startToPay]: [[state.unpaid, state.partialPaid], state.paying],
    [action.payPartially]: [[state.unpaid, state.paying], state.partialPaid],
    [action.makePaid]: [[state.init, state.unpaid], state.legal2],
    [action.cancel]: [[state.init, state.unpaid], state.cancelled],
    [action.abort]: [state.legal, state.aborted],
    [action.abort2]: [state.legal, state.aborting],
    [action.abort2Success]: [state.aborting, state.aborted],
    [action.abandon]: [state.legal, state.abandoned],
    [action.abandon2]: [state.legal, state.abandoning],
    [action.makeAbandoned]: [state.legal2, state.abandoned],
    [action.abandon2Success]: [state.abandoning, state.abandoned],
    [action.refund]: [state.legal, state.refunding],
    [action.refundSuccess]: [[state.legal2, state.refunding, state.partialRefunded], state.refunded],
    [action.refundPartially]: [[state.legal2, state.refunding], state.partialRefunded],

    [action.expire]: [[state.init, state.unpaid], state.expired],
    [action.confirm]: [[state.applied, state.sent], state.confirmed],
    [action.complete]: [[state.legal, state.legal2], state.completed],
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
