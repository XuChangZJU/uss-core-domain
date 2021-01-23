const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    action,
    decodeAction,
} = require('../action');

const relation = Object.assign({}, commonRelation, {
    worker: 501,
});

const decodeRelation = (r) => {
    const R = {
        [relation.worker]: '工作人员',
    };

    return R[r] || decodeCommonRelation(r);
};
module.exports = {
    relation,
    decodeRelation,
    action,
    decodeAction,
};
