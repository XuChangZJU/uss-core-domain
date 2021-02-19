'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2021/1/8.
 */
var part = {
    '平台': 'platform',
    '微信': 'weChat',
    '店铺': 'shop',
    '线上获客': 'onlineGuide',
    '线下获客': 'realGuide',
    '用户': 'user',
    '商户': 'merchant'
};

var _require = require('./tag'),
    TagData = _require.data;

var UserTag = TagData.user;


var OnlineGuideTags = (0, _keys2.default)(UserTag).filter(function (tag) {
    return ['顾客'].includes(UserTag[tag]);
});

var RealGuideTags = (0, _keys2.default)(UserTag).filter(function (tag) {
    return ['导游', '的士司机', '特权者'].includes(UserTag[tag]);
});

module.exports = {
    part: part,
    OnlineGuideTags: OnlineGuideTags,
    RealGuideTags: RealGuideTags
};