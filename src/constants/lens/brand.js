const omit = require('lodash/omit');
const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    action,
    decodeAction,
} = require('../action');
const { category } = require('./trade');

const relation = omit(Object.assign({}, commonRelation, {
    worker: 301,
    customerService: 401,
    seller: 501,
    financialStuff: 601,
    doctor: 701,
    OKGlassesDoctor: 801,
    visionTrainingDoctor: 901,
    supporter: 911,
}), ['financial']);

const decodeRelation = (r) => {
    const S = {
        [relation.worker]: '工作人员',
        [relation.customerService]: '运营人员',
        [relation.seller]: '门店销售人员',
        [relation.financialStuff]: '财务人员',
        [relation.doctor]: '医生',
        [relation.OKGlassesDoctor]: '角膜塑形镜验配师',
        [relation.visionTrainingDoctor]: '视觉训练师',
        [relation.supporter]: '客服',
    };

    return S[r] || decodeCommonRelation(r);
};
const everyOneAbleCategory = [category.check, category.consumables, category.DoneGlasses, category.DISCGlasses, category.SCL, category.makeGlasses];
const allCategory = [category.check, category.consumables, category.DoneGlasses, category.DISCGlasses, category.SCL, category.makeGlasses, category.doctorService, category.visionTraining, category.visionTrainingCheck, category.OKGlasses, category.OkGlassCheck];
const relationCategory = {
    [relation.owner]: allCategory,
    [relation.manager]: allCategory,
    [relation.worker]: everyOneAbleCategory,
    [relation.seller]: everyOneAbleCategory,
    [relation.customerService]: allCategory,
    [relation.financialStuff]: everyOneAbleCategory,
    [relation.doctor]: everyOneAbleCategory.concat([category.doctorService]),
    [relation.OKGlassesDoctor]: everyOneAbleCategory.concat([category.OKGlasses, category.OkGlassCheck]),
    [relation.visionTrainingDoctor]: everyOneAbleCategory.concat([category.visionTraining, category.visionTrainingCheck]),
}
module.exports = {
    everyOneAbleCategory,
    action,
    decodeAction,
    relation,
    decodeRelation,
    relationCategory,
};