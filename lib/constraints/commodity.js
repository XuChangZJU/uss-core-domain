/**
 * Created by Administrator on 2018/3/29.
 */
'use strict';

var _require = require('../constants/commodityConstant'),
    Available = _require.available;

var isAvailable = function isAvailable(commodity) {
    return commodity.available < Available.unavailable;
};

var AvailableStatesWhere = {
    $lt: Available.unavailable
};

module.exports = {
    isAvailable: isAvailable,
    AvailableStatesWhere: AvailableStatesWhere
};