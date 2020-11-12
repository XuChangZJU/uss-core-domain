'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var decoder = {
    decodeMember: function decodeMember(tag) {
        var goodGrad = data.member.goodGrad;

        var STRING = _defineProperty({}, goodGrad, '优秀毕业生');

        return STRING[tag];
    },
    decodeMaterial: function decodeMaterial(tag) {
        var competition = data.material.competition;


        var STRING = _defineProperty({}, competition, '竞赛');

        return STRING[tag];
    }
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