'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var T = (_T = {}, (0, _defineProperty3.default)(_T, type.guide, '导游公司'), (0, _defineProperty3.default)(_T, type.taxi, '出租车公司'), _T);
    return T[t];
};
var relation = (0, _assign2.default)({}, commonRelation, {
    'worker': 301,
    'guide': 401
});
var decodeRelation = function decodeRelation(a) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, relation.worker, '员工'), (0, _defineProperty3.default)(_TEXT, relation.guide, '导游'), _TEXT);

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