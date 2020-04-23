const {
    action: commonAction,
    decodeAction: decodeCommonAction,
    state: commonState,
    decodeState: decodeCommonState,
    relation: commonRelation,
    decodeRelation: decodeCommonRelation,
} = require('../action');

const state = object.assign(
    {}, commonState, {
        301: '未入库',
        310: '已入库',
        311: ''
    }
)