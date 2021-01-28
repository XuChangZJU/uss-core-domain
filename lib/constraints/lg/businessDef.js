'use strict';

var _lgSkuValue, _lgValue, _lgProperty, _lgPropertySpecies, _lgSpecies, _lgBrand, _lgSkuItem, _lgDistrict, _lgMall, _lgShop, _lgWeChatSettlement, _lgSku, _lgTrade;

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

var _require5 = require('../../constants/lg/weChatSettlement'),
    WeChatSettlementAction = _require5.action,
    WeChatSettlementState = _require5.state,
    WeChatSettlementRelation = _require5.relation;

var _require6 = require('../../constants/lg/sku'),
    skuAction = _require6.action,
    skuState = _require6.state,
    SKU_STATE_TRANS_MATRIX = _require6.STATE_TRANS_MATRIX;

var _require7 = require('../../constants/lg/trade'),
    tradeAction = _require7.action,
    tradeTransportState = _require7.transportState,
    tradeState = _require7.state,
    TRADE_STATE_TRANS_MATRIX = _require7.STATE_TRANS_MATRIX;

var _require8 = require('../../constants/lg/skuItem'),
    skuItemAction = _require8.action,
    skuItemState = _require8.state,
    SKUITEM_STATE_TRANS_MATRIX = _require8.STATE_TRANS_MATRIX;

var _require9 = require('../../constants/lg/brand'),
    brandAction = _require9.action;

var _require10 = require('../../constants/lg/species'),
    speciesAction = _require10.action;

var _require11 = require('../../constants/lg/property'),
    propertyAction = _require11.action;

var _require12 = require('../../constants/lg/propertySpecies'),
    propertySpeciesAction = _require12.action;

var _require13 = require('../../constants/lg/value'),
    valueAction = _require13.action;

var _require14 = require('../../constants/lg/skuValue'),
    skuValueAction = _require14.action;

