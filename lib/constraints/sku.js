/**
 * Created by Administrator on 2018/3/29.
 */
'use strict';

const { available: Available } = require('../constants/skuConstant');
const isAvailable = sku => {
    return sku.available < Available.unavailable;
};

const AvailableStatesWhere = {
    $lt: Available.unavailable
};

module.exports = {
    isAvailable,
    AvailableStatesWhere
};