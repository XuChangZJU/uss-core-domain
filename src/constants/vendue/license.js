const type = Object.assign({}, {
    noInsurance: 1,
});

const STRINGS_OF_ORIGINS = {
    [type.noInsurance]: "免保",
};

function decodeType(o) {
    return STRINGS_OF_ORIGINS[o];
}

module.exports = {
    type,
    decodeType,
};