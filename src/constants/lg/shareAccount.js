const pick = require('lodash/pick');
const { action: CommonAction, decodeAction } = require('../action');

const type = {
    company: 1,
};

const decodeType = (t) => {
    const DICT = {
        [type.company]: '获客机构',
    };
    return DICT[t];
};

const action = pick(CommonAction, ['create', 'update', 'remove']);

module.exports = {
    type,
    decodeType,
    action,
    decodeAction,
};
