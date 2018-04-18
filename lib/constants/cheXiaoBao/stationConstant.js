/**
 * Created by Administrator on 2018/4/17.
 */
'use strict';

const type = {
    check: 1 // 检查站
};

const decodeType = t => {
    const STRINGS = {
        [type.check]: '检查站'
    };

    return STRINGS[t];
};

const state = {
    online: 1,
    offline: 101,
    closed: 102
};

const decodeState = ws => {
    const STRINGS = {
        [state.online]: '在线',
        [state.offline]: '停业',
        [state.closed]: '关闭'
    };

    return STRINGS[ws];
};

const workerState = {
    online: 1, // 工作中
    offline: 101 // 不工作
};

const decodeWorkerState = ws => {
    const STRINGS = {
        [workerState.online]: '在线',
        [workerState.offline]: '离线'
    };

    return STRINGS[ws];
};

// station的options格式，暂时没提供给用户选择
/*
{
    services: [
        {
            name: '车辆年检',
            price: 150,
        }
    ]
}
*/

const getEstimatePrice = (vehicle, agency) => {
    const { options } = agency;
    const { type, params } = vehicle;

    return options.services[0].price;
};

module.exports = {
    type,
    decodeType,
    state,
    decodeState,
    workerState,
    decodeWorkerState,
    getEstimatePrice
};