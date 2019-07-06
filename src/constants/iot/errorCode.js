/**
 * Created by Xc on 2019/7/1.
 */
const CommonErrorCode = require('../errorCode');

const ErrorCode = Object.assign({}, CommonErrorCode, {
    errorNeedConnectDevice: { code: 1001, message: '请靠近并连接设备'},
    errorNeedDeviceName: { code: 1002, message: '请靠近设备' },
    errorNotAgency: { code: 1003, message: '您没有代理权，请联系相关人员或厂商'},
    errorDeviceUnexisted: { code: 1010, message: '设备不存在' },
    errorDeviceInconsistency: { code: 1011, message: '设备断连过久，无法使用'},
});

module.exports = ErrorCode;
