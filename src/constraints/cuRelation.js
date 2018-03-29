/**
 * Created by Administrator on 2018/3/29.
 */
'use strict';

const { relationState } = require('../constants/commodityApplicationConstant');

const isAvailable = (cuRelation) => {
    return [relationState.avail, relationState.root].includes(cuRelation.state);
};

module.exports = {
    isAvailable,
};
