/**
 * Created by Administrator on 2016/8/31.
 */
"use strict";

const weight = {
    tiny: 10,
    low: 10,
    medium: 20,
    high: 60,
    top: 90
};

const origin = {
    jPush: "jPush",
    weChat: "weChat",
};

const state = {
    init: 0,
    sending: 1,
    success: 2,
    failure: 3,
    fatal: 127
};

const decodeState = (s) => {
    const STRINGS = {
        [state.init]: '初始',
        [state.sending]: '发送中',
        [state.success]: '发送成功',
        [state.failure]: '发送失败',
        [state.fatal]: '彻底失败',
    }
};

module.exports = {
    weight,
    state,
    decodeState,
    origin,
};