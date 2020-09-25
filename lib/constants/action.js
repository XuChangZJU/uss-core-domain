'use strict';

var _COMMON_STATE_TRAN_MA;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/18.
 */
// 全局抽象的动作 0-1000
var action = {
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
    authGrantMulti: 14, // 复制一个对象后将新对象owner关系授权
    authConfirm: 15,
    authGrantMulti2: 16, // 仅发散关系

    transfer: 21, // 转让
    acquire: 22, // 申请
    assign: 23, // 授权（建立一个已有的entity和某个user间的关系
    allocWeChatQrCode: 24, // 为某个对象显式分配临时二维码

    confirmToPay: 31, // 确认下单
    cancel: 32, // 取消
    pay: 33, // 支付
    abort: 34, // 中断
    expire: 35, // 过期
    makePaid: 36, // 管理员确认支付
    abandon: 37, // 卖方主动中止
    complete: 38, // 完成
    abort2: 39, // 中止（异步）
    abandon2: 40, // 卖方主动中止（异步）
    abort2Success: 41, // 异步中止成功
    abandon2Success: 42, // 异步中止成功
    makeAbandoned: 43, // 管理员强制中止

    startToPay: 44, // 开始支付
    payPartially: 45, //部分支付成功

    refund: 51, // 退款
    refundSuccess: 52, // 退款成功
    refundPartially: 53 // 部分退款成功
};

// 全局抽象的关系 0-1000
var relation = {
    owner: 1,
    manager: 2, // 管理员
    financial: 3, // 财务

    grantee: 11 // 被授权者（泛义上的)
};

// 全局抽象的状态 0 - 100
var state = {
    init: 1,

    // pay相关的
    unpaid: 31,
    legal: 32,
    legal2: 33, // makePaid出来的
    aborted: 34, // 支付后取消
    cancelled: 35, // 未支付放弃
    cantPaid: 36, // 当unpaid的支付因为某个实体的状态暂时无法支付时可以使用这个状态储存一下（比如相关产品没有库存了）
    abandoned: 37, // 卖方中止（pay在外部结算）


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
    completed: 100002
};

var decodeState = function decodeState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, state.init, '初始的'), _defineProperty(_STRINGS, state.unpaid, '待支付的'), _defineProperty(_STRINGS, state.legal, '生效的'), _defineProperty(_STRINGS, state.legal2, '手动生效的'), _defineProperty(_STRINGS, state.aborted, '中止的'), _defineProperty(_STRINGS, state.cancelled, '取消的'), _defineProperty(_STRINGS, state.cantPaid, '暂不可支付的'), _defineProperty(_STRINGS, state.abandoned, '已取消'), _defineProperty(_STRINGS, state.partialPaid, '已部分支付'), _defineProperty(_STRINGS, state.paying, '支付中'), _defineProperty(_STRINGS, state.refunding, '退款中'), _defineProperty(_STRINGS, state.refunded, '已退款'), _defineProperty(_STRINGS, state.partialRefunded, '已部分退款'), _defineProperty(_STRINGS, state.aborting, '正在中止'), _defineProperty(_STRINGS, state.abandoning, '正在取消'), _defineProperty(_STRINGS, state.confirmed, '确认的'), _defineProperty(_STRINGS, state.expired, '过期的'), _defineProperty(_STRINGS, state.completed, '已完成'), _STRINGS);

    return STRINGS[s];
};

var decodeAction = function decodeAction(a) {
    var _STRINGS2;

    var STRINGS = (_STRINGS2 = {}, _defineProperty(_STRINGS2, action.create, '创建'), _defineProperty(_STRINGS2, action.update, '更新'), _defineProperty(_STRINGS2, action.remove, '删除'), _defineProperty(_STRINGS2, action.createSub, '创建子结点'), _defineProperty(_STRINGS2, action.getList, '获取列表'), _defineProperty(_STRINGS2, action.authGrant, '授权'), _defineProperty(_STRINGS2, action.authRevoke, '回收'), _defineProperty(_STRINGS2, action.authAbandon, '放弃'), _defineProperty(_STRINGS2, action.authConfirm, '确认'), _defineProperty(_STRINGS2, action.authGrantMulti, '散发'), _defineProperty(_STRINGS2, action.authGrantMulti2, '邀请'), _defineProperty(_STRINGS2, action.allocWeChatQrCode, '生成微信公众号关注链接'), _defineProperty(_STRINGS2, action.transfer, '转让'), _defineProperty(_STRINGS2, action.acquire, '申请'), _defineProperty(_STRINGS2, action.assign, '直接授权'), _defineProperty(_STRINGS2, action.confirmToPay, '确认下单'), _defineProperty(_STRINGS2, action.startToPay, '开始支付'), _defineProperty(_STRINGS2, action.pay, '支付成功'), _defineProperty(_STRINGS2, action.payPartially, '部分支付成功'), _defineProperty(_STRINGS2, action.cancel, '取消'), _defineProperty(_STRINGS2, action.abort, '中止'), _defineProperty(_STRINGS2, action.expire, '过期'), _defineProperty(_STRINGS2, action.makePaid, '手动设置支付'), _defineProperty(_STRINGS2, action.makeAbandoned, '手动设置中止'), _defineProperty(_STRINGS2, action.complete, '完成'), _defineProperty(_STRINGS2, action.abandon, '取消'), _defineProperty(_STRINGS2, action.abort2, '异步中止'), _defineProperty(_STRINGS2, action.abort2Success, '异步中止成功'), _defineProperty(_STRINGS2, action.abandon2, '异步取消'), _defineProperty(_STRINGS2, action.abandon2Success, '异步取消成功'), _defineProperty(_STRINGS2, action.refund, '退款'), _defineProperty(_STRINGS2, action.refundSuccess, '退款成功'), _defineProperty(_STRINGS2, action.refundPartially, '部分退款成功'), _STRINGS2);

    return STRINGS[a];
};

var decodeRelation = function decodeRelation(r) {
    var _STRINGS3;

    var STRINGS = (_STRINGS3 = {}, _defineProperty(_STRINGS3, relation.owner, '所有者'), _defineProperty(_STRINGS3, relation.manager, '管理者'), _defineProperty(_STRINGS3, relation.financial, '财务帐户'), _defineProperty(_STRINGS3, relation.grantee, '被授权者'), _STRINGS3);
    return STRINGS[r];
};

var COMMON_STATE_TRAN_MATRIX = (_COMMON_STATE_TRAN_MA = {}, _defineProperty(_COMMON_STATE_TRAN_MA, action.confirmToPay, [state.init, state.unpaid]), _defineProperty(_COMMON_STATE_TRAN_MA, action.pay, [[state.unpaid, state.paying], state.legal]), _defineProperty(_COMMON_STATE_TRAN_MA, action.startToPay, [[state.unpaid, state.partialPaid], state.paying]), _defineProperty(_COMMON_STATE_TRAN_MA, action.payPartially, [[state.unpaid, state.paying], state.partialPaid]), _defineProperty(_COMMON_STATE_TRAN_MA, action.makePaid, [[state.init, state.unpaid], state.legal2]), _defineProperty(_COMMON_STATE_TRAN_MA, action.cancel, [[state.init, state.unpaid], state.cancelled]), _defineProperty(_COMMON_STATE_TRAN_MA, action.abort, [state.legal, state.aborted]), _defineProperty(_COMMON_STATE_TRAN_MA, action.abort2, [state.legal, state.aborting]), _defineProperty(_COMMON_STATE_TRAN_MA, action.abort2Success, [state.aborting, state.aborted]), _defineProperty(_COMMON_STATE_TRAN_MA, action.abandon, [state.legal, state.abandoned]), _defineProperty(_COMMON_STATE_TRAN_MA, action.abandon2, [state.legal, state.abandoning]), _defineProperty(_COMMON_STATE_TRAN_MA, action.makeAbandoned, [state.legal2, state.abandoned]), _defineProperty(_COMMON_STATE_TRAN_MA, action.abandon2Success, [state.abandoning, state.abandoned]), _defineProperty(_COMMON_STATE_TRAN_MA, action.refund, [[state.legal, state.abandoned, state.aborted], state.refunding]), _defineProperty(_COMMON_STATE_TRAN_MA, action.refundSuccess, [[state.legal2, state.refunding, state.partialRefunded], state.refunded]), _defineProperty(_COMMON_STATE_TRAN_MA, action.refundPartially, [[state.legal2, state.refunding], state.partialRefunded]), _defineProperty(_COMMON_STATE_TRAN_MA, action.expire, [[state.init, state.unpaid], state.expired]), _defineProperty(_COMMON_STATE_TRAN_MA, action.confirm, [[state.applied, state.sent], state.confirmed]), _defineProperty(_COMMON_STATE_TRAN_MA, action.complete, [[state.legal, state.legal2], state.completed]), _COMMON_STATE_TRAN_MA);

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    relation: relation,
    decodeRelation: decodeRelation,

    COMMON_STATE_TRAN_MATRIX: COMMON_STATE_TRAN_MATRIX
};