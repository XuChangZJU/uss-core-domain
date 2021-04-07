const {
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
} = require('../action');

const relation = Object.assign({}, commonRelation, {
    labeler: 201,
    labelee: 202,
});

const decodeRelation = (r) => {
    const R = {
        [relation.labeler]: '打标签者',
        [relation.labelee]: '被打标签者',
    };
    return R[r] || decodeCommonRelation(r);
};

module.exports = {
    relation,
    decodeRelation,
}