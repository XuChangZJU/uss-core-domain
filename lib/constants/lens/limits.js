'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2020/2/20.
 */
var _require = require('../action'),
    action = _require.action,
    decodeAction = _require.decodeAction;

var state = {
    active: 301,
    inactive: 401
};

var type = {
    quit: 1,
    entry: 2,
    leave: 3,
    attendance: 4,
    sellerOrganization: 5,
    peopleNeeded: 6
};
var decodeType = function decodeType(t) {
    var _T;

    var T = (_T = {}, _defineProperty(_T, type.quit, '离职'), _defineProperty(_T, type.entry, '入职'), _defineProperty(_T, type.leave, '请假'), _defineProperty(_T, type.attendance, '强制出勤'), _defineProperty(_T, type.sellerOrganization, '销售人员可出勤门店'), _defineProperty(_T, type.peopleNeeded, '门店人数需求'), _T);
    return T[t];
};
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.active, '生效中'), _defineProperty(_S, state.inactive, '已过期'), _S);

    return S[s];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    type: type,
    decodeType: decodeType,
    state: state,
    decodeState: decodeState
};