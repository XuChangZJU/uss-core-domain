
const {
    relation: relation,
    decodeRelation: decodeRelation,
    action: action,
    decodeAction: decodeAction,
} = require('../action');

const state = {
    approved: 11,
    fresh: 22,
};

const decodeState = (s) => {
    const TEXT = {
        [state.approved]: '审核已通过',
        [state.fresh]: '未审核',
    };
    return TEXT[s];
};

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    relation,
    decodeRelation,
};

