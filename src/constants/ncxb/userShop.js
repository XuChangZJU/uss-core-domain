/**
 * Created by Administrator on 2018/7/9.
 */
const {
    action,
    decodeAction,
    relation,
    decodeRelation,
} = require('../action');


const decodeGrantRelationAction = (r, grant) => {
    const STRING_GRANT = {
        [relation.owner]: '转让店铺',
        [relation.grantee]: '邀请店员',
    };
    const STRING_CONFIRM = {
        [relation.owner]: '转让给您一间店铺',
        [relation.grantee]: '邀请您成为店员',
    };

    if (grant) {
        return STRING_GRANT[r];
    }
    return STRING_CONFIRM[r];
};

const grantMatrix = {
    [relation.owner]: [relation.grantee],
};

module.exports = {
    relation,
    decodeRelation,
    decodeGrantRelationAction,
    action,
    decodeAction,
    grantMatrix,
};
