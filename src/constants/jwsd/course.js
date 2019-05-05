/**
 * Created by Xc on 2019/4/24.
 */
"use strict";

const {
    action: CommonAction,
    decodeAction: decodeCommonAction,
} = require('../action');

const action = Object.assign({
    studyLesson: 10001,
}, CommonAction);

const decodeAction = (a) => {
    const STRING = {
        [action.studyLesson]: '学习课程',
    };

    return STRING[a] || decodeCommonAction(a);
};

const category = {
    english: 1,
    science: 2,
    math: 3,
};

const decodeCategory = (c) => {
    const STRING = {
        [category.english]: '英语',
        [category.science]: '科学',
        [category.math]: '数学',
    };
    return STRING[c];
};

module.exports = {
    action,
    decodeAction,
    category,
    decodeCategory,
};
