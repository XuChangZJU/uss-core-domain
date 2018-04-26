/**
 * Created by Administrator on 2018/4/17.
 */
const values = require('lodash/values');
const { state: State, source: Source } = require('../../constants/cheXiaoBao/driverProxyConstant');
const { Roles } = require('../../constants/roleConstant2');

const { checkMobile } = require('../../utils/stringUtils');
const { checkConditionThrowString } = require('../../utils/checkValidUtils');

const isAvailable = (dp) => {
    return [State.accepted, State.arrived, State.started, State.finished].includes(dp.state);
};

const AvailableStatesWhere = {
    $in: [State.accepted, State.arrived, State.started, State.finished],
};

// 属性允许更新矩阵
const AttrsUpdateMatrix = {
    [Roles.ROOT.name]: {
        driverName: [
            State.fresh,
        ],
        driverMob: [
            State.fresh,
        ],
        data: [
            State.fresh,
        ],
        externalOid: [
            State.init,
        ],
    },
};

// 状态允许更新矩阵
const StateTransformMatrix = {
    [Roles.ROOT.name]: {
        [State.init]: [State.cancelled, State.fresh],
        [State.fresh]: [ State.cancelled, State.expired, State.accepted ],
        [State.accepted]: [ State.cancelled, State.arrived, State.driverCancelled ],
        [State.arrived]: [ State.cancelled, State.started, State.driverCancelled ],
        [State.started]: [ State.finished ],
        [State.finished]: [ State.cleared ],
    },
};


// 检查对象是否合法
const checkValid = (driverProxy, assertFn) => {
    const assertFn2 = assertFn || checkConditionThrowString;

    assertFn2(driverProxy.source, 'driverProxy must have source');
    assertFn2(driverProxy.state, 'driverProxy must have state');
    assertFn2(values(Source).includes(driverProxy.source), 'invalid source');
    assertFn2(values(State).includes(driverProxy.state), 'invalid state');
    assertFn2(driverProxy.agencyId, 'driverProxy must have agency');
    if (driverProxy.driverMob) {
        assertFn2(checkMobile(driverProxy.driverMob), 'driverMob must be legal mobile');
    }
};


module.exports = {
    isAvailable,
    AvailableStatesWhere,
    AttrsUpdateMatrix,
    StateTransformMatrix,
    checkValid,
};
