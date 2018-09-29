/**
 * Created by Administrator on 2018/7/9.
 */
const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
    } = require('../action');

const relation = commonRelation;

const decodeRelation = decodeCommonRelation;

const action = Object.assign({
    send: 1001,
    answer: 1002,
    answer2: 1003,
}, commonAction);

const decodeAction = (a) => {
    const STRINGS = {
        [action.send]: '发起请求',
        [action.answer]: '响应',
        [action.answer2]: '代响应',
    };

    const s = STRINGS[a] || decodeCommonAction(a);

    return s;
}


module.exports = {
    relation,
    decodeRelation,
    action,
    decodeAction,
};
