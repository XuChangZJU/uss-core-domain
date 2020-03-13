const {
    relation,
    decodeRelation,
} = require('../action');

const {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
} = require('./common');

module.exports = {
    relation,
    decodeRelation,
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRANS_MATRIX,
};
