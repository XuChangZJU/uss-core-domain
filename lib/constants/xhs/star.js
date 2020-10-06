'use strict';

/**
 * Created by Xc on 2020/9/27.
 */
var pick = require('lodash/pick');

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var action = pick(CommonAction, ['update']);

var decodeAction = function decodeAction(a) {
  return decodeCommonAction(a);
};

module.export = {
  action: action,
  decodeAction: decodeAction
};