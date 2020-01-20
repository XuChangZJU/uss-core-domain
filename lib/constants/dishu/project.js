'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2020/1/20.
 */
var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation;

var type = {
    rand: 1, // 随堂打卡
    work: 2, // 考勤打卡
    sign: 3 // 签到打卡
};

var decodeType = function decodeType(t) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, type.rand, '随堂打卡'), _defineProperty(_S, type.work, '考勤打卡'), _defineProperty(_S, type.sign, '签到打卡'), _S);

    return S[t];
};

var state = {
    alive: 101,
    dead: 111
};

var decodeState = function decodeState(s) {
    var _S2;

    var S = (_S2 = {}, _defineProperty(_S2, state.alive, '活跃的'), _defineProperty(_S2, state.dead, '过期的'), _S2);

    return S[s];
};

var action = Object.assign({}, CommonAction, {
    makeDead: 111,
    createAttendance: 201,
    updateAttendance: 202
});

var decodeAction = function decodeAction(a) {
    var _S3;

    var S = (_S3 = {}, _defineProperty(_S3, action.makeDead, '使过期'), _defineProperty(_S3, action.createAttendance, '创建签到簿'), _defineProperty(_S3, action.updateAttendance, '修改签到簿'), _defineProperty(_S3, action.appendAttendanceWifiList, '为签到簿'), _S3);

    return S[a] || decodeCommonAction(a);
};

var STATE_TRAN_MATRIX = _defineProperty({}, action.makeDead, [state.alive, state.dead]);

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    type: type,
    decodeType: decodeType,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};