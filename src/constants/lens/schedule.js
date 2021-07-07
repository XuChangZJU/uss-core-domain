
const {
    action,
    decodeAction,
} = require('../action');

const type = {
    normal: 1,
    askForLeave: 2,
    workOvertime: 3,
    outside: 4,
}

const decodeType = (t) => {
    const T = {
        [type.normal]: '正常上班',
        [type.askForLeave]: '请假',
        [type.workOvertime]: '加班',
        [type.outside]: '外勤',
    }
    return T[t];
}

module.exports = {
    action,
    decodeAction,
    type,
    decodeType,
};