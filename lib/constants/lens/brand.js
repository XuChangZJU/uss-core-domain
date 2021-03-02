'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _relationCategory;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var omit = require('lodash/omit');

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    action = _require.action,
    decodeAction = _require.decodeAction;

var _require2 = require('./trade'),
    category = _require2.category;

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
var everyOneAbleCategory = [category.check, category.consumables, category.DoneGlasses, category.DISCGlasses, category.SCL, category.makeGlasses, category.classIIIMedicineDevice, category.service];
var allCategory = [category.check, category.consumables, category.DoneGlasses, category.DISCGlasses, category.SCL, category.makeGlasses, category.doctorService, category.visionTraining, category.visionTrainingCheck, category.OKGlasses, category.OkGlassCheck, category.gift, category.classIIIMedicineDevice, category.service];
var relationCategory = (_relationCategory = {}, (0, _defineProperty3.default)(_relationCategory, relation.owner, allCategory), (0, _defineProperty3.default)(_relationCategory, relation.manager, allCategory), (0, _defineProperty3.default)(_relationCategory, relation.worker, everyOneAbleCategory), (0, _defineProperty3.default)(_relationCategory, relation.seller, everyOneAbleCategory), (0, _defineProperty3.default)(_relationCategory, relation.customerService, allCategory), (0, _defineProperty3.default)(_relationCategory, relation.financialStuff, everyOneAbleCategory), (0, _defineProperty3.default)(_relationCategory, relation.doctor, everyOneAbleCategory.concat([category.doctorService])), (0, _defineProperty3.default)(_relationCategory, relation.OKGlassesDoctor, everyOneAbleCategory.concat([category.OKGlasses, category.OkGlassCheck])), (0, _defineProperty3.default)(_relationCategory, relation.visionTrainingDoctor, everyOneAbleCategory.concat([category.visionTraining, category.visionTrainingCheck])), _relationCategory);
module.exports = {
    everyOneAbleCategory: everyOneAbleCategory,
    action: action,
    decodeAction: decodeAction,
    relation: relation,
    decodeRelation: decodeRelation,
    relationCategory: relationCategory
};