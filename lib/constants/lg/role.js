'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2021/1/8.
 */
var _require = require('../roleConstant2'),
    commonRoles = _require.roles;

var role = (0, _assign2.default)({}, commonRoles, {
    touristGuide: 1,
    taxiDriver: 2,
    customer: 1001
});

var decodeRole = function decodeRole(r) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, role.touristGuide, '导游'), (0, _defineProperty3.default)(_TEXT, role.taxiDriver, '的士司机'), (0, _defineProperty3.default)(_TEXT, role.customer, '顾客'), _TEXT);
};