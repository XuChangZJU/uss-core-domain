'use strict';

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

module.exports = Object.assign(Roles, commonRoles);