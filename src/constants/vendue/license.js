const type = Object.assign({}, {
    noInsurance: 1,
    rewardBenifit: 2,
});

const STRINGS_OF_ORIGINS = {
    [type.noInsurance]: "免保",
    [type.rewardBenifit]: "佣金优惠",
};

function decodeType(o) {
    return STRINGS_OF_ORIGINS[o];
}

module.exports = {
    type,
    decodeType,
};