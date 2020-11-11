const {
    action,
    decodeAction,
    state,
    decodeState,
    relation,
    decodeRelation,
    COMMON_STATE_TRAN_MATRIX: STATE_TRAN_MATRIX,
} = require('../action');

const type = {
    'in': 1,
    'out': 2,
}

const decodeType = (t) => {
    const T = {
        [type.in]: '入账',
        [type.out]: '出账',
    };
    return T[t];
};
module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    type,
    decodeType,
    relation,
    decodeRelation,
    STATE_TRAN_MATRIX,
};
