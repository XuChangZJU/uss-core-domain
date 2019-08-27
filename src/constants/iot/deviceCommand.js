/**
 * Created by Xc on 2019/6/30.
 */
const state = {
    init: 1,
    sent: 5,
    success: 10,
    checking: 50,
    failure: 100,
    givenUp: 101,
    overTime: 102,
};

const decodeState = (s) => {
    const S = {
        [state.init]: '初建',
        [state.sent]: '发送',
        [state.success]: '成功',
        [state.checking]: '复查',
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
    getSpec: 11,
    initialize: 12,

    checkResult: 100,
};

const decodeCommand = (c) => {
    const S = {
        [command.work]: '工作',
        [command.stopWork]: '取消工作',
        [command.getSpec]: '获取规格',
        [command.initialize]: '初始化',
        [command.checkResult]: '查询结果',
    };

    return S[c];
};

const event = {
    workSuccess: 1,
    workFailure: 2,

    stopSuccess: 11,
    stopFailure: 12,

    querySuccess: 101,

    deviceConnected: 201,
    deviceDisconnected: 202,
};

const decodeEvent = (e) => {
    const S = {
        [event.workSuccess]: '工作成功',
        [event.workFailure]: '工作失败',
        [event.stopSuccess]: '停止成功',
        [event.stopFailure]: '停止失败',
        [event.querySuccess]: '查询成功',
        [event.deviceConnected]: '重新连接',
        [event.deviceDisconnected]: '失去连接',
    };
    return S[e];
};

module.exports = {
    state,
    decodeState,
    channel,
    decodeChannel,
    command,
    decodeCommand,
    event,
    decodeEvent,
};
