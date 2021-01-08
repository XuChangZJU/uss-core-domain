'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2021/1/8.
 */
var _require = require('../roleConstant2'),
    commonRoles = _require.roles;

var role = Object.assign({}, commonRoles, {
    touristGuide: 1,
    taxiDriver: 2,
    customer: 1001
});

var decodeRole = function decodeRole(r) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, role.touristGuide, '导游'), _defineProperty(_TEXT, role.taxiDriver, '的士司机'), _defineProperty(_TEXT, role.customer, '顾客'), _TEXT);
};