'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/9.
 */
var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var relation = Object.assign({
    grantee: 1001 // 获权使用者
}, commonRelation);

var decodeRelation = function decodeRelation(t) {
    var STRING = _defineProperty({}, relation.grantee, '获权使用');

    return STRING[t] || decodeCommonRelation(t);
};

var action = Object.assign({
    produceAmount: 1001,
    produceScore: 1002,
    produceTimes: 1003,

    consumeAmount: 2001,
    consumeScore: 2002,
    consumeTimes: 2003,

    expires: 10001,
    forbid: 10002,
    dropBySelf: 10003,
    dropByShop: 10004
}, commonAction);

var decodeAction = function decodeAction(a) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, action.produceAmount, '余额充值'), _defineProperty(_STRINGS, action.produceScore, '积分充值'), _defineProperty(_STRINGS, action.produceTimes, '次数充值'), _defineProperty(_STRINGS, action.consumeAmount, '消费余额'), _defineProperty(_STRINGS, action.consumeScore, '消费积分'), _defineProperty(_STRINGS, action.consumeTimes, '消费次数'), _defineProperty(_STRINGS, action.expires, '过期'), _defineProperty(_STRINGS, action.forbid, '禁用'), _defineProperty(_STRINGS, action.dropBySelf, '自丢弃'), _defineProperty(_STRINGS, action.dropByShop, '店家删除'), _STRINGS);

    var s = STRINGS[a] || decodeCommonAction(a);

    return s;
};

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction
};