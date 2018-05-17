/**
 * Created by Administrator on 2018/4/17.
 */
const values = require('lodash/values');
const { state: State } = require('../../constants/cheXiaoBao/stationConstant');
const { Roles } = require('../../constants/roleConstant2');

const isAvailable = (agency) => {
    return (agency.state === State.online);
};

const AvailableStatesWhere = {
    $eq: State.online,
};


module.exports = {
    isAvailable,
    AvailableStatesWhere,
};
