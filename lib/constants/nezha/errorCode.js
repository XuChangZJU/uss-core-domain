'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2019/7/1.
 */
var CommonErrorCode = require('../errorCode');

var ErrorCode = (0, _assign2.default)({}, CommonErrorCode, {
  errorMachineUnexisted: { code: 1001, message: '机器不存在' }
});

module.exports = ErrorCode;