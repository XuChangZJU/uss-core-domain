/**
 * Created by Administrator on 2018/4/17.
 */
const values = require('lodash/values');
const { state: State, type: Type } = require('../../constants/mingsu/booking');
const { Roles } = require('../../constants/roleConstant2');

const { checkConditionThrowString } = require('../../utils/checkValidUtils');

const { StateTransformMatrixForPaid: StateTransformMatrix } = require('../action');


module.exports = {
    StateTransformMatrix,
};
