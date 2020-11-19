'use strict';

/**
 * Created by Xc on 2020/9/27.
 */
var pick = require('lodash/pick');

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var action = pick(CommonAction, ['create', 'update']);

var decodeAction = function decodeAction(a) {
  return decodeCommonAction(a);
};

module.exports = {
  action: action,
  decodeAction: decodeAction
};