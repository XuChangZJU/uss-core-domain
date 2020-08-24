const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    action,
    decodeAction,
} = require('../action');

const relation = Object.assign({}, commonRelation, {
    worker: 301,
    customerService: 401,
});


const decodeRelation = (r) => {
    const S = {
        [relation.worker]: '工作人员',
        [relation.customerService]: '运营人员'
    };

    return S[r] || decodeCommonRelation(r);
};
module.exports = {
    action,
    decodeAction,
    relation,
    decodeRelation,
};