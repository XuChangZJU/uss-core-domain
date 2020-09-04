/**
 * Created by Xc on 2020/8/20.
 */
const pick = require('lodash/pick');
const { action: CommonAction, decodeAction } = require('../action');

var sort=1;

const action = pick(CommonAction, ['create','update','remove']);

module.exports = {
    sort,
    action,
    decodeAction,
}
