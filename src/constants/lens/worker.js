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

const action = Object.assign({}, CommonAction, {
    link: 131,
});

const decodeAction = (a) => {
    const A = {
        [action.link]: '关联',
    };
    return A[a] || decodeCommonAction(a);
};

module.exports = {
    relation: CommonRelation,
    decodeRelation: decodeCommonRelation,
    action: CommonAction,
    decodeAction: decodeCommonAction,
};
