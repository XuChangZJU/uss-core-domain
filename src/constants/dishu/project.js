/**
 * Created by Administrator on 2020/1/20.
 */
const {
    action: CommonAction,
    decodeAction: decodeCommonAction,
    relation, decodeRelation
} = require('../action');

const type = {
    rand: 1,            // 随堂打卡
    work: 2,            // 考勤打卡
    sign: 3,            // 签到打卡
};

/**
 * static指静态打卡，即在创建打卡的时候就要收集信息
 * @param t
 */
const isTypeStatic = (t) => {
    return [type.work, type.sign].includes(t);
};

const decodeType = (t) => {
    const S = {
        [type.rand]: '随堂打卡',
        [type.work]: '考勤打卡',
        [type.sign]: '签到打卡',
    };

    return S[t];
};

const state = {
    alive: 101,
    dead: 111,
};

const decodeState = (s) => {
    const S = {
        [state.alive]: '活跃的',
        [state.dead]: '过期的',
    };

    return S[s];
};

const action = Object.assign({}, CommonAction, {
    makeDead: 111,
    createAttendance: 201,
    updateAttendance: 202,
});

const decodeAction = (a) => {
    const S = {
        [action.makeDead]: '使过期',
        [action.createAttendance]: '创建签到簿',
        [action.updateAttendance]: '修改签到簿',
        [action.appendAttendanceWifiList]: '为签到簿'
    };

    return S[a] || decodeCommonAction(a);
};


const STATE_TRAN_MATRIX = {
    [action.makeDead]: [state.alive, state.dead],
};

module.exports = {
    relation,
    decodeRelation,
    type,
    decodeType,
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRAN_MATRIX,
    isTypeStatic,
};
