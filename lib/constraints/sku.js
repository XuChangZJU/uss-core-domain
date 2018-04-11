/**
 * Created by Administrator on 2018/3/29.
 */
'use strict';

const { state: State } = require('../constants/skuConstant');
const isAvailable = sku => {
    return sku.available < State.unavailable;
};

const AvailableStatesWhere = {
    $lt: State.unavailable
};

module.exports = {
    isAvailable,
    AvailableStatesWhere
};