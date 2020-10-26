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
}), 'financial');

const decodeRelation = (r) => {
    const S = {
        [relation.worker]: '工作人员',
        [relation.customerService]: '运营人员',
        [relation.seller]: '门店销售人员',
        [relation.financialStuff]: '财务人员',
    };

    return S[r] || decodeCommonRelation(r);
};
module.exports = {
    action,
    decodeAction,
    relation,
    decodeRelation,
};