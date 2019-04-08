'use strict';

/**
 * Created by Administrator on 2018/4/17.
 */
var values = require('lodash/values');

var _require = require('../../constants/mingsu/booking'),
    State = _require.state,
    Type = _require.type;

var _require2 = require('../../constants/roleConstant2'),
    Roles = _require2.Roles;

var _require3 = require('../../utils/checkValidUtils'),
    checkConditionThrowString = _require3.checkConditionThrowString;

var _require4 = require('../action'),
    StateTransformMatrix = _require4.StateTransformMatrixForPaid;

module.exports = {
  StateTransformMatrix: StateTransformMatrix
};