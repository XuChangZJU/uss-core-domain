'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2020/8/20.
 */
var pick = require('lodash/pick');

var _require = require('../action'),
    CommonAction = _require.action,
    decodeAction = _require.decodeAction;

var role = {
    teacher: 1,
    graduate: 2,
    student: 3
};

var roleColor = {
    colorTeacher: 1,
    colorGraduate: 2,
    colorStudent: 3
};
var decodeRole = function decodeRole(r) {
    var _T;

    var T = (_T = {}, (0, _defineProperty3.default)(_T, role.teacher, '教师'), (0, _defineProperty3.default)(_T, role.graduate, '研究生'), (0, _defineProperty3.default)(_T, role.student, '学生'), _T);

    return T[r];
};

var decodeRoleColor = function decodeRoleColor(r) {
    var _T2;

    var T = (_T2 = {}, (0, _defineProperty3.default)(_T2, roleColor.colorTeacher, '#FA7474'), (0, _defineProperty3.default)(_T2, roleColor.colorGraduate, '#396A9F'), (0, _defineProperty3.default)(_T2, roleColor.colorStudent, '#68A0DD'), _T2);

    return T[r];
};

var action = pick(CommonAction, ['update']);

module.exports = {
    role: role,
    roleColor: roleColor,
    decodeRole: decodeRole,
    decodeRoleColor: decodeRoleColor,
    action: action,
    decodeAction: decodeAction
};