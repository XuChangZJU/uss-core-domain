/**
 * Created by Xc on 2019/6/30.
 */
const { state, decodeState, action: CommonAction, decodeAction: decodeCommonAction } = require('../action');

const chargeState = {
    init: 1,
    starting: 11,
    inProgress: 21,
    stopping: 31,
    stopped: 41,
};

const decodeChargeState = (s) => {
    const S = {
        [chargeState.init]: '初始的',
        [chargeState.starting]: '正在启动',
        [chargeState.inProgress]: '充电中',
        [chargeState.stopping]: '正在结束',
        [chargeState.stopped]: '已结束',
    };

    return S[s];
};

const source = {
    server: 1,
    coin: 2,
};

const decodeSource = (s) => {
    const S = {
        [source.server]: '服务器',
        [source.coin]: '投币',
    };
    return S[s];
};

const action = Object.assign({}, CommonAction, {
    startCharge: 101,
    stopCharge: 102,
});

const decodeAction = (a) => {
    const S = {
        [action.startCharge]: '开始充电',
        [action.stopCharge]: '停止充电',
    };

    return S[a] || decodeCommonAction(a);
};

module.exports = {
    state,
    decodeState,
    chargeState,
    decodeChargeState,
    source,
    decodeSource,
    action,
    decodeAction,
};
