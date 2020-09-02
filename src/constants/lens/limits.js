/**
 * Created by Xc on 2020/2/20.
 */
const {
    action,
    decodeAction,
} = require('../action');

const state = {
    active: 301,
    inactive: 401,
};

const type = {
    quit: 1,
    entry: 2,
    leave: 3,
    attendance: 4,
    sellerOrganization: 5,
    peopleNeeded: 6,
}
const decodeType = (t) => {
    const T = {
        [type.quit]: '离职',
        [type.entry]: '入职',
        [type.leave]: '请假',
        [type.attendance]: '强制出勤',
        [type.sellerOrganization]: '销售人员可出勤门店',
        [type.peopleNeeded]: '门店人数需求',
    }
    return T[t];
}
const decodeState = (s) => {
    const S = {
        [state.active]: '生效中',
        [state.inactive]: '已过期',
    };

    return S[s];
};


module.exports = {
    action,
    decodeAction,
    type,
    decodeType,
    state,
    decodeState,
};
