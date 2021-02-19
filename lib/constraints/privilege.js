'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/8/31.
 */
var values = require('lodash/values');

var _require = require('../constants/privilege'),
    State = _require.state;

var _require2 = require('../constants/roleConstant2'),
    Roles = _require2.Roles;

var _require3 = require('../utils/checkValidUtils'),
    checkConditionThrowString = _require3.checkConditionThrowString;

// 属性允许更新矩阵


var AttrsUpdateMatrix = (0, _defineProperty3.default)({}, Roles.ROOT.name, {
    startsAt: [State.unpaid],
    endsAt: [State.unpaid, State.legal],
    price: [State.unpaid]
});

// 状态允许更新矩阵

var _require4 = require('./action'),
    StateTransformMatrix = _require4.StateTransformMatrix;

// 检查对象是否合法


var checkValid = function checkValid(privilege, assertFn) {
    var assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(privilege.state, 'privilege must have state');
    assertFn2(values(State).includes(privilege.state), 'invalid state');
    if (privilege.beginsAt) {
        assertFn2(privilege.endsAt, 'privilege must have or not have beginsAt and endsAt concurrently');
        assertFn2(privilege.endsAt > privilege.beginsAt, 'endsAt must be large than beginsAt');
    }
};

module.exports = {
    AttrsUpdateMatrix: AttrsUpdateMatrix,
    StateTransformMatrix: StateTransformMatrix,
    checkValid: checkValid
};