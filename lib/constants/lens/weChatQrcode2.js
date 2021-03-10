'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2020/11/23.
 */
var type = {
    // diagnosis
    bindDiagnosis: 1,
    createOKGlassCheck: 2,
    appointment: 3
};

var decodeType = function decodeType(t) {
    var _TEXT;

    var TEXT = (_TEXT = {}, (0, _defineProperty3.default)(_TEXT, type.bindDiagnosis, '顾客绑定业务'), (0, _defineProperty3.default)(_TEXT, type.createOKGlassCheck, '顾客登记角膜塑形镜检查'), (0, _defineProperty3.default)(_TEXT, type.appointment, '预约'), _TEXT);

    return TEXT[t];
};

module.exports = {
    type: type,
    decodeType: decodeType
};