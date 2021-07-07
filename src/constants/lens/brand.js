const omit = require('lodash/omit');
const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    action,
    decodeAction,
} = require('../action');

const relation = omit(Object.assign({}, commonRelation, {
    worker: 301,
    customerService: 401,
    seller: 501,
    financialStuff: 601,
    doctor: 701,
    OKGlassesDoctor: 801,
    visionTrainingDoctor: 901,
    supporter: 911,
    buyer: 1001,

}), ['financial']);

const decodeRelation = (r) => {
    const S = {
        [relation.worker]: '总监',
        [relation.customerService]: '运营人员',
        [relation.seller]: '验光师',
        [relation.financialStuff]: '财务人员',
        [relation.doctor]: '医生',
        [relation.OKGlassesDoctor]: '角膜塑形镜验配师',
        [relation.visionTrainingDoctor]: '视觉训练师',
        [relation.supporter]: '客服',
        [relation.buyer]: '采购员',
    };

    return S[r] || decodeCommonRelation(r);
};

module.exports = {
    action,
    decodeAction,
    relation,
    decodeRelation,
};