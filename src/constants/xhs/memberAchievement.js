/**
 * Created by Xc on 2020/8/20.
 */
const pick = require('lodash/pick');
const { action: CommonAction, decodeAction } = require('../action');


const action = pick(CommonAction, ['create','update','remove']);

module.exports = {
    action: action,
    decodeAction: decodeAction
}
