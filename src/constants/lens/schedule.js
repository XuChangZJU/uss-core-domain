
const {
    action,
    decodeAction,
} = require('../action');

const type = {
    askForLeave: 1,
    workOvertime: 2,
    outside: 3,
}

const decodeType = (t) => {
    const T = {
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