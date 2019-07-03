/**
 * Created by Xc on 2019/6/30.
 */
const state = {
    init: 1,
    normal: 10,
    disconnected: 21,
    disabled: 101,
};

const decodeState = (s) => {
    const S = {
        [state.init]: '初建的',
        [state.normal]: '正常的',
        [state.disconnected]: '失联的',
        [state.disabled]: '禁用的',
    };

    return S[s];
};

const action = {
    normalize: 11,
    disconnect: 21,
    connect: 22,
    disable: 31,
    enable: 32,
};

const decodeAction = (s) => {
    const S = {
        [action.normalize]: '正常化',
        [action.disconnect]: '断连',
        [action.connect]: '连接',
        [action.disable]: '禁用',
        [action.enable]: '启用',
    };
    return S[s];
};

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
};
