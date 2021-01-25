
const {
    relation: relation,
    decodeRelation: decodeRelation,
    action: commonAction,
    decodeAction: decodeCommonAction,
} = require('../action');

const state = {
    approved: 11,
    disabled: 21,
    fresh: 22,
};

const decodeState = (s) => {
    const TEXT = {
        [state.approved]: '审核已通过',
        [state.disabled]: '禁用中',
        [state.fresh]: '未审核',
    };
    return TEXT[s];
};

const action = Object.assign({}, commonAction,
    {
        able: 401,
        disable: 501,
        approve: 601,
    }
);

const decodeAction = (a) => {
    const TEXT = {
        [action.able]: '许用',
        [action.disable]: '禁用',
        [action.approve]: '通过审核'
    };

    return TEXT[a] || decodeCommonAction(a);
};


const STATE_TRANS_MATRIX = {
    [action.able]: [state.disabled, state.approved],
    [action.approve]: [state.fresh, state.approved],
    [action.disable]: [state.approved, state.disabled],
};

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
    relation,
    decodeRelation,
    STATE_TRANS_MATRIX,
};

