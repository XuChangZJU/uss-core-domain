/**
 * Created by Xc on 2021/1/8.
 */
const part = {
    '平台': 'platform',
    '微信': 'weChat',
    '店铺': 'shop',
    '线上获客': 'onlineGuide',
    '线下获客': 'realGuide',
    '用户': 'user',
    '商户': 'merchant',
};

const { data: TagData } = require('./tag');
const { user: UserTag } = TagData;

const OnlineGuideTags = Object.keys(UserTag).filter(
    tag => ['顾客'].includes(UserTag[tag])
);

const RealGuideTags = Object.keys(UserTag).filter(
    tag => ['导游', '的士司机', '特权者'].includes(UserTag[tag])
);

module.exports = {
    part,
    OnlineGuideTags,
    RealGuideTags,
};
