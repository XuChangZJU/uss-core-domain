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

module.exports = {
    action,
    decodeAction,
};
