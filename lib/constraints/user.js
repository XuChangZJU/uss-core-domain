'use strict';

var _Roles$ROOT$name;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/3/31.
 */
var _require = require('../constants/userConstant'),
    State = _require.userState;

var _require2 = require('../constants/roleConstant2'),
    Roles = _require2.Roles;

// 属性允许更新矩阵


var AttrsUpdateMatrix = _defineProperty({}, Roles.LOGGEDIN.name, {
    mobile: [State.normal],
    nickname: [State.normal],
    name: [State.normal],
    gender: [State.normal],
    head: [State.normal],
    city: [State.normal],
    province: [State.normal],
    country: [State.normal],
    password: [State.normal],
    cardNo: [State.normal],
    cardImage: [State.normal],
    cardType: [State.normal],
    birth: [State.normal]
});

// 状态允许更新矩阵
var StateTransformMatrix = _defineProperty({}, Roles.ROOT.name, (_Roles$ROOT$name = {}, _defineProperty(_Roles$ROOT$name, State.normal, [State.disabled, State.dangerous]), _defineProperty(_Roles$ROOT$name, State.dangerous, [State.normal]), _defineProperty(_Roles$ROOT$name, State.disabled, [State.normal]), _defineProperty(_Roles$ROOT$name, State.shadow, [State.normal]), _Roles$ROOT$name));

module.exports = {
    AttrsUpdateMatrix: AttrsUpdateMatrix,
    StateTransformMatrix: StateTransformMatrix
};