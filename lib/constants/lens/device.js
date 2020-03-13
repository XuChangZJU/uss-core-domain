'use strict';

/**
 * Created by Xc on 2020/3/4.
 */

var _require = require('./common'),
    action = _require.action,
    decodeAction = _require.decodeAction,
    state = _require.state,
    decodeState = _require.decodeState,
    STATE_TRANS_MATRIX = _require.STATE_TRANS_MATRIX;

var connector = {
    software: '软件上传',
    hardware: '硬件上传',
    manual: '人工上传'
};

module.exports = {
    connector: connector,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};