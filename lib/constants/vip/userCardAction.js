'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/9.
 */
var action = {
    create: 1,
    produceAmount: 11,
    produceScore: 12,
    produceTimes: 13,

    consumeAmount: 101,
    consumeScore: 102,
    consumeTimes: 103,

    grant: 201,
    revoke: 202,
    abandon: 203,

    send: 301,

    expires: 1001,
    forbid: 1002,
    drop: 1003
};

var decodeAction = function decodeAction(a) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, action.create, '开卡'), _defineProperty(_STRING, action.produceAmount, '余额充值'), _defineProperty(_STRING, action.produceScore, '积分充值'), _defineProperty(_STRING, action.produceTimes, '次数充值'), _defineProperty(_STRING, action.consumeAmount, '消费余额'), _defineProperty(_STRING, action.consumeScore, '消费积分'), _defineProperty(_STRING, action.consumeTimes, '消费次数'), _defineProperty(_STRING, action.grant, '授权'), _defineProperty(_STRING, action.revoke, '收回授权'), _defineProperty(_STRING, action.abandon, '放弃授权'), _defineProperty(_STRING, action.send, '转赠'), _defineProperty(_STRING, action.expires, '过期'), _defineProperty(_STRING, action.forbid, '禁用'), _defineProperty(_STRING, action.drop, '丢弃'), _STRING);

    return STRING[a];
};

module.exports = {
    action: action,
    decodeAction: decodeAction
};