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
    },
    LOGGEDIN: {
        name: 'loggedIn',
        logic: true,
    },
    CLIENT: {
        name: 'client',
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
    },


    // for 文章管理
    EDITOR: {
        name: editor,
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