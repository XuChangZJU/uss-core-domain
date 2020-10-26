'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var omit = require('lodash/omit');

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    action = _require.action,
    decodeAction = _require.decodeAction;

var relation = omit(Object.assign({}, commonRelation, {
    worker: 301,
    customerService: 401,
    seller: 501,
    financialStuff: 601
}), 'financial');

var decodeRelation = function decodeRelation(r) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, relation.worker, '工作人员'), _defineProperty(_S, relation.customerService, '运营人员'), _defineProperty(_S, relation.seller, '门店销售人员'), _defineProperty(_S, relation.financialStuff, '财务人员'), _S);

    return S[r] || decodeCommonRelation(r);
};
module.exports = {
    action: action,
    decodeAction: decodeAction,
    relation: relation,
    decodeRelation: decodeRelation
};