'use strict';

var _relationCategory;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var omit = require('lodash/omit');

var _require = require('../action'),
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation,
    action = _require.action,
    decodeAction = _require.decodeAction;

var _require2 = require('./trade'),
    category = _require2.category;

var relation = omit(Object.assign({}, commonRelation, {
    worker: 301,
    customerService: 401,
    seller: 501,
    financialStuff: 601,
    doctor: 701,
    OKGlassesDoctor: 801,
    visionTrainingDoctor: 901
}), ['financial']);

var decodeRelation = function decodeRelation(r) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, relation.worker, '工作人员'), _defineProperty(_S, relation.customerService, '运营人员'), _defineProperty(_S, relation.seller, '门店销售人员'), _defineProperty(_S, relation.financialStuff, '财务人员'), _defineProperty(_S, relation.doctor, '医生'), _defineProperty(_S, relation.OKGlassesDoctor, '角膜塑形镜验配师'), _defineProperty(_S, relation.visionTrainingDoctor, '视觉训练师'), _S);

    return S[r] || decodeCommonRelation(r);
};
var everyOneAbleCategory = [category.check, category.consumables, category.DoneGlasses, category.DISCGlasses, category.SCL, category.makeGlasses];
var allCategory = [category.check, category.consumables, category.DoneGlasses, category.DISCGlasses, category.SCL, category.makeGlasses, category.doctorService, category.visionTraining, category.visionTrainingCheck, category.OKGlasses, category.OkGlassCheck];
var relationCategory = (_relationCategory = {}, _defineProperty(_relationCategory, relation.owner, allCategory), _defineProperty(_relationCategory, relation.manager, allCategory), _defineProperty(_relationCategory, relation.worker, everyOneAbleCategory), _defineProperty(_relationCategory, relation.seller, everyOneAbleCategory), _defineProperty(_relationCategory, relation.customerService, allCategory), _defineProperty(_relationCategory, relation.financialStuff, everyOneAbleCategory), _defineProperty(_relationCategory, relation.doctor, everyOneAbleCategory.concat([category.doctorService])), _defineProperty(_relationCategory, relation.OKGlassesDoctor, everyOneAbleCategory.concat([category.OKGlasses, category.OkGlassCheck])), _defineProperty(_relationCategory, relation.visionTrainingDoctor, everyOneAbleCategory.concat([category.visionTraining, category.visionTrainingCheck])), _relationCategory);
module.exports = {
    everyOneAbleCategory: everyOneAbleCategory,
    action: action,
    decodeAction: decodeAction,
    relation: relation,
    decodeRelation: decodeRelation,
    relationCategory: relationCategory
};