'use strict';

var pick = require('lodash/pick');

var _require = require('../action'),
    CommonAction = _require.action,
    decodeAction = _require.decodeAction;

var action = pick(CommonAction, ['create', 'update', 'remove']);

module.exports = {
  action: action,
  decodeAction: decodeAction
};