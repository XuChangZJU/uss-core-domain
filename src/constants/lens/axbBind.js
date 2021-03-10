const state = {
    binded: 301,
    unbinded: 302,
};

const decodeState = (s) => {
    const S = {
        [state.binded]: '已绑定',
        [state.unbinded]: '已解绑',
    };
    return S[s];
};



module.exports = {
    state,
    decodeState,
};