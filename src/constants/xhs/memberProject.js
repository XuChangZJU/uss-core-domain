/**
 * Created by Xc on 2020/9/26.
 */

const pick = require('lodash/pick');
const { action: CommonAction, decodeAction: decodeCommonAction } = require('../action');

const action = assign(
    pick(CommonAction, ['create','update','remove']), {
        exchange: 101,
    }
);

const decodeAction = (a) => {
    const T = {
        [action.exchange]: '交换顺序',
    };

    return T[a] || decodeCommonAction(a);
};

module.exports = {
    action,
    decodeAction,
}
