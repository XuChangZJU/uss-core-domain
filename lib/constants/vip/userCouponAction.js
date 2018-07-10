'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/9.
 */
var action = {
    create: 1,
    use: 101,

    send: 301,

    expires: 1001,
    forbid: 1002,
    dropBySelf: 1003,
    dropByShop: 1004
};

var decodeAction = function decodeAction(a) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, action.create, '领劵'), _defineProperty(_STRING, action.use, '使用'), _defineProperty(_STRING, action.send, '转赠'), _defineProperty(_STRING, action.expires, '过期'), _defineProperty(_STRING, action.forbid, '禁用'), _defineProperty(_STRING, action.dropBySelf, '自丢弃'), _defineProperty(_STRING, action.dropByShop, '店家删除'), _STRING);

    return STRING[a];
};

module.exports = {
    action: action,
    decodeAction: decodeAction
};