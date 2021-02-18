'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var T = (_T = {}, (0, _defineProperty3.default)(_T, type.quit, '离职'), (0, _defineProperty3.default)(_T, type.entry, '入职'), (0, _defineProperty3.default)(_T, type.leave, '请假'), (0, _defineProperty3.default)(_T, type.attendance, '强制出勤'), (0, _defineProperty3.default)(_T, type.sellerOrganization, '销售人员可出勤门店'), (0, _defineProperty3.default)(_T, type.peopleNeeded, '门店人数需求'), _T);
    return T[t];
};
var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.active, '生效中'), (0, _defineProperty3.default)(_S, state.inactive, '已过期'), _S);

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