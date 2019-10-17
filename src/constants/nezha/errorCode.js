/**
 * Created by Xc on 2019/7/1.
 */
const CommonErrorCode = require('../errorCode');

const ErrorCode = Object.assign({}, CommonErrorCode, {
    errorMachineUnexisted: { code: 1001, message: '机器不存在' },
});

module.exports = ErrorCode;
