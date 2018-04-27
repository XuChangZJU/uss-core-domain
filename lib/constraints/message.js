'use strict';

var _Roles$ROOT$name;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/4/17.
 */
var values = require('lodash/values');

var _require = require('../constants/messageConstant'),
    State = _require.state,
    Origin = _require.origin,
    Weight = _require.weight;

var _require2 = require('../constants/roleConstant2'),
    Roles = _require2.Roles;

var _require3 = require('../utils/checkValidUtils'),
    checkConditionThrowString = _require3.checkConditionThrowString;

// 状态允许更新矩阵


var StateTransformMatrix = _defineProperty({}, Roles.ROOT.name, (_Roles$ROOT$name = {}, _defineProperty(_Roles$ROOT$name, State.init, [State.sending, State.fatal]), _defineProperty(_Roles$ROOT$name, State.sending, [State.failure, State.success, State.fatal]), _defineProperty(_Roles$ROOT$name, State.failure, [State.sending]), _Roles$ROOT$name));

// 检查对象是否合法
var checkValid = function checkValid(message, assertFn) {
    var assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(message.typeId, 'message must have type');
    assertFn2(message.state, 'message must have weight');
    assertFn2(message.state, 'message must have state');
    assertFn2(values(Weight).includes(message.weight), 'invalid weight');
};

module.exports = {
    StateTransformMatrix: StateTransformMatrix,
    checkValid: checkValid
};