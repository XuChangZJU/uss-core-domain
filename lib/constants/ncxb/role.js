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
        name: 'MoveVehicleOperator'
    }
};

module.exports = Object.assign(Roles, commonRoles);