/**
 * Created by Xc on 2019/6/30.
 */
const state = {
    init: 1,
    success: 10,
    failure: 21,
    givenUp: 101,
};

const decodeState = (s) => {
    const S = {
        [state.init]: '初建',
        [state.success]: '成功',
        [state.failure]: '失败',
        [state.givenUp]: '放弃',
    };

    return S[s];
};

const channel = {
    zhzn: 1,
    gsm: 2,
    ble: 3,
};

const decodeChannel = (c) => {
    const S = {
        [channel.zhzn]: 'ZHZN',
        [channel.gsm]: '2G',
        [channel.ble]: '蓝牙',
    };
    return S[c];
}

module.exports = {
    state,
    decodeState,
    channel,
    decodeChannel,
};
