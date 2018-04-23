/**
 * Created by Administrator on 2018/4/17.
 */
'use strict';

const source = {
    didi:   1,
};

const decodeSource = (s) => {
    const STRING = {
        [source.didi]: '滴滴代驾',
    };

    return STRING[s];
};

const type = {
    realTime: 0,
    booking: 1,
};

const decodeType = (t) => {
    const STRING = {
        [type.realTime]: '实时单',
        [type.booking]: '预约单',
    };

    return STRING[t];
};

const state = {
    init:       0,      // 未下单
    fresh:       1,       // 新单
    cancelled:  2,     // 已取消
    expired:    3,     // 已超时
    accepted:   4,     // 已接单
    arrived:    5,     // 已到达
    started:    6,     // 开始服务
    finished:   7,     // 服务完成
    cleared:    8,     // 计费完成

    driverCancelled: 101,       // 司机取消
};

const decodeState = (s) => {
    const STRINGS = {
        [state.init]:             '初始',
        [state.fresh]:            '已下单',
        [state.cancelled]:       '已取消',
        [state.expired]:         '已过期',
        [state.accepted]:        '已接单',
        [state.arrived]:         '司机已到达',
        [state.started]:         '服务开始',
        [state.finished]:        '服务结束',
        [state.cleared]:         '结算完成',
        [state.driverCancelled]: '司机取消',
    };
    return STRINGS[s];
};

module.exports = {
    source,
    decodeSource,
    type,
    decodeType,
    state,
    decodeState,
};
