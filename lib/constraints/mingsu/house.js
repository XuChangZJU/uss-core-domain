'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Roles$ROOT$name;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var StateTransformMatrix = (0, _defineProperty3.default)({}, Roles.ROOT.name, (_Roles$ROOT$name = {}, (0, _defineProperty3.default)(_Roles$ROOT$name, State.uncompleted, [State.online]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.online, [State.offline, State.offlineByPlatform]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.offline, [State.online]), (0, _defineProperty3.default)(_Roles$ROOT$name, State.offlineByPlatform, [State.online]), _Roles$ROOT$name));

function checkValid(house, assertFn) {
    var assertFn2 = assertFn || checkConditionThrowString;
    var state = house.state,
        phone = house.phone,
        bookingInfo = house.bookingInfo,
        spec = house.spec;


    assertFn2(values(State).includes(house.state), 'house must have state');
    // if (phone) {
    //     if (!isPhone(phone) && !isMobile(phone)) {
    //         throw ErrorCode.createErrorByCode(ErrorCode.errorLegalBodyError, '电话只能是XXXX-XXXXXXXX或者手机号格式');
    //     }
    // }
    if (bookingInfo) {
        assertFn2((typeof bookingInfo === 'undefined' ? 'undefined' : (0, _typeof3.default)(bookingInfo)) === 'object');
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