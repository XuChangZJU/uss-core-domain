'use strict';

/**
 * Created by Administrator on 2018/7/9.
 */
var _require = require('../roleConstant2'),
    commonRoles = _require.Roles;

var Roles = {
    ShopOwner: {
        name: 'ShopOwner',
        logic: true
    },
    VehicleManager: {
        name: 'VehicleManager',
        logic: true
    },
    MoveVehicleOperator: {
        name: 'MoveVehicleOperator',
        id: 10001
    },
    MpCodeManufacture: {
        name: 'MpCodeManufacture',
        id: 10002
    }
};

module.exports = Object.assign(Roles, commonRoles);