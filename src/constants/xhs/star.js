/**
 * Created by Xc on 2020/9/27.
 */
const pick = require('lodash/pick');
const { action: CommonAction, decodeAction: decodeCommonAction } = require('../action');

const action = pick(CommonAction, ['update']);

const decodeAction = (a) => decodeCommonAction(a);

module.export={
    action,
    decodeAction,
};
