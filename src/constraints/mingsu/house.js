/**
 * Created by Administrator on 2018/4/17.
 */
const values = require('lodash/values');
const { state: State, type: Type } = require('../../constants/mingsu/house');
const { Roles } = require('../../constants/roleConstant2');

const { checkConditionThrowString } = require('../../utils/checkValidUtils');

const isAvailable = (house) => {
    return (house.state === State.online);
};

const AvailableStatesWhere = {
    $eq: State.online,
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


module.exports = {
    isAvailable,
    AvailableStatesWhere,
    StateTransformMatrix,
};
