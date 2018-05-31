'use strict';

/**
 * Created by Administrator on 2018/5/31.
 */
var commonCode = require('../errorCode');

var errorCode = {
  noUserInfo: { code: 10004, message: '您还没有告诉小高算卦需要的信息呢' }
};

module.exports = Object.assign(errorCode, commonCode);