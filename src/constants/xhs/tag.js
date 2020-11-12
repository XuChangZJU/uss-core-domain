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

const decoder = {
    decodeMember: (tag) => {
        const { goodGrad } = data.member;
        const STRING = {
            [goodGrad]: '优秀毕业生',
        };

        return STRING[tag];
    },
    decodeMaterial: (tag) => {
        const { competition } = data.material;

        const STRING = {
            [competition]: '竞赛',
        };

        return STRING[tag];
    },
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
