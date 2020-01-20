/**
 * Created by Administrator on 2020/1/20.
 */
const type = {
    rand: 1,            // 随堂打卡
    work: 2,            // 考勤打卡
    sign: 3,            // 签到打卡
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

module.exports = {
    type,
    decodeType,
    state,
    decodeState,
};
