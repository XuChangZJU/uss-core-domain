/**
 * Created by Administrator on 2018/3/29.
 */
'use strict';

var _require = require('../constants/commodityApplicationConstant'),
    relationState = _require.relationState;

var isAvailable = function isAvailable(cuRelation) {
    return [relationState.avail, relationState.root].includes(cuRelation.state);
};

var AvailableStatesWhere = { $in: [relationState.avail, relationState.root] };

module.exports = {
    isAvailable: isAvailable,
    AvailableStatesWhere: AvailableStatesWhere
};