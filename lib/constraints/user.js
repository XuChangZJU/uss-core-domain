'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Roles$ROOT$name;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/3/31.
 */
var _require = require('../constants/userConstant'),
    State = _require.userState;

var _require2 = require('../constants/roleConstant2'),
    Roles = _require2.Roles;

// 属性允许更新矩阵


var AttrsUpdateMatrix = (0, _defineProperty3.default)({}, Roles.LOGGEDIN.name, {
    mobile: [State.normal, State.shadow],
    nickname: [State.normal, State.shadow],
    name: [State.normal, State.shadow],
    gender: [State.normal, State.shadow],
    head: [State.normal, State.shadow],
    city: [State.normal, State.shadow],
    province: [State.normal, State.shadow],
    country: [State.normal, State.shadow],
    password: [State.normal, State.shadow],
    cardNo: [State.normal, State.shadow],
    cardImage: [State.normal, State.shadow],
    cardType: [State.normal, State.shadow],
    birth: [State.normal, State.shadow],
    _updateAt_: [State.normal, State.shadow]
});

// 状态允许更新矩阵
var StateTransformMatrix = (0, _defineProperty3.default)({}, Roles.ROOT.name, (_Roles$ROOT$name = {}, (0, _defineProperty3.default)(_Roles$ROOT$name, State.normal, [State.disabled, State.dangerous]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.dangerous, [State.normal]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.disabled, [State.normal]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.shadow, [State.normal]), _Roles$ROOT$name));

module.exports = {
    AttrsUpdateMatrix: AttrsUpdateMatrix,
    StateTransformMatrix: StateTransformMatrix
};