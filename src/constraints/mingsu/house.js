/**
 * Created by Administrator on 2018/4/17.
 */
const values = require('lodash/values');
const { state: State, type: Type, spec: Spec } = require('../../constants/mingsu/house');
const { Roles } = require('../../constants/roleConstant2');

const { checkConditionThrowString } = require('../../utils/checkValidUtils');
const { isPhone, isMobile } = require('../../validator/validator');
const ErrorCode = require('../../constants/errorCode');

const isAvailable = (house) => {
    return (house.state === State.online);
};

const AvailableStatesWhere = {
    state: State.online,
};

// 状态允许更新矩阵
const StateTransformMatrix = {
    [Roles.ROOT.name]: {
        [State.uncompleted]: [ State.online],
        [State.online]: [ State.offline, State.offlineByPlatform ],
        [State.offline]: [ State.online],
        [State.offlineByPlatform]: [State.online],
    },
};

function checkValid(house, assertFn) {
    const assertFn2 = assertFn || checkConditionThrowString;
    const { state, phone, bookingInfo, spec } = house;

    assertFn2(values(State).includes(house.state), `house must have state`);
    if (phone) {
        if (!isPhone(phone) && !isMobile(phone)) {
            throw ErrorCode.createErrorByCode(ErrorCode.errorLegalBodyError, '电话只能是XXXX-XXXXXXXX或者手机号格式');
        }
    }
    if (bookingInfo) {
        assertFn2(typeof bookingInfo === 'object');
    }
    if (spec) {
        assertFn2(values(Spec).includes(spec), 'invalid spec');
    }

    return;
}


module.exports = {
    isAvailable,
    AvailableStatesWhere,
    StateTransformMatrix,
    checkValid,

};
