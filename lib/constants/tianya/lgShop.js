'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    action = _require.action,
    decodeAction = _require.decodeAction;

var relation = Object.assign({}, commonRelation, {
    worker: 501
});

var decodeRelation = function decodeRelation(r) {
    var R = _defineProperty({}, relation.worker, '工作人员');

    return R[r] || decodeCommonRelation(r);
};
module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction
};