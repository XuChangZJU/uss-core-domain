/**
 * Created by Xc on 2020/8/20.
 */
const pick = require('lodash/pick');
const { action: CommonAction, decodeAction } = require('../action');

const role = {
    teacher: 1,
    graduate: 2,
    student: 3,
    colorA: 1,
    colorB: 2,
    colorC: 3,
};

const decodeRole = (r) => {
    const T = {
        [role.teacher]: '教师',
        [role.graduate]: '研究生',
        [role.student]: '学生',
        [role.colorA]: '#FA7474',
        [role.colorB]: '#396A9F',
        [role.colorC]: '#68A0DD',
    };

    return T[r];
};

const action = pick(CommonAction, ['update']);

module.exports = {
    role,
    decodeRole,
    action,
    decodeAction,
};
