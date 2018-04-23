/**
 * Created by Administrator on 2018/4/17.
 */
'use strict';

const { type: StationType } = require('./stationConstant');

const state = {
    unpaid: 10, // 未支付
    paid: 20, // 已支付
    matching1: 25, // 已呼叫司机1
    wfd1: 30, // 等待司机（取车）
    da1: 40, // 司机已到
    onWay1: 50, // 去的路上
    wfs: 60, // 等待服务
    served: 70, // 服务中
    serveEnd: 80, // 服务完成
    matching2: 85, // 已呼叫司机2
    wfd2: 90, // 等待司机（还车）
    da2: 100, // 司机已到
    onWay2: 110, // 回去的路上
    wfr: 120, // 等待收车
    end: 400, // 收车完成
    end2: 401, // 人工介入完成

    emergent: 701, // 服务完没有司机接单（必须人工介入处理）

    cancelled2: 1003, // 支付后放弃
    failed1: 1004, // 没有司机接单

    init: 10000, // 初始
    cancelled1: 10001, // 主动放弃
    expired: 10002 // 超时

};

const decodeState = s => {
    const STRINGS = {
        [state.init]: '初始',
        [state.unpaid]: '未支付',
        [state.paid]: '寻找司机',
        [state.matching1]: '正在寻找司机',
        [state.wfd1]: '等待司机取车',
        [state.da1]: '司机到达取车点',
        [state.onWay1]: '去目的地途中',
        [state.wfs]: '等待服务',
        [state.served]: '正在服务中',
        [state.matching2]: '正在寻找司机',
        [state.serveEnd]: '服务完成',
        [state.wfd2]: '等待司机还车',
        [state.da2]: '司机到达还车点',
        [state.onWay2]: '归途中',
        [state.wfr]: '等待车主收车',
        [state.end]: '已完成',
        [state.end2]: '已完成',

        [state.emergent]: '等待人工处理',

        [state.cancelled1]: '已放弃',
        [state.expired]: '已超时',
        [state.cancelled2]: '已放弃',
        [state.failed1]: '已关闭'
    };

    return STRINGS[s];
};

const type = StationType;

const decodeType = t => {
    const STRINGS = {
        [StationType.check]: '年检'
    };

    return STRINGS[t];
};

module.exports = {
    state,
    type,
    decodeState,
    decodeType
};