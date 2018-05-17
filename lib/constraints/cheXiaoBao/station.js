'use strict';

/**
 * Created by Administrator on 2018/4/17.
 */
var values = require('lodash/values');

var _require = require('../../constants/cheXiaoBao/stationConstant'),
    State = _require.state;

var _require2 = require('../../constants/roleConstant2'),
    Roles = _require2.Roles;

var isAvailable = function isAvailable(agency) {
    return agency.state === State.online;
};

var AvailableStatesWhere = {
    $eq: State.online
};

module.exports = {
    isAvailable: isAvailable,
    AvailableStatesWhere: AvailableStatesWhere
};