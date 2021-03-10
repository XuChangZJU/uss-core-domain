'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/5/31.
 */
var commonCode = require('../errorCode');

var errorCode = {
  noUserInfo: { code: 10004, message: '您还没有告诉小高算卦需要的信息呢' },
  uiExpired: { code: 10005, message: '您需要续费' }
};

module.exports = (0, _assign2.default)(errorCode, commonCode);