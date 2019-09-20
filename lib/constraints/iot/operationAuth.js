'use strict';

var _agency;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2019/9/20.
 */
var _require = require('../../constants/roleConstant2'),
    Roles = _require.Roles;

var _require2 = require('../../constants/iot/agency'),
    AgencyAction = _require2.action,
    AgencyRelation = _require2.relation;

var MATRIX = {
    agency: (_agency = {}, _defineProperty(_agency, AgencyAction.create, {
        // visible: 'always',           /*** always: 长显示，none: 不显示 *//
        auths: [{
            '#roleNames': [Roles.EDITOR.name]
        }, {
            '#relation': {
                attr: 'parentId',
                relation: AgencyRelation.owner
            },
            '#attr': {
                rel: 'user',
                attr: {
                    mobile: {
                        $exists: true
                    }
                }
            }
        }]
    }), _defineProperty(_agency, AgencyAction.setAgencySkuPrice, {
        auths: [{
            '#relation': {
                attr: 'parentId',
                relation: AgencyRelation.owner
            }
        }]
    }), _agency)
};

module.exports = {
    MATRIX: MATRIX
};