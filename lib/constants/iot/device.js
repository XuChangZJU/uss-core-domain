'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Xc on 2019/6/30.
 */
var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction,
    relation = _require.relation,
    decodeRelation = _require.decodeRelation;

var state = {
    init: 1,
    normal: 10,
    disconnected: 21,
    disabled: 101
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, (0, _defineProperty3.default)(_S, state.init, '初建的'), (0, _defineProperty3.default)(_S, state.normal, '正常的'), (0, _defineProperty3.default)(_S, state.disconnected, '失联的'), (0, _defineProperty3.default)(_S, state.disabled, '禁用的'), _S);

    return S[s];
};

var action = {
    initialize: 101,
    update: 102,
    normalize: 111,
    disconnect: 121,
    connect: 122,
    disable: 131,
    enable: 132,
    loadGoods: 151,
    grantSubAgency: 161,
    returnBack: 162,
    remove: CommonAction.remove,
    changeCharger: 171
};

var decodeAction = function decodeAction(s) {
    var _S2;

    var S = (_S2 = {}, (0, _defineProperty3.default)(_S2, action.initialize, '初始化'), (0, _defineProperty3.default)(_S2, action.update, '更新'), (0, _defineProperty3.default)(_S2, action.normalize, '正常化'), (0, _defineProperty3.default)(_S2, action.disconnect, '断连'), (0, _defineProperty3.default)(_S2, action.connect, '连接'), (0, _defineProperty3.default)(_S2, action.disable, '禁用'), (0, _defineProperty3.default)(_S2, action.enable, '启用'), (0, _defineProperty3.default)(_S2, action.loadGoods, '增加货物'), (0, _defineProperty3.default)(_S2, action.grantSubAgency, '授予下级'), (0, _defineProperty3.default)(_S2, action.returnBack, '归还上级'), (0, _defineProperty3.default)(_S2, action.changeCharger, '修改电桩设置'), _S2);
    return S[s] || decodeCommonAction(s);
};

module.exports = {
    relation: relation,
    decodeRelation: decodeRelation,
    state: state,
    decodeState: decodeState,
    action: action,
    decodeAction: decodeAction
};