var AUTH_MATRIX = {
    lgSkuValue: (_lgSkuValue = {}, _defineProperty(_lgSkuValue, skuValueAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgShop',
                condition: function condition(_ref) {
                    var user = _ref.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [shopRelation.owner, shopRelation.manager]
                        }
                    };
                }
            }]
        }]
    }), _defineProperty(_lgSkuValue, skuValueAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), _defineProperty(_lgSkuValue, valueAction.remove, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), _lgSkuValue),
    lgValue: (_lgValue = {}, _defineProperty(_lgValue, valueAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref2) {
                    var user = _ref2.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgMall',
                condition: function condition(_ref3) {
                    var user = _ref3.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [mallRelation.owner, mallRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgShop',
                needData: true,
                condition: function condition(_ref4) {
                    var user = _ref4.user,
                        actionData = _ref4.actionData;
                    var lgValue = actionData.lgValue;

                    if (lgValue.lgSkuId) {
                        return {
                            userId: user.id,
                            relation: {
                                $in: [shopRelation.owner, shopRelation.manager]
                            }
                        };
                    }
                    return {
                        userId: -1
                    };
                }
            }]
        }]
    }), _defineProperty(_lgValue, valueAction.update, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref5) {
                    var user = _ref5.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgMall',
                condition: function condition(_ref6) {
                    var user = _ref6.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [mallRelation.owner, mallRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), _defineProperty(_lgValue, valueAction.remove, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref7) {
                    var user = _ref7.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgMall',
                condition: function condition(_ref8) {
                    var user = _ref8.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [mallRelation.owner, mallRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), _lgValue),
    lgProperty: (_lgProperty = {}, _defineProperty(_lgProperty, propertyAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref9) {
                    var user = _ref9.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgMall',
                condition: function condition(_ref10) {
                    var user = _ref10.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [mallRelation.owner, mallRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgShop',
                needData: true,
                condition: function condition(_ref11) {
                    var user = _ref11.user,
                        actionData = _ref11.actionData;
                    var lgProperty = actionData.lgProperty;

                    if (lgProperty.lgSkuId) {
                        return {
                            userId: user.id,
                            relation: {
                                $in: [shopRelation.owner, shopRelation.manager]
                            }
                        };
                    }
                    return {
                        userId: -1
                    };
                }
            }]
        }]
    }), _defineProperty(_lgProperty, propertyAction.update, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref12) {
                    var user = _ref12.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgMall',
                condition: function condition(_ref13) {
                    var user = _ref13.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [mallRelation.owner, mallRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), _defineProperty(_lgProperty, propertyAction.remove, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref14) {
                    var user = _ref14.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgMall',
                condition: function condition(_ref15) {
                    var user = _ref15.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [mallRelation.owner, mallRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), _lgProperty),
    lgPropertySpecies: (_lgPropertySpecies = {}, _defineProperty(_lgPropertySpecies, propertySpeciesAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref16) {
                    var user = _ref16.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_lgPropertySpecies, propertySpeciesAction.update, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref17) {
                    var user = _ref17.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_lgPropertySpecies, propertySpeciesAction.remove, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref18) {
                    var user = _ref18.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _lgPropertySpecies),
    lgSpecies: (_lgSpecies = {}, _defineProperty(_lgSpecies, speciesAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref19) {
                    var user = _ref19.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_lgSpecies, speciesAction.update, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref20) {
                    var user = _ref20.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_lgSpecies, speciesAction.remove, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref21) {
                    var user = _ref21.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _lgSpecies),
    lgBrand: (_lgBrand = {}, _defineProperty(_lgBrand, brandAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref22) {
                    var user = _ref22.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_lgBrand, brandAction.update, {
        auths: [{
            '#exists': [{
                relation: 'userLgDistrict',
                condition: function condition(_ref23) {
                    var user = _ref23.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_lgBrand, brandAction.remove, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref24) {
                    var user = _ref24.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [districtRelation.owner, districtRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _lgBrand),
    lgSkuItem: (_lgSkuItem = {}, _defineProperty(_lgSkuItem, skuItemAction.create, { // todo 细化写在definition中
        auths: [{
            "#exists": [{
                relation: 'userLgShop',
                condition: function condition(_ref25) {
                    var user = _ref25.user;

                    var query = {
                        userId: user.id
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_lgSkuItem, skuItemAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), _defineProperty(_lgSkuItem, skuItemAction.online, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            },
            '#data': [{
                check: function check(_ref26) {
                    var user = _ref26.user,
                        row = _ref26.row;

                    return [skuItemState.offline].includes(row.state);
                }
            }]
        }]
    }), _defineProperty(_lgSkuItem, skuAction.offline, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            },
            '#data': [{
                check: function check(_ref27) {
                    var user = _ref27.user,
                        row = _ref27.row;

                    return [skuItemState.online].includes(row.state);
                }
            }]
        }]
    }), _lgSkuItem),
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
                condition: function condition(_ref28) {
                    var user = _ref28.user,
                        actionData = _ref28.actionData;
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
                condition: function condition(_ref29) {
                    var user = _ref29.user;

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
                condition: function condition(_ref30) {
                    var user = _ref30.user,
                        actionData = _ref30.actionData;
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
    lgWeChatSettlement: (_lgWeChatSettlement = {}, _defineProperty(_lgWeChatSettlement, WeChatSettlementAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userLgShop',
                needData: true,
                condition: function condition(_ref31) {
                    var user = _ref31.user,
                        actionData = _ref31.actionData;
                    var lgWeChatSettlement = actionData.lgWeChatSettlement;

                    var query = {
                        userId: user.id,
                        lgShopId: lgWeChatSettlement.lgShopId,
                        relation: shopRelation.owner
                    };
                    return query;
                }
            }]
        }]
    }), _defineProperty(_lgWeChatSettlement, WeChatSettlementAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [shopRelation.owner]
            }
        }]
    }), _lgWeChatSettlement),
    lgSku: (_lgSku = {}, _defineProperty(_lgSku, skuAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userLgShop',
                needData: true,
                condition: function condition(_ref32) {
                    var user = _ref32.user,
                        actionData = _ref32.actionData;
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
                check: function check(_ref33) {
                    var user = _ref33.user,
                        row = _ref33.row;

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
                check: function check(_ref34) {
                    var user = _ref34.user,
                        row = _ref34.row;

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
                check: function check(_ref35) {
                    var user = _ref35.user,
                        row = _ref35.row;

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
                check: function check(_ref36) {
                    var user = _ref36.user,
                        row = _ref36.row;

                    return [tradeTransportState.unsend].includes(row.transportState) && user.id === row.buyerId;
                }
            }]
        }]
    }), _defineProperty(_lgTrade, tradeAction.confirmArrive, {
        auths: [{

            '#data': [{
                check: function check(_ref37) {
                    var user = _ref37.user,
                        row = _ref37.row;

                    return [tradeTransportState.unsend].includes(row.transportState);
                }
            }]
        }]
    }), _lgTrade)
};
var STATE_TRAN_MATRIX = {
    lgShop: SHOP_STATE_TRANS_MATRIX,
    lgTrade: TRADE_STATE_TRANS_MATRIX,
    lgSku: SKU_STATE_TRANS_MATRIX,
    lgSkuItem: SKUITEM_STATE_TRANS_MATRIX
};
module.exports = {
    AUTH_MATRIX: AUTH_MATRIX,
    STATE_TRAN_MATRIX: STATE_TRAN_MATRIX
};