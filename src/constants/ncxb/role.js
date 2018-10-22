/**
 * Created by Administrator on 2018/7/9.
 */
const { Roles: commonRoles } = require('../roleConstant2');

const Roles = {
    ShopOwner: {
        name: 'ShopOwner',
        logic: true,
    },
    VehicleManager: {
        name: 'VehicleManager',
        logic: true,
    },
    MoveVehicleOperator: {
        name: 'MoveVehicleOperator',
        id: 10001,
    },
    MpCodeManufacture: {
        name: 'MpCodeManufacture',
        id: 10002,
    }
};

module.exports = Object.assign(Roles, commonRoles);
