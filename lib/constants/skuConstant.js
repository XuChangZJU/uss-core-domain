/**
 * Created by Administrator on 2018/3/29.
 */
'use strict';

const state = {
    available: 1, // 在售
    few: 2, // 货源紧张
    willOff: 3, // 将下架

    unavailable: 200, // 不可售
    off: 201, // 下架
    forbidden: 202, // 禁售
    lack: 203 // 缺货
};

const decodeState = a => {
    const STRING = {
        [state.available]: '在售',
        [state.few]: '货源紧张',
        [state.willOff]: '将下架',
        [state.unavailable]: '不可售',
        [state.off]: '下架',
        [state.forbidden]: '禁售',
        [state.lack]: '缺货'
    };

    return STRING[a];
};

module.exports = {
    state,
    decodeState
};