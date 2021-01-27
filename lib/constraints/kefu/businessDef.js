'use strict';

var _company;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    AllowEveryoneAuth = _require.AllowEveryoneAuth,
    OwnerRelationAuth = _require.OwnerRelationAuth,
    AnyRelationAuth = _require.AnyRelationAuth;

var _require2 = require('../../constants/kefu/axbBind'),
    axbBindAction = _require2.action,
    axbBindState = _require2.state,
    AXB_BIND_STATE_TRANS_MATRIX = _require2.STATE_TRANS_MATRIX;

var _require3 = require('../../constants/kefu/company'),
    companyAction = _require3.action,
    companyRelation = _require3.relation,
    companyState = _require3.state,
    COMPANY_STATE_TRANS_MATRIX = _require3.STATE_TRAN_MATRIX;

var AUTH_MATRIX = {
    /*axbBind: {
        [axbBindAction.bind]: {},
        [axbBindAction.unbind]: {},
        [axbBindAction.expire]: {},
    },*/
    company: (_company = {}, _defineProperty(_company, companyAction.enable, {
        auths: [{
            '#relation': {
                relations: [companyRelation.owner]
            },
            '#data': {
                check: function check(_ref) {
                    var user = _ref.user,
                        row = _ref.row;

                    return row.state === companyState.offline;
                }
            }
        }]
    }), _defineProperty(_company, companyAction.disable, {
        auths: [{
            '#relation': {
                relations: [companyRelation.owner]
            },
            '#data': {
                check: function check(_ref2) {
                    var user = _ref2.user,
                        row = _ref2.row;

                    return row.state === companyState.online;
                }
            }
        }]
    }), _company)
};

var STATE_TRANS_MATRIX = {
    company: COMPANY_STATE_TRANS_MATRIX
};

module.export = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRANS_MATRIX: STATE_TRANS_MATRIX
};