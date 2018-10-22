"use strict";

/**
 * Created by Administrator on 2016/9/9.
 */
const Roles = {
    ANYONE: {
        name: 'anyone',
        logic: true,
    },
    ROOT: {
        name: 'root',
        id: 1,
    },
    LOGGEDIN: {
        name: 'loggedIn',
        logic: true,
    },
    CLIENT: {
        name: 'client',
        id: 2,
    },


    //  for 交易系统
    BUYER: {
        name: 'buyer',
        logic: true,
    },
    SELLER: {
        name: 'seller',
        logic: true,
    },
    SKUMANAGER: {
        name: 'skuManager',
        id: 1001,
    },


    // for 文章管理
    EDITOR: {
        name: 'editor',
        id: 1101,
    },


    // for 车小宝
    CXBCUSTOMER:{
        name: 'cxbCustomer',
        logic: true,
    },
    CXBWORKER: {
        name: 'cxbWorker',
        logic: true,
    },
};
module.exports = {
    Roles,
};