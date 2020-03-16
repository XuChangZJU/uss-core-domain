const {
    relation,
    decodeRelation,
} = require('../action');

const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
} = require('./common');

const action = Object.assign({}, commonAction, {
    transfer: 601,
});

const decodeAction = (a) => {
    const TEXT = {
        [action.transfer]: '转让',
    };

    return TEXT[a] || decodeCommonAction(a);
}

module.exports = {
    relation,
    decodeRelation,
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRANS_MATRIX,
};
