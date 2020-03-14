const {
    action: CommonAction,
    decodeAction: decodeCommonAction,
    relation: CommonRelation,
    decodeRelation: decodeCommonRelation,
} = require('../action');

const relation = Object.assign({}, CommonRelation, {
    self: 101,
});

const decodeRelation = (r) => {
    const R = {
        [relation.self]: '自身',
    };
    return R[r] || decodeRelation(r);
};

const action = Object.assign({}, CommonAction, {
    link: 131,
});

const decodeAction = (a) => {
    const A = {
        [action.link]: '关联',
    };
    return A[a] || decodeAction(a);
};

module.exports = {
    relation,
    decodeRelation,
    action,
    decodeAction,
};
