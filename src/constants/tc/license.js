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

const vipType = {
    normal: 1,
    vip: 2,
};

function decodeVipType(t) {
    const T = {
        [vipType.normal]: '普通优惠',
        [vipType.vip]: 'vip优惠',
    }
    return T[t];
}


module.exports = {
    type,
    decodeType,
    vipType,
    decodeVipType,
    action,
    decodeAction,
    state,
    decodeState,
    relation,
    decodeRelation,
};
