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
    'internal': 3,
    'others': 4,
}

const decodeType = (t) => {
    const T = {
        [type.in]: '入账',
        [type.out]: '出账',
        [type.internal]: '抵扣',
        [type.others]: '其他',
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
