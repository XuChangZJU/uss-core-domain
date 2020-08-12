/**
 * Created by Administrator on 2016/8/31.
 */
"use strict";

const weight = {
    high: 'high',
    medium: 'medium',
    low: 'low',
    data: 'data',           // 同步数据型
};

const channel = {
    jPush: "jPush",              // 极光
    weChat: "weChat",           // 公众号
    miniProgram: 'mp',          // 小程序
    message: 'message',         // 短信
};

const state = {
    sending: 10001,
    success: 10002,
    failure: 10003,
};

const decodeState = (s) => {
    const STRINGS = {
        [state.sending]: '发送中',
        [state.success]: '发送成功',
        [state.failure]: '发送失败',
    }
};

module.exports = {
    weight,
    state,
    decodeState,
    channel,
};