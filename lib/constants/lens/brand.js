'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var omit = require('lodash/omit');

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    action = _require.action,
    decodeAction = _require.decodeAction;

var relation = omit((0, _assign2.default)({}, commonRelation, {
    worker: 301,
    customerService: 401,
    seller: 501,
    financialStuff: 601,
    doctor: 701,
    OKGlassesDoctor: 801,
    visionTrainingDoctor: 901,
    supporter: 911
}), ['financial']);

var decodeRelation = function decodeRelation(r) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, relation.worker, '工作人员'), (0, _defineProperty3.default)(_S, relation.customerService, '运营人员'), (0, _defineProperty3.default)(_S, relation.seller, '验光师'), (0, _defineProperty3.default)(_S, relation.financialStuff, '财务人员'), (0, _defineProperty3.default)(_S, relation.doctor, '医生'), (0, _defineProperty3.default)(_S, relation.OKGlassesDoctor, '角膜塑形镜验配师'), (0, _defineProperty3.default)(_S, relation.visionTrainingDoctor, '视觉训练师'), (0, _defineProperty3.default)(_S, relation.supporter, '客服'), _S);

    return S[r] || decodeCommonRelation(r);
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    relation: relation,
    decodeRelation: decodeRelation
};