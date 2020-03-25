const {
    action: CommonAction,
    decodeAction: decodeCommonAction,
    relation: CommonRelation,
    decodeRelation: decodeCommonRelation,
} = require('../action');

const relation = Object.assign({}, CommonRelation, {
});

const decodeRelation = (r) => {
    const R = {
        [relation.owner]: '自身',
    };
    return R[r] || decodeCommonRelation(r);
};

module.exports = {
    relation: CommonRelation,
    decodeRelation: decodeCommonRelation,
    action: CommonAction,
    decodeAction: decodeCommonAction,
};
