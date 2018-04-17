/**
 * Created by Administrator on 2018/4/17.
 */
'use strict';

const type = {
    check: 1,       // 检查站
};

const decodeType = (t) => {
    const STRINGS = {
        [type.check]: '检查站',
    };

    return STRINGS[t];
};

const workerState = {
    online: 1,          // 工作中
    offline: 2,         // 不工作
};

const decodeWorkerState = (ws) => {
    const STRINGS = {
        [workerState.online]: '在线',
        [workerState.offline]: '离线',
    };

    return STRINGS[ws];
}


module.exports = {
    type,
    decodeType,
    workerState,
    decodeWorkerState,
};
