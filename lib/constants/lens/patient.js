'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var relation = Object.assign({}, commonRelation, {
    parent: 111,
    eldership: 112,
    mate: 121,
    sibling: 122,
    friend: 123,
    children: 131,
    grandchildren: 132,
    patient: 133
});

var decodeRelation = function decodeRelation(r) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, relation.owner, '本人'), _defineProperty(_S, relation.parent, '父/母'), _defineProperty(_S, relation.mate, '配偶'), _defineProperty(_S, relation.eldership, '长辈'), _defineProperty(_S, relation.sibling, '兄弟姐妹'), _defineProperty(_S, relation.friend, '朋友'), _defineProperty(_S, relation.children, '子女'), _defineProperty(_S, relation.grandchildren, '晚辈'), _defineProperty(_S, relation.patient, '病人'), _S);

    return S[r] || decodeCommonRelation(r);
};

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: commonAction,
    decodeAction: decodeCommonAction
};