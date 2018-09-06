'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/18.
 */
// 全局抽象的动作 0-1000
var action = {
    create: 1,
    update: 2,
    remove: 3,

    authGrant: 11,
    authRevoke: 12,
    authAbandon: 13,
    // authExpire: 14,
    authConfirm: 15,

    confirmToPay: 31, // 确认下单
    cancel: 32, // 取消
    pay: 33, // 支付
    abort: 34, // 中断
    payExpire: 35, // 过期
    makePaid: 36 // 管理员确认支付
};

// 全局抽象的关系 0-1000
var relation = {
    owner: 1
};

// 全局抽象的状态 0 - 100
var state = {
    init: 1,

    // pay相关的
    unpaid: 31,
    legal: 32,
    aborted: 34,
    cancelled: 35,

    // userEntityGrant相关的
    confirmed: 1001,

    // 公共的
    expired: 100001
};

var decodeState = function decodeState(s) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, state.init, '初始的'), _defineProperty(_STRINGS, state.unpaid, '待支付的'), _defineProperty(_STRINGS, state.legal, '生效的'), _defineProperty(_STRINGS, state.expired, '过期的'), _defineProperty(_STRINGS, state.aborted, '中止的'), _defineProperty(_STRINGS, state.cancelled, '取消的'), _STRINGS);
};

var decodeAction = function decodeAction(a) {
    var _STRINGS2;

    var STRINGS = (_STRINGS2 = {}, _defineProperty(_STRINGS2, action.create, '创建'), _defineProperty(_STRINGS2, action.update, '更新数据'), _defineProperty(_STRINGS2, action.remove, '删除'), _defineProperty(_STRINGS2, action.authGrant, '授予权限'), _defineProperty(_STRINGS2, action.authRevoke, '回收权限'), _defineProperty(_STRINGS2, action.authAbandon, '放弃权限'), _defineProperty(_STRINGS2, action.authConfirm, '确认权限'), _defineProperty(_STRINGS2, action.confirmToPay, '确认下单'), _defineProperty(_STRINGS2, action.pay, '支付成功'), _defineProperty(_STRINGS2, action.cancel, '取消支付'), _defineProperty(_STRINGS2, action.abort, '中止'), _defineProperty(_STRINGS2, action.payExpire, '过期'), _defineProperty(_STRINGS2, action.makePaid, '自动支付'), _STRINGS2);

    return STRINGS[a];
};

var decodeRelation = function decodeRelation(r) {
    var STRINGS = _defineProperty({}, relation.owner, '所有者');
    return STRINGS[r];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    state: state,
    decodeState: decodeState,
    relation: relation,
    decodeRelation: decodeRelation
};