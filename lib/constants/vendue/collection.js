'use strict';

var _require = require('../action'),
    commonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    commonState = _require.state,
    decodeCommonState = _require.decodeState,
    commonRelation = _require.relation,
    decodeCommonRelation = _require.decodeRelation;

var state = object.assign({}, commonState, {
    301: '未入库',
    310: '已入库',
    311: ''
});