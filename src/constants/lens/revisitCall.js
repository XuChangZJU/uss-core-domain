const state = {
    active: 301,
    expired: 401,
};

const decodeState = (s) => {
    const S = {
        [state.active]: '活跃的',
        [state.expired]: '已过期',
    };
    return S[s];
};

module.exports = {
    state,
    decodeState,
};
