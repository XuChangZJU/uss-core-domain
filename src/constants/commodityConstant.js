/**
 * Created by Administrator on 2018/3/29.
 */
'use strict';

const available = {
    available: 1,           // 在售
    few: 2,                  // 货源紧张
    willOff: 3,             // 将下架

    unavailable: 200,       // 不可售
    off: 201,                // 下架
    forbidden: 202,         // 禁售
    lack: 203,               // 缺货
};

const decodeAvailable = (a) => {
    const STRING = {
        [available.available]: '在售',
        [available.few]: '货源紧张',
        [available.willOff]: '将下架',
        [available.unavailable]: '不可售',
        [available.off]: '下架',
        [available.forbidden]: '禁售',
        [available.lack]: '缺货',
    };

    return STRING[a];
};

module.exports = {
    available,
    decodeAvailable,
};
