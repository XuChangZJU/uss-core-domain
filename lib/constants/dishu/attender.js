'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2020/1/20.
 */
var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    CommonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var relation = Object.assign({}, CommonRelation, {
    self: 101,
    father: 111,
    mother: 112,
    eldership: 113,
    sibling: 121,
    friend: 122,
    colleague: 123
});

var decodeRelation = function decodeRelation(r) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, relation.self, '自身'), _defineProperty(_S, relation.father, '父亲'), _defineProperty(_S, relation.mother, '母亲'), _defineProperty(_S, relation.eldership, '长辈'), _defineProperty(_S, relation.sibling, '兄弟姐妹'), _defineProperty(_S, relation.friend, '朋友'), _defineProperty(_S, relation.colleague, '同事'), _S);

    return S[r] || decodeCommonRelation(r);
};

var action = Object.assign({}, CommonAction, {
    check: 181
});

var decodeAction = function decodeAction(a) {
    var S = _defineProperty({}, action.check, '签到');

    return S[a] || decodeCommonAction(a);
};

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction
};