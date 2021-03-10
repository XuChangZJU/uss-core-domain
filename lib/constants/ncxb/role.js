'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

module.exports = (0, _assign2.default)(Roles, commonRoles);