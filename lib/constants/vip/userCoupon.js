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
    inheritor: 1001 // 获赠者
}, commonRelation);

var decodeRelation = function decodeRelation(t) {
    var STRING = _defineProperty({}, relation.inheritor, '获赠者');

    return STRING[t] || decodeCommonRelation(t);
};

var action = Object.assign({
    use: 1001,
    dispatch: 1002,

    send: 3001,

    expires: 10001,
    forbid: 10002,
    dropBySelf: 10003,
    dropByShop: 10004
}, commonAction);

var decodeAction = function decodeAction(a) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, action.use, '使用'), _defineProperty(_STRINGS, action.dispatch, '发放'), _defineProperty(_STRINGS, action.send, '转赠'), _defineProperty(_STRINGS, action.expires, '过期'), _defineProperty(_STRINGS, action.forbid, '禁用'), _defineProperty(_STRINGS, action.dropBySelf, '自丢弃'), _defineProperty(_STRINGS, action.dropByShop, '店家删除'), _STRINGS);

    var s = STRINGS[a] || decodeCommonAction(a);

    return s;
};

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction
};