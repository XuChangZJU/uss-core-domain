/**
 * Created by Administrator on 2016/12/25.
 */
'use strict';

const state = {
    init: 0,
    done: 201
};

const STRING_OF_STATES = {
    [state.init]: "初始化",
    [state.done]: "补偿完成"
};

const decodeState = s => {
    return STRING_OF_STATES[s];
};

module.exports = {
    state,
    decodeState
};