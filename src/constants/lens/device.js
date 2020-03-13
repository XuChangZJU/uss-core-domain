/**
 * Created by Xc on 2020/3/4.
 */

const {
    action,
    decodeAction,
    state,
    decodeState,
    STATE_TRANS_MATRIX,
} = require('./common');

const connector = {
    software: '软件上传',
    hardware: '硬件上传',
    manual: '人工上传',
};

module.exports = {
    connector,
    state,
    decodeState,
    action,
    decodeAction,
    STATE_TRANS_MATRIX,
};
