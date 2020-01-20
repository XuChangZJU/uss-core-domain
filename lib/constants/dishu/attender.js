'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2020/1/20.
 */
var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var relation = Object.assign({}, commonRelation, {
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

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation
};