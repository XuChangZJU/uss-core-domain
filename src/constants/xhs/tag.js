/**
 * Created by Xc on 2020/11/12.
 */
const pick = require('lodash/pick');
const assign = require('lodash/assign');
const { action: CommonAction, decodeAction: decodeCommonAction } = require('../action');


const action = pick(CommonAction, ['create', 'remove']);
const decodeAction = (a) => decodeCommonAction(a);

const data = {
    member: {
        goodGrad: 'goodGrad',
    },
    material: {
        competition: 'competition',
    }
};

const decoder = (entity, tag) => {
    const STR = {
        member: {
            goodGrad: '优秀毕业生',
        },
        material: {
            competition: '竞赛',
        },
    };

    return STR[entity][tag];
};

const def = {
    data,
    decoder,
};


module.exports = {
    action,
    decodeAction,

    def,
};
