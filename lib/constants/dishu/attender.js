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
    ascendant: 111,
    sibling: 121,
<<<<<<< HEAD
    descendant: 131,
    friend: 141,
    colleague: 142
=======
    friend: 122,
    colleague: 123,
    child: 131
>>>>>>> 50e69c04801e2af1df4030f936d731ca1e9f15e5
});

var decodeRelation = function decodeRelation(r) {
    var _S;

<<<<<<< HEAD
    var S = (_S = {}, _defineProperty(_S, relation.self, '自身'), _defineProperty(_S, relation.ascendant, '长辈'), _defineProperty(_S, relation.sibling, '兄弟姐妹'), _defineProperty(_S, relation.descendant, '晚辈'), _defineProperty(_S, relation.friend, '朋友'), _defineProperty(_S, relation.colleague, '同事'), _S);
=======
    var S = (_S = {}, _defineProperty(_S, relation.self, '本人'), _defineProperty(_S, relation.father, '父亲'), _defineProperty(_S, relation.mother, '母亲'), _defineProperty(_S, relation.eldership, '长辈'), _defineProperty(_S, relation.sibling, '兄弟姐妹'), _defineProperty(_S, relation.friend, '朋友'), _defineProperty(_S, relation.colleague, '同事'), _defineProperty(_S, relation.child, '子女'), _S);
>>>>>>> 50e69c04801e2af1df4030f936d731ca1e9f15e5

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