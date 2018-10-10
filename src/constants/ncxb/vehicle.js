/**
 * Created by Administrator on 2018/10/10.
 */

const { checkConditionThrowString } = require('../../utils/checkValidUtils');

// 检查对象是否合法
const checkValid = (vehicle, assertFn) => {
    const assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(vehicle.number, 'vehicle must have number');
    assertFn2(vehicle.phone, 'vehicle must have phone');
};

module.exports = {
    checkValid,
};
