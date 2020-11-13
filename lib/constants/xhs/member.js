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
    student: 3,
    colorA: 1,
    colorB: 2,
    colorC: 3
};

var decodeRole = function decodeRole(r) {
    var _T;

    var T = (_T = {}, _defineProperty(_T, role.teacher, '教师'), _defineProperty(_T, role.graduate, '研究生'), _defineProperty(_T, role.student, '学生'), _defineProperty(_T, role.colorA, '#FA7474'), _defineProperty(_T, role.colorB, '#396A9F'), _defineProperty(_T, role.colorC, '#68A0DD'), _T);

    return T[r];
};

var action = pick(CommonAction, ['update']);

module.exports = {
    role: role,
    decodeRole: decodeRole,
    action: action,
    decodeAction: decodeAction
};