'use strict';

var _lgDistrict, _lgMall, _lgShop;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../../constants/lg/district'),
    districtAction = _require.action,
    districtRelation = _require.relation;

var _require2 = require('../../constants/lg/mall'),
    mallAction = _require2.action,
    mallRelation = _require2.relation;

var _require3 = require('../../constants/lg/shop'),
    shopAction = _require3.action,
    shopRelation = _require3.relation,
    SHOP_STATE_TRANS_MATRIX = _require3.STATE_TRANS_MATRIX;

var AUTH_MATRIX = {
    lgDistrict: (_lgDistrict = {}, _defineProperty(_lgDistrict, districtAction.update, {
        auths: [{
            "#relation": {
                relations: [districtRelation.owner, districtRelation.manager]
            }
        }]
    }), _defineProperty(_lgDistrict, districtRelation.remove, {
        auths: [{
            "#relation": {
                relations: [districtRelation.owner]
            }
        }]
    }), _lgDistrict),
    lgMall: (_lgMall = {}, _defineProperty(_lgMall, mallAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userDistrict',
                condition: function condition(_ref) {
                    var user = _ref.user,
                        row = _ref.row;

                    var query = {
                        userId: user.id
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_lgMall, mallAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgDistrict',
                relations: [districtRelation.owner, districtRelation.manager]
            }
        }, {
            "#relation": {
                relations: [mallRelation.owner, mallRelation.manager]
            }
        }]
    }), _defineProperty(_lgMall, mallRelation.remove, {
        auths: [{
            "#relation": {
                attr: 'lgDistrict',
                relations: [districtRelation.owner, districtRelation.manager]
            }
        }, {
            "#relation": {
                relations: [mallRelation.owner]
            }
        }]
    }), _lgMall),
    lgShop: (_lgShop = {}, _defineProperty(_lgShop, shopAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userDistrict',
                condition: function condition(_ref2) {
                    var user = _ref2.user;

                    var query = {
                        userId: user.id
                    };
                    return query;
                }
            }]
        }, {
            '#exists': [{
                relation: 'userMall',
                condition: function condition(_ref3) {
                    var user = _ref3.user;

                    var query = {
                        userId: user.id
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_lgShop, shopAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgMall',
                relations: [mallRelation.owner, mallRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'lgMall.lgDistrict',
                relations: [districtRelation.owner, districtRelation.manager]
            }
        }]
    }), _defineProperty(_lgShop, shopAction.remove, {
        auths: [{
            "#relation": {
                attr: 'lgMall',
                relations: [mallRelation.owner, mallRelation.manager]
            }
        }, {
            "#relation": {
                relations: [shopRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'lgMall.lgDistrict',
                relations: [districtRelation.owner, districtRelation.manager]
            }
        }]
    }), _defineProperty(_lgShop, shopAction.online, {
        auths: [{
            "#relation": {
                attr: 'lgMall',
                relations: [mallRelation.owner, mallRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'lgMall.lgDistrict',
                relations: [districtRelation.owner, districtRelation.manager]
            }
        }]
    }), _defineProperty(_lgShop, shopAction.offline, {
        auths: [{
            "#relation": {
                attr: 'lgMall',
                relations: [mallRelation.owner, mallRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'lgMall.lgDistrict',
                relations: [districtRelation.owner, districtRelation.manager]
            }
        }]
    }), _defineProperty(_lgShop, shopAction.disable, {
        auths: [{
            "#relation": {
                attr: 'lgMall',
                relations: [mallRelation.owner, mallRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'lgMall.lgDistrict',
                relations: [districtRelation.owner, districtRelation.manager]
            }
        }]
    }), _defineProperty(_lgShop, shopAction.assign, {
        auths: [{
            "#relation": {
                attr: 'lgMall',
                relations: [mallRelation.owner, mallRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'lgMall.lgDistrict',
                relations: [districtRelation.owner, districtRelation.manager]
            }
        }, {
            "#relation": {
                relations: [shopRelation.owner]
            }
        }]
    }), _defineProperty(_lgShop, shopAction.transfer, {
        auths: [{
            "#relation": {
                relations: [shopRelation.owner]
            }
        }]
    }), _defineProperty(_lgShop, shopAction.authGrantMulti2, {
        auths: [{
            "#relation": {
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), _defineProperty(_lgShop, shopAction.authRevoke, {
        auths: [{
            "#relation": {
                relations: [shopRelation.owner]
            }
        }]
    }), _lgShop)
};
var STATE_TRAN_MATRIX = {
    lgShop: SHOP_STATE_TRANS_MATRIX
};
module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};