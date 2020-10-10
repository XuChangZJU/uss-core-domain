/**
 * Created by Xc on 2020/9/26.
 */

const pick = require('lodash/pick');
const assign = require('lodash/assign');
const { action: CommonAction, decodeAction: decodeCommonAction } = require('../action');

const action = assign(
    pick(CommonAction, ['create','update','remove']), {
        try: 101,
        share: 102,
    }
);

const decodeAction = (a) => {
    const T = {
        [action.try]: '试用',
        [action.share]: '分享',
    };

    return T[a] || decodeCommonAction(a);
};

const type = {
    app: 1,
    mp: 2,
    web: 3,
};

const decodeType = (t) => {
    const T = {
        [type.app]: 'App',
        [type.mp]: '小程序',
        [type.web]: '网页',
    };

    return T[t];
};

module.exports = {
    action,
    decodeAction,
    type,
    decodeType,
};
