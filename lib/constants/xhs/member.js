'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    colorTeacher: 10,
    colorGraduate: 11,
    colorStudent: 12
};
var decodeRole = function decodeRole(r) {
    var _T;

    var T = (_T = {}, _defineProperty(_T, role.teacher, '教师'), _defineProperty(_T, role.graduate, '研究生'), _defineProperty(_T, role.student, '学生'), _T);

    return T[r];
};

var decodeRoleColor = function decodeRoleColor(r) {
    var _T2;

    var T = (_T2 = {}, _defineProperty(_T2, roleColor.colorTeacher, '#FA7474'), _defineProperty(_T2, roleColor.colorGraduate, '#396A9F'), _defineProperty(_T2, roleColor.colorStudent, '#68A0DD'), _T2);

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