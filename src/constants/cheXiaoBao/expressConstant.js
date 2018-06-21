/**
 * Created by Administrator on 2018/6/21.
 */
'use strict';

const state = {
    unpost: 10,         // 未投递
    posted: 30,         // 已投递（下了快递单）
    sending: 40,        // 寄送中
    end: 400,           // 接收完成
};

const decodeState = (s) => {
    const STRINGS = {
        [state.unpost]: '未投递',
        [state.posted]: '已投递',
        [state.sending]: '寄送中',
        [state.end]: '已完成',
    };

    return STRINGS[s];
};

const type = {
    sendTo: 1,              // 寄送
    return: 2,          // 寄还
};

const decodeType = (t) => {
    const STRINGS = {
        [type.sendTo]: '寄送',
        [type.return]: '寄还',
    }
}

module.exports = {
    state,
    decodeState,
    type,
    decodeType,
};
