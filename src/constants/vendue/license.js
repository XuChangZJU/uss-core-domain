const {
    action,
    decodeAction,
    state,
    decodeState,
    relation,
    decodeRelation,
} = require('../action');

const type = Object.assign({}, {
    // noInsurance: 1,
    rewardBenifit: 2,
    depositBenifit: 1,
});

const STRINGS_OF_ORIGINS = {
    // [type.noInsurance]: "免保",
    [type.rewardBenifit]: "佣金优惠",
    [type.depositBenifit]: "保证金优惠",
};

function decodeType(o) {
    return STRINGS_OF_ORIGINS[o];
}

module.exports = {
    type,
    decodeType,
    action,
    decodeAction,
    state,
    decodeState,
    relation,
    decodeRelation,
};
