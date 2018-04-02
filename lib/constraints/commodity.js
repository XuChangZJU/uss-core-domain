/**
 * Created by Administrator on 2018/3/29.
 */
'use strict';

const { available: Available } = require('../constants/commodityConstant');
const isAvailable = commodity => {
    return commodity.available < Available.unavailable;
};

const AvailableStatesWhere = {
    $lt: Available.unavailable
};

module.exports = {
    isAvailable,
    AvailableStatesWhere
};