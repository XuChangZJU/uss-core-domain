'use strict';

var _lgDistrict, _lgMall, _lgShop, _lgStore, _lgSku, _lgTrade;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../action'),
    AllowEveryoneAuth = _require.AllowEveryoneAuth,
    OwnerRelationAuth = _require.OwnerRelationAuth,
    AnyRelationAuth = _require.AnyRelationAuth;

var _require2 = require('../../constants/lg/district'),
    districtAction = _require2.action,
    districtRelation = _require2.relation;

var _require3 = require('../../constants/lg/mall'),
    mallAction = _require3.action,
    mallRelation = _require3.relation;

var _require4 = require('../../constants/lg/shop'),
    shopAction = _require4.action,
    shopRelation = _require4.relation,
    SHOP_STATE_TRANS_MATRIX = _require4.STATE_TRANS_MATRIX;

var _require5 = require('../../constants/lg/store'),
    storeAction = _require5.action,
    storeState = _require5.state,
    storeRelation = _require5.relation;

var _require6 = require('../../constants/lg/sku'),
    skuAction = _require6.action,
    skuState = _require6.state,
    SKU_STATE_TRANS_MATRIX = _require6.STATE_TRANS_MATRIX;

var _require7 = require('../../constants/lg/trade'),
    tradeAction = _require7.action,
    tradeTransportState = _require7.transportState,
    tradeState = _require7.state,
    TRADE_STATE_TRANS_MATRIX = _require7.STATE_TRANS_MATRIX;

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
                relation: 'userLgDistrict',
                needData: true,
                condition: function condition(_ref) {
                    var user = _ref.user,
                        actionData = _ref.actionData;
                    var lgMall = actionData.lgMall;

                    var query = {
                        userId: user.id,
                        lgMallId: lgMall.lgDistrictId
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
                relation: 'userLgDistrict',
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
                relation: 'userLgMall',
                needData: true,
                condition: function condition(_ref3) {
                    var user = _ref3.user,
                        actionData = _ref3.actionData;
                    var lgShop = actionData.lgShop;

                    var query = {
                        userId: user.id,
                        lgMallId: lgShop.lgMallId
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
    }), _lgShop),
    lgStore: (_lgStore = {}, _defineProperty(_lgStore, storeAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userLgShop',
                needData: true,
                condition: function condition(_ref4) {
                    var user = _ref4.user,
                        actionData = _ref4.actionData;
                    var lgStore = actionData.lgStore;

                    var query = {
                        userId: user.id,
                        lgShopId: lgStore.lgShopId,
                        relation: shopRelation.owner
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_lgStore, storeAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [shopRelation.owner]
            }
        }]
    }), _lgStore),
    lgSku: (_lgSku = {}, _defineProperty(_lgSku, skuAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userLgShop',
                needData: true,
                condition: function condition(_ref5) {
                    var user = _ref5.user,
                        actionData = _ref5.actionData;
                    var lgSku = actionData.lgSku;

                    var query = {
                        userId: user.id,
                        lgShopId: lgSku.lgShopId,
                        relation: {
                            $in: [shopRelation.owner, shopRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_lgSku, skuAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), _defineProperty(_lgSku, skuAction.online, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            },
            '#data': [{
                check: function check(_ref6) {
                    var user = _ref6.user,
                        row = _ref6.row;

                    return [skuState.offline].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_lgSku, skuAction.offline, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            },
            '#data': [{
                check: function check(_ref7) {
                    var user = _ref7.user,
                        row = _ref7.row;

                    return [skuState.online].includes(row.state);
                }
            }]
        }]
    }), _lgSku),
    lgTrade: (_lgTrade = {}, _defineProperty(_lgTrade, tradeAction.create, AllowEveryoneAuth), _defineProperty(_lgTrade, tradeAction.makePaid, {
        auths: [{
            "#relation": {
                attr: 'lgShop'
            }
        }]
    }), _defineProperty(_lgTrade, tradeAction.makeAbandoned, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [shopRelation.manager]
            },
            '#data': [{
                check: function check(_ref8) {
                    var user = _ref8.user,
                        row = _ref8.row;

                    return [tradeTransportState.unsend].includes(row.transportState);
                }
            }]
        }, {
            "#relation": {
                attr: 'lgShop',
                relations: [shopRelation.owner]
            }
        }]
    }), _defineProperty(_lgTrade, tradeAction.send, {
        auths: [{
            '#data': [{
                check: function check(_ref9) {
                    var user = _ref9.user,
                        row = _ref9.row;

                    return [tradeTransportState.unsend].includes(row.transportState) && user.id === row.buyerId;
                }
            }]
        }]
    }), _defineProperty(_lgTrade, tradeAction.confirmArrive, {
        auths: [{

            '#data': [{
                check: function check(_ref10) {
                    var user = _ref10.user,
                        row = _ref10.row;

                    return [tradeTransportState.unsend].includes(row.transportState);
                }
            }]
        }]
    }), _lgTrade)
};
var STATE_TRAN_MATRIX = {
    lgShop: SHOP_STATE_TRANS_MATRIX,
    lgTrade: TRADE_STATE_TRANS_MATRIX
};
module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};