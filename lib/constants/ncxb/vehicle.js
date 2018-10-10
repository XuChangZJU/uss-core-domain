'use strict';

/**
 * Created by Administrator on 2018/10/10.
 */

var _require = require('../../utils/checkValidUtils'),
    checkConditionThrowString = _require.checkConditionThrowString;

// 检查对象是否合法


var checkValid = function checkValid(vehicle, assertFn) {
    var assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(vehicle.number, 'vehicle must have number');
    assertFn2(vehicle.phone, 'vehicle must have phone');
};

module.exports = {
    checkValid: checkValid
};