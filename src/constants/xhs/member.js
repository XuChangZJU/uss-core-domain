/**
 * Created by Xc on 2020/8/20.
 */
const pick = require('lodash/pick');
const { action: CommonAction, decodeAction } = require('../action');

const role = {
    teacher: 1,
    graduate: 2,
    student: 3,
};

const roleColor = {
    colorTeacher: 10,
    colorGraduate: 11,
    colorStudent: 12,
};
const decodeRole = (r) => {
    const T = {
        [role.teacher]: '教师',
        [role.graduate]: '研究生',
        [role.student]: '学生',
    };

    return T[r];
};

const decodeRoleColor = (r) => {
    const T = {
        [roleColor.colorTeacher]: '#FA7474',
        [roleColor.colorGraduate]: '#396A9F',
        [roleColor.colorStudent]: '#68A0DD',
    };

    return T[r];
};

const action = pick(CommonAction, ['update']);

module.exports = {
    role,
    roleColor,
    decodeRole,
    decodeRoleColor,
    action,
    decodeAction,
};
