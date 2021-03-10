'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2019/7/1.
 */
var CommonErrorCode = require('../errorCode');

var ErrorCode = (0, _assign2.default)({}, CommonErrorCode, {
    errorNeedConnectDevice: { code: 1001, message: '请靠近并连接设备' },
    errorNeedDeviceNameByBle: { code: 1002, message: '请靠近设备' },
    errorNeedDeviceByCamera: { code: 1003, message: '请扫描主板上的IMEI号' },
    errorDeviceUnexisted: { code: 1010, message: '设备不存在' },
    errorDeviceInconsistency: { code: 1011, message: '设备断连过久，无法使用' },
    errorNotAgency: { code: 1103, message: '您没有代理权，请联系相关人员或厂商' }
});

module.exports = ErrorCode;