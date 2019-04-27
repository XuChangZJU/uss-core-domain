'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Roles$ROOT$name;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/4/17.
 */
var values = require('lodash/values');

var _require = require('../../constants/mingsu/house'),
    State = _require.state,
    Type = _require.type,
    Spec = _require.spec;

var _require2 = require('../../constants/roleConstant2'),
    Roles = _require2.Roles;

var _require3 = require('../../utils/checkValidUtils'),
    checkConditionThrowString = _require3.checkConditionThrowString;

var _require4 = require('../../validator/validator'),
    isPhone = _require4.isPhone,
    isMobile = _require4.isMobile;

var ErrorCode = require('../../constants/errorCode');

var isAvailable = function isAvailable(house) {
    return house.state === State.online;
};

var AvailableStatesWhere = {
    state: State.online
};

// 状态允许更新矩阵
var StateTransformMatrix = _defineProperty({}, Roles.ROOT.name, (_Roles$ROOT$name = {}, _defineProperty(_Roles$ROOT$name, State.uncompleted, [State.online]), _defineProperty(_Roles$ROOT$name, State.online, [State.offline, State.offlineByPlatform]), _defineProperty(_Roles$ROOT$name, State.offline, [State.online]), _defineProperty(_Roles$ROOT$name, State.offlineByPlatform, [State.online]), _Roles$ROOT$name));

function checkValid(house, assertFn) {
    var assertFn2 = assertFn || checkConditionThrowString;
    var state = house.state,
        phone = house.phone,
        bookingInfo = house.bookingInfo,
        spec = house.spec;


    assertFn2(values(State).includes(house.state), 'house must have state');
    if (phone) {
        if (!isPhone(phone) && !isMobile(phone)) {
            throw ErrorCode.createErrorByCode(ErrorCode.errorLegalBodyError, '电话只能是XXXX-XXXXXXXX或者手机号格式');
        }
    }
    if (bookingInfo) {
        assertFn2((typeof bookingInfo === 'undefined' ? 'undefined' : _typeof(bookingInfo)) === 'object');
    }
    if (spec) {
        assertFn2(values(Spec).includes(spec), 'invalid spec');
    }

    return;
}

module.exports = {
    isAvailable: isAvailable,
    AvailableStatesWhere: AvailableStatesWhere,
    StateTransformMatrix: StateTransformMatrix,
    checkValid: checkValid

};