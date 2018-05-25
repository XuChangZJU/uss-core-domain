
/**
 * Created by Administrator on 2018/4/17.
 */
/**
 * 与业务相关的表名写在这儿，注意不要和系统表名有重复
 */
const assign = require('lodash/assign');
const SysTables = require('../sysTables');

const BusinessTables = {
    station: 'station',                   // 站点
    stationWorker: 'stationWorker',     // 站点联系人员
    vehicle: 'vehicle',                   // 车辆
    location: 'location',                 // 地点
    vehicleStyle: 'vehicleStyle',       // 车型
    driverProxy: 'driverProxy',           // 代驾信息
    agency: 'agency',                     // 代办服务
    agencyAction: 'agencyAction',
    driverProxyAction: 'driverProxyAction',
    userVehicle: 'userVehicle',         // 用户和车辆的关系

    cxbConfiguration: 'cxbConfiguration',       // 配置

    cityGeoCache: 'cityGeoCache',
    cityIpCache: 'cityIpCache',
};

module.exports = assign({}, SysTables, BusinessTables);