/**
 * Created by Administrator on 2018/4/17.
 */
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var type = {
    check: 1, // 检查站
    materialCheck: 2 // 材料检查站
};

var decodeType = function decodeType(t) {
    var _STRINGS;

    var STRINGS = (_STRINGS = {}, _defineProperty(_STRINGS, type.check, '检查站'), _defineProperty(_STRINGS, type.materialCheck, '服务站'), _STRINGS);

    return STRINGS[t];
};

var state = {
    online: 1,
    offline: 101,
    closed: 102
};

var decodeState = function decodeState(ws) {
    var _STRINGS2;

    var STRINGS = (_STRINGS2 = {}, _defineProperty(_STRINGS2, state.online, '在线'), _defineProperty(_STRINGS2, state.offline, '停业'), _defineProperty(_STRINGS2, state.closed, '关闭'), _STRINGS2);

    return STRINGS[ws];
};

var workerState = {
    online: 1, // 工作中
    offline: 101 // 不工作
};

var decodeWorkerState = function decodeWorkerState(ws) {
    var _STRINGS3;

    var STRINGS = (_STRINGS3 = {}, _defineProperty(_STRINGS3, workerState.online, '在线'), _defineProperty(_STRINGS3, workerState.offline, '离线'), _STRINGS3);

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
var getEstimatePrice = function getEstimatePrice(vehicle, station) {
    var options = station.options;
    var type = vehicle.type,
        params = vehicle.params;


    return options.services[0].price;
};

/**
 * 估算时间
 * 这个时间需要把路上也计算进去
 * @param vehicle
 * @param station
 * @param agency
 */
var getEstimateRevertTime = function getEstimateRevertTime(vehicle, station, agency) {
    // 先使用简单规则，上午10点前取车的，下午2点，上午10点后的，下午4点
    var fetchTime = agency.fetchTime;

    var fetchTime2 = new Date(fetchTime);
    if (fetchTime2.getHours() < 10) {
        return fetchTime2.setHours(14);
    }
    return fetchTime2.setHours(16);
};

module.exports = {
    type: type,
    decodeType: decodeType,
    state: state,
    decodeState: decodeState,
    workerState: workerState,
    decodeWorkerState: decodeWorkerState,
    getEstimatePrice: getEstimatePrice,
    getEstimateRevertTime: getEstimateRevertTime
};