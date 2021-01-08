'use strict';

var _STATE_TRANS_MATRIX;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2021/1/8.
 */
var part = {
    '平台': 'platform',
    '微信': 'weChat',
    '店铺': 'shop',
    '线上获客': 'onlineGuide',
    '线下获客': 'realGuide',
    '用户': 'user',
    '商户': 'merchant'
};

var _require = require('./tag'),
    TagData = _require.data;

var UserTag = TagData.user;


var OnlineGuideTags = Object.keys(UserTag).filter(function (tag) {
    return ['顾客'].includes(UserTag[tag]);
});

var RealGuideTags = Object.keys(UserTag).filter(function (tag) {
    return ['导游', '的士司机', '特权者'].includes(UserTag[tag]);
});

var state = {
    unshared: 1001,
    sharing: 1011,
    shared: 1021,
    partialReturned: 1031,
    returned: 1032,
    failed: 1050
};

var decodeState = function decodeState(s) {
    var _TEXT;

    var TEXT = (_TEXT = {}, _defineProperty(_TEXT, state.unshared, '未分配的'), _defineProperty(_TEXT, state.sharing, '分配中'), _defineProperty(_TEXT, state.shared, '分配完成'), _defineProperty(_TEXT, state.partialReturned, '部分回退'), _defineProperty(_TEXT, state.returned, '已回退'), _TEXT);

    return TEXT[s];
};

var action = {
    share: 1011,
    shareCompleted: 1021,
    shareFailed: 1050,
    returnPartially: 1031,
    return: 1032.
};

var decodeAction = function decodeAction(a) {
    var _TEXT2;

    var TEXT = (_TEXT2 = {}, _defineProperty(_TEXT2, action.share, '分配'), _defineProperty(_TEXT2, action.shareCompleted, '分配完成'), _defineProperty(_TEXT2, action.shareFailed, '分配失败'), _defineProperty(_TEXT2, action.returnPartially, '部分回退'), _defineProperty(_TEXT2, action.return, '回退'), _TEXT2);

    return TEXT[a];
};

var STATE_TRANS_MATRIX = (_STATE_TRANS_MATRIX = {}, _defineProperty(_STATE_TRANS_MATRIX, action.share, [state.unshared, state.sharing]), _defineProperty(_STATE_TRANS_MATRIX, action.shareCompleted, [state.sharing, state.shared]), _defineProperty(_STATE_TRANS_MATRIX, action.shareFailed, [state.sharing, state.failed]), _defineProperty(_STATE_TRANS_MATRIX, action.returnPartially, [[state.shared, state.partialReturned], state.partialReturned]), _defineProperty(_STATE_TRANS_MATRIX, action.return, [[state.shared, state.partialReturned], state.returned]), _STATE_TRANS_MATRIX);

module.exports = {
    part: part,
    OnlineGuideTags: OnlineGuideTags,
    RealGuideTags: RealGuideTags,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};