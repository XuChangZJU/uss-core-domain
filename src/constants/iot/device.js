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
    initialize: 101,
    normalize: 111,
    disconnect: 121,
    connect: 122,
    disable: 131,
    enable: 132,
    loadGoods: 151,
    giveAgency: 161,
    returnBack: 162,
};

const decodeAction = (s) => {
    const S = {
        [action.initialize]: '初始化',
        [action.normalize]: '正常化',
        [action.disconnect]: '断连',
        [action.connect]: '连接',
        [action.disable]: '禁用',
        [action.enable]: '启用',
        [action.loadGoods]: '增加货物',
        [action.giveAgency]: '授予下级',
        [action.returnBack]: '归还上级',
    };
    return S[s];
};

module.exports = {
    state,
    decodeState,
    action,
    decodeAction,
};
