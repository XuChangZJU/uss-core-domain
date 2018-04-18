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

/**
 * 估算价格
 * @param vehicle
 * @param station
 * @returns {*}
 */
const getEstimatePrice = (vehicle, station) => {
    const { options } = station;
    const { type, params } = vehicle;

    return options.services[0].price;
};

/**
 * 估算时间
 * 这个时间需要把路上也计算进去
 * @param vehicle
 * @param station
 * @param agency
 */
const getEstimateRevertTime = (vehicle, station, agency) => {
    // 先使用简单规则，上午10点前取车的，下午2点，上午10点后的，下午4点
    const { fetchTime } = agency;
    const fetchTime2 = new Date(fetchTime);
    if (fetchTime2.getHours() < 10) {
        return fetchTime2.setHours(14);
    }
    return fetchTime2.setHours(16);
};

module.exports = {
    type,
    decodeType,
    state,
    decodeState,
    workerState,
    decodeWorkerState,
    getEstimatePrice,
    getEstimateRevertTime
};