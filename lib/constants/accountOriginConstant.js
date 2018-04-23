'use strict';

/**
 * Created by Administrator on 2018/3/4.
 */
var initData = {
    accountOriginGroup: [{
        id: 1,
        name: '微信',
        options: {}
    }],
    accountOrigin: [{
        id: 1,
        groupId: 1,
        name: '公众号',
        options: {}
    }, {
        id: 2,
        groupId: 1,
        name: '小程序',
        options: {}
    }]
};

module.exports = {
    initData: initData
};