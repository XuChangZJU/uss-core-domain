'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Roles$ROOT$name;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/4/17.
 */
var values = require('lodash/values');

var _require = require('../../constants/cheXiaoBao/expressConstant'),
    State = _require.state;

var _require2 = require('../../constants/roleConstant2'),
    Roles = _require2.Roles;

var _require3 = require('../../utils/checkValidUtils'),
    checkConditionThrowString = _require3.checkConditionThrowString;

// 属性允许更新矩阵


var AttrsUpdateMatrix = (0, _defineProperty3.default)({}, Roles.ROOT.name, {
    price: [State.unposted],
    from: [State.unposted],
    to: [State.unposted],
    name: [State.unposted],
    number: [State.unposted]
});

// 状态允许更新矩阵
var StateTransformMatrix = (0, _defineProperty3.default)({}, Roles.ROOT.name, (_Roles$ROOT$name = {}, (0, _defineProperty3.default)(_Roles$ROOT$name, State.unposted, [State.posted, State.cancelled]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.posted, [State.sending, State.end]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.sending, [State.end]), _Roles$ROOT$name));

// 检查对象是否合法
var checkValid = function checkValid(express, assertFn) {
    var assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(express.state, 'express must have state');
    assertFn2(values(State).includes(express.state), 'invalid state');
    assertFn2(express.type, 'express must have type');
    assertFn2(express.from, 'express must have from');
    assertFn2(express.to, 'express must have to');
    assertFn2(express.materialCheckId, 'express must have materialCheckId');
};

module.exports = {
    AttrsUpdateMatrix: AttrsUpdateMatrix,
    StateTransformMatrix: StateTransformMatrix,
    checkValid: checkValid
};