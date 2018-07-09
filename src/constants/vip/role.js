/**
 * Created by Administrator on 2018/7/9.
 */
const commonRoles = require('../roleConstant2');

const Roles = {
    // 品牌创始人
    VIPBRANDOWNER: {
        name: 'vipBrandOwner',
        logic: true,
    },
    VIPCUSTOMER: {
        name: 'vipCustomer',
        logic: true,
    },
    VIPSHOPKEEPER: {
        name: 'vipShopKeeper',
        logic: true,
    },
    VIPSALER: {
        name: 'vipSaler',
        logic: true,
    },
};

module.exports = Object.assign(Roles, commonRoles);
