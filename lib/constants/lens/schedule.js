'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction;

var type = {
    normal: 1,
    askForLeave: 2,
    workOvertime: 3,
    outside: 4
};

var decodeType = function decodeType(t) {
    var _T;

    var T = (_T = {}, (0, _defineProperty3.default)(_T, type.normal, '正常'), (0, _defineProperty3.default)(_T, type.askForLeave, '请假'), (0, _defineProperty3.default)(_T, type.workOvertime, '加班'), (0, _defineProperty3.default)(_T, type.outside, '外勤'), _T);
    return T[t];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    type: type,
    decodeType: decodeType
};