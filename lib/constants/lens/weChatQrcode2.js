'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2020/11/23.
 */
var type = {
    // diagnosis
    bindDiagnosis: 1,
    createOKGlassCheck: 2
};

var decodeType = function decodeType(t) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, type.bindDiagnosis, '顾客绑定业务'), _defineProperty(_TEXT, type.createOkGlassCheck, '顾客登记角膜塑形镜检查'), _TEXT);

    return TEXT[t];
};

module.exports = {
    type: type,
    decodeType: decodeType
};