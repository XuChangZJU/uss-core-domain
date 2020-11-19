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
        goodGrad: '优秀毕业生',
        manager: '管理员',
        engineer: '工程部成员'
    },
    material: {
        competition: '竞赛',
    }
};

const def = {
    data,
};


module.exports = {
    action,
    decodeAction,

    def,
};
