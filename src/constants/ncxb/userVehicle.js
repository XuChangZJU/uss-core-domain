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
    bind: 1001,
}, commonAction);

const decodeAction = (a) => {
    const STRINGS = {
        [action.bind]: '绑定挪车码',
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
