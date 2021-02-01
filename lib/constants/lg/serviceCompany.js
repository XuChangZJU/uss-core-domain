'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var type = {
    'guide': 1,
    'taxi': 2
};

var decodeType = function decodeType(t) {
    var _T;

    var T = (_T = {}, _defineProperty(_T, type.guide, '导游公司'), _defineProperty(_T, type.taxi, '出租车公司'), _T);
    return T[t];
};
var relation = Object.assign({}, commonRelation, {
    'worker': 301,
    'seller': 401,
    'driver': 501
});
var decodeRelation = function decodeRelation(a) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, relation.worker, '员工'), _defineProperty(_TEXT, relation.seller, '销售'), _defineProperty(_TEXT, relation.driver, '司机'), _TEXT);

    return TEXT[a] || decodeCommonRelation(a);
};
module.exports = {
    action: action,
    decodeAction: decodeAction,
    type: type,
    decodeType: decodeType,
    relation: relation,
    decodeRelation: decodeRelation
};