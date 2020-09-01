/**
 * Created by Xc on 2020/8/20.
 */
const pick = require('lodash/pick');
const { action: CommonAction, decodeAction } = require('../action');

const category = {
    thesis: 1, // 论文
    patent: 2, // 专利
    copyright: 3, // 软著
    fund: 4, // 基金
};

const decodeCategory = (c) => {
    const T = {
        [category.thesis]: '论文',
        [category.patent]: '专利',
        [category.copyright]: '软著',
        [category.fund]: '基金',
    };

    return T[c];
}

const action = pick(CommonAction, ['update']);

module.exports = {
    category: category,
    decodeCategory: decodeCategory,
    action: action,
    decodeAction: decodeAction
}
