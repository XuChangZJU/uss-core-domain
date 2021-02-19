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
    // 品牌创始人
    VIPBRANDOWNER: {
        name: 'vipBrandOwner',
        logic: true
    },
    VIPCUSTOMER: {
        name: 'vipCustomer',
        logic: true
    },
    VIPSHOPKEEPER: {
        name: 'vipShopKeeper',
        logic: true
    },
    VIPWORKER: {
        name: 'vipWorker',
        logic: true
    }
};

module.exports = (0, _assign2.default)(Roles, commonRoles);