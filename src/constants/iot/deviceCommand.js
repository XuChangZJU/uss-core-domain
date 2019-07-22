/**
 * Created by Xc on 2019/6/30.
 */
const state = {
    init: 1,
    sent: 5,
    success: 10,
    failure: 100,
    givenUp: 101,
    overTime: 102,
};

const decodeState = (s) => {
    const S = {
        [state.init]: '初建',
        [state.sent]: '发送',
        [state.success]: '成功',
        [state.failure]: '失败',
        [state.givenUp]: '放弃',
        [state.overTime]: '超时',
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
};

const command = {
    work: 1,
    stopWork: 2,
    queryResult: 100,
};

const decodeCommand = (c) => {
    const S = {
        [command.work]: '工作',
        [command.stopWork]: '取消工作',
        [queryResult]: '查询结果',
    };

    return S[c];
};

module.exports = {
    state,
    decodeState,
    channel,
    decodeChannel,
    command,
    decodeCommand,
};
