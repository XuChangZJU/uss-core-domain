'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2021/1/8.
 */
var type = {
    enumerable: 1,
    assignable: 2
};

var decodeType = function decodeType(t) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, type.enumerable, '枚举的'), _defineProperty(_TEXT, type.assignable, '赋值的'), _TEXT);

    return TEXT[t];
};

module.exports = {
    type: type,
    decodeType: decodeType
};