'use strict';

/**
 * Created by Xc on 2020/8/20.
 */
var pick = require('lodash/pick');

var _require = require('../action'),
    CommonAction = _require.action,
    decodeAction = _require.decodeAction;

var sort = 1;

var action = pick(CommonAction, ['create', 'update', 'remove']);

module.exports = {
    sort: sort,
    action: action,
    decodeAction: decodeAction
};