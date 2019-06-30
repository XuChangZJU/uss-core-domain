/**
 * Created by Xc on 2019/6/30.
 */
const state = {
    init: 1,
    normal: 10,
    offline: 21,
    disabled: 101,
};

const decodeState = (s) => {
    const S = {
        [state.init]: '初建的',
        [state.normal]: '正常的',
        [state.offline]: '失联的',
        [state.disabled]: '禁用的',
    };

    return S[s];
};

module.exports = {
    state,
    decodeState,
};
