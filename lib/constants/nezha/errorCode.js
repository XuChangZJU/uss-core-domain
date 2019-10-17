'use strict';

/**
 * Created by Xc on 2019/7/1.
 */
var CommonErrorCode = require('../errorCode');

var ErrorCode = Object.assign({}, CommonErrorCode, {
  errorMachineUnexisted: { code: 1001, message: '机器不存在' }
});

module.exports = ErrorCode;