'use strict';

/**
 * Created by Xc on 2020/11/12.
 */
var pick = require('lodash/pick');
var assign = require('lodash/assign');

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var action = pick(CommonAction, ['create', 'remove']);
var decodeAction = function decodeAction(a) {
    return decodeCommonAction(a);
};

var data = {
    member: {
        goodGrad: 'goodGrad'
    },
    material: {
        competition: 'competition'
    }
};

var decoder = function decoder(entity, tag) {
    var STR = {
        member: {
            goodGrad: '优秀毕业生'
        },
        material: {
            competition: '竞赛'
        }
    };

    return STR[entity][tag];
};

var def = {
    data: data,
    decoder: decoder
};

module.exports = {
    action: action,
    decodeAction: decodeAction,

    def: def
};