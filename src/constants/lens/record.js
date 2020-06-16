const {
    action : commonAction,
    decodeAction: decodeCommonAction,
    relation,
    decodeRelation,
    state,
    decodeState,
} = require('../action');

const action = Object.assign({}, commonAction, {
    bind: 1001,
    unbind: 1002,
});

const decodeAction = (a) => {
    const TEXT = {
        [action.bind]: '关联',
        [action.unbind]: '解联',
    };

    return TEXT[a] || decodeCommonAction(a);
};


module.exports = {
    action,
    decodeAction,
    relation,
    decodeRelation,
    state,
    decodeState,
};
