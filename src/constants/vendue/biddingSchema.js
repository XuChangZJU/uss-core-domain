const type = Object.assign({}, {
    sequentiallyIncreasing: 1,
    increasingBy258: 2,
});

const STRINGS_OF_ORIGINS = {
    [type.sequentiallyIncreasing]: "顺序递增",
    [type.increasingBy258]: "258拍",
};

function decodeType(o) {
    return STRINGS_OF_ORIGINS[o];
}

module.exports = {
    type,
    decodeType,
};

