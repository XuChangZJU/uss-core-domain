'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _lgSkuValue, _lgValue, _lgProperty, _lgPropertySpecies, _lgSpecies, _lgBrand, _lgSkuItem, _lgDistrict, _lgMall, _lgShop, _lgWeChatSettlement, _lgSku, _lgTrade, _lgServiceCompany, _enterUp, _lgShoppingCart, _lgSkuItemValue, _lgSkuItemShop;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../action'),
    AllowEveryoneAuth = _require.AllowEveryoneAuth,
    OwnerRelationAuth = _require.OwnerRelationAuth,
    AnyRelationAuth = _require.AnyRelationAuth;

var _require2 = require('../../constants/lg/enterUp'),
    enterUpAction = _require2.action;

var _require3 = require('../../constants/lg/district'),
    districtAction = _require3.action,
    districtRelation = _require3.relation;

var _require4 = require('../../constants/lg/mall'),
    mallAction = _require4.action,
    mallRelation = _require4.relation;

var _require5 = require('../../constants/lg/shop'),
    shopAction = _require5.action,
    shopRelation = _require5.relation,
    SHOP_STATE_TRANS_MATRIX = _require5.STATE_TRANS_MATRIX;

var _require6 = require('../../constants/lg/weChatSettlement'),
    WeChatSettlementAction = _require6.action,
    WeChatSettlementState = _require6.state,
    WeChatSettlementRelation = _require6.relation;

var _require7 = require('../../constants/lg/sku'),
    skuAction = _require7.action,
    skuState = _require7.state,
    SKU_STATE_TRANS_MATRIX = _require7.STATE_TRANS_MATRIX;

var _require8 = require('../../constants/lg/trade'),
    tradeAction = _require8.action,
    tradeTransportState = _require8.transportState,
    tradeState = _require8.state,
    TRADE_STATE_TRANS_MATRIX = _require8.STATE_TRANS_MATRIX;

var _require9 = require('../../constants/lg/skuItem'),
    skuItemAction = _require9.action,
    skuItemState = _require9.state,
    SKUITEM_STATE_TRANS_MATRIX = _require9.STATE_TRANS_MATRIX;

var _require10 = require('../../constants/lg/brand'),
    brandAction = _require10.action;

var _require11 = require('../../constants/lg/species'),
    speciesAction = _require11.action;

var _require12 = require('../../constants/lg/property'),
    propertyAction = _require12.action;

var _require13 = require('../../constants/lg/propertySpecies'),
    propertySpeciesAction = _require13.action;

var _require14 = require('../../constants/lg/value'),
    valueAction = _require14.action;

var _require15 = require('../../constants/lg/skuValue'),
    skuValueAction = _require15.action;

var _require16 = require('../../constants/lg/serviceCompany'),
    serviceCompanyAction = _require16.action,
    serviceCompanyRelation = _require16.relation;

var _require17 = require('../../constants/lg/shoppingCart'),
    shoppingCartAction = _require17.action;

var _require18 = require('../../constants/lg/skuItemValue'),
    skuItemValueAction = _require18.action;

var _require19 = require('../../constants/lg/skuItemShop'),
    skuItemShopAction = _require19.action;

var AUTH_MATRIX = {
    lgSkuValue: (_lgSkuValue = {}, (0, _defineProperty3.default)(_lgSkuValue, skuValueAction.create, {
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
    }), (0, _defineProperty3.default)(_lgSkuValue, skuValueAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgSkuValue, valueAction.remove, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), _lgSkuValue),
    lgValue: (_lgValue = {}, (0, _defineProperty3.default)(_lgValue, valueAction.create, {
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
    }), (0, _defineProperty3.default)(_lgValue, valueAction.update, {
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
    }), (0, _defineProperty3.default)(_lgValue, valueAction.remove, {
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
    lgProperty: (_lgProperty = {}, (0, _defineProperty3.default)(_lgProperty, propertyAction.create, {
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
    }), (0, _defineProperty3.default)(_lgProperty, propertyAction.update, {
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
    }), (0, _defineProperty3.default)(_lgProperty, propertyAction.remove, {
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
    lgPropertySpecies: (_lgPropertySpecies = {}, (0, _defineProperty3.default)(_lgPropertySpecies, propertySpeciesAction.create, {
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
    }), (0, _defineProperty3.default)(_lgPropertySpecies, propertySpeciesAction.update, {
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
    }), (0, _defineProperty3.default)(_lgPropertySpecies, propertySpeciesAction.remove, {
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
    lgSpecies: (_lgSpecies = {}, (0, _defineProperty3.default)(_lgSpecies, speciesAction.create, {
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
    }), (0, _defineProperty3.default)(_lgSpecies, speciesAction.update, {
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
    }), (0, _defineProperty3.default)(_lgSpecies, speciesAction.remove, {
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
    lgBrand: (_lgBrand = {}, (0, _defineProperty3.default)(_lgBrand, brandAction.create, {
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
    }), (0, _defineProperty3.default)(_lgBrand, brandAction.update, {
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
    }), (0, _defineProperty3.default)(_lgBrand, brandAction.remove, {
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
    lgSkuItem: (_lgSkuItem = {}, (0, _defineProperty3.default)(_lgSkuItem, skuItemAction.create, { // todo 细化写在definition中
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
    }), (0, _defineProperty3.default)(_lgSkuItem, skuItemAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgSkuItem, skuItemAction.online, {
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
    }), (0, _defineProperty3.default)(_lgSkuItem, skuAction.offline, {
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
    lgDistrict: (_lgDistrict = {}, (0, _defineProperty3.default)(_lgDistrict, districtAction.update, {
        auths: [{
            "#relation": {
                relations: [districtRelation.owner, districtRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgDistrict, districtRelation.remove, {
        auths: [{
            "#relation": {
                relations: [districtRelation.owner]
            }
        }]
    }), _lgDistrict),
    lgMall: (_lgMall = {}, (0, _defineProperty3.default)(_lgMall, mallAction.create, {
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
    }), (0, _defineProperty3.default)(_lgMall, mallAction.update, {
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
    }), (0, _defineProperty3.default)(_lgMall, mallRelation.remove, {
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
    lgShop: (_lgShop = {}, (0, _defineProperty3.default)(_lgShop, shopAction.create, {
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
    }), (0, _defineProperty3.default)(_lgShop, shopAction.update, {
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
    }), (0, _defineProperty3.default)(_lgShop, shopAction.remove, {
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
    }), (0, _defineProperty3.default)(_lgShop, shopAction.online, {
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
    }), (0, _defineProperty3.default)(_lgShop, shopAction.offline, {
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
    }), (0, _defineProperty3.default)(_lgShop, shopAction.disable, {
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
    }), (0, _defineProperty3.default)(_lgShop, shopAction.assign, {
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
    }), (0, _defineProperty3.default)(_lgShop, shopAction.transfer, {
        auths: [{
            "#relation": {
                relations: [shopRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_lgShop, shopAction.authGrantMulti2, {
        auths: [{
            "#relation": {
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgShop, shopAction.authRevoke, {
        auths: [{
            "#relation": {
                relations: [shopRelation.owner]
            }
        }]
    }), _lgShop),
    lgWeChatSettlement: (_lgWeChatSettlement = {}, (0, _defineProperty3.default)(_lgWeChatSettlement, WeChatSettlementAction.create, {
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
    }), (0, _defineProperty3.default)(_lgWeChatSettlement, WeChatSettlementAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [shopRelation.owner]
            }
        }]
    }), _lgWeChatSettlement),
    lgSku: (_lgSku = {}, (0, _defineProperty3.default)(_lgSku, skuAction.create, {
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
    }), (0, _defineProperty3.default)(_lgSku, skuAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgSku, skuAction.online, {
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
    }), (0, _defineProperty3.default)(_lgSku, skuAction.offline, {
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
    lgTrade: (_lgTrade = {}, (0, _defineProperty3.default)(_lgTrade, tradeAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_lgTrade, tradeAction.makePaid, {
        auths: [{
            "#relation": {
                attr: 'lgShop'
            }
        }]
    }), (0, _defineProperty3.default)(_lgTrade, tradeAction.makeAbandoned, {
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
    }), (0, _defineProperty3.default)(_lgTrade, tradeAction.send, {
        auths: [{
            '#data': [{
                check: function check(_ref36) {
                    var user = _ref36.user,
                        row = _ref36.row;

                    return [tradeTransportState.unsend].includes(row.transportState) && user.id === row.buyerId;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, tradeAction.confirmArrive, {
        auths: [{
            '#data': [{
                check: function check(_ref37) {
                    var user = _ref37.user,
                        row = _ref37.row;

                    return [tradeTransportState.unsend].includes(row.transportState);
                }
            }]
        }]
    }), _lgTrade),
    lgServiceCompany: (_lgServiceCompany = {}, (0, _defineProperty3.default)(_lgServiceCompany, serviceCompanyAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_lgServiceCompany, serviceCompanyAction.update, {
        auths: [{
            "#relation": {
                relations: [serviceCompanyRelation.owner, serviceCompanyRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgServiceCompany, serviceCompanyAction.remove, {
        auths: [{
            "#relation": {
                relations: [serviceCompanyRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_lgServiceCompany, serviceCompanyAction.authGrantMulti2, {
        auths: [{
            "#relation": {
                relations: [serviceCompanyRelation.owner, serviceCompanyRelation.manager]
            }
        }]
    }), _lgServiceCompany),
    enterUp: (_enterUp = {}, (0, _defineProperty3.default)(_enterUp, enterUpAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_enterUp, enterUpAction.update, AnyRelationAuth), _enterUp),
    lgShoppingCart: (_lgShoppingCart = {}, (0, _defineProperty3.default)(_lgShoppingCart, shoppingCartAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_lgShoppingCart, shoppingCartAction.update, {
        auths: [{
            "#data": [{
                check: function check(_ref38) {
                    var user = _ref38.user,
                        row = _ref38.row;

                    return row.userId === user.id;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgShoppingCart, shoppingCartAction.remove, {
        auths: [{
            "#data": [{
                check: function check(_ref39) {
                    var user = _ref39.user,
                        row = _ref39.row;

                    return row.userId === user.id;
                }
            }]
        }]
    }), _lgShoppingCart),
    lgSkuItemValue: (_lgSkuItemValue = {}, (0, _defineProperty3.default)(_lgSkuItemValue, skuItemValueAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgShop',
                condition: function condition(_ref40) {
                    var user = _ref40.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [shopRelation.owner, shopRelation.manager]
                        }
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgMall',
                condition: function condition(_ref41) {
                    var user = _ref41.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref42) {
                    var user = _ref42.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgSkuItemValue, skuItemValueAction.update, {
        auths: [{
            "#exists": [{
                relation: 'userLgShop',
                condition: function condition(_ref43) {
                    var user = _ref43.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [shopRelation.owner, shopRelation.manager]
                        }
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgMall',
                condition: function condition(_ref44) {
                    var user = _ref44.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref45) {
                    var user = _ref45.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgSkuItemValue, skuItemValueAction.remove, {
        auths: [{
            "#exists": [{
                relation: 'userLgShop',
                condition: function condition(_ref46) {
                    var user = _ref46.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [shopRelation.owner, shopRelation.manager]
                        }
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgMall',
                condition: function condition(_ref47) {
                    var user = _ref47.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref48) {
                    var user = _ref48.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), _lgSkuItemValue),
    lgSkuItemShop: (_lgSkuItemShop = {}, (0, _defineProperty3.default)(_lgSkuItemShop, skuItemShopAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgShop',
                condition: function condition(_ref49) {
                    var user = _ref49.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [shopRelation.owner, shopRelation.manager]
                        }
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgSkuItemShop, skuItemShopAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'lgShop.lgMall'
            }
        }, {
            "#relation": {
                attr: 'lgShop.lgMall.lgDistrict'
            }
        }]
    }), (0, _defineProperty3.default)(_lgSkuItemShop, skuItemShopAction.remove, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'lgShop.lgMall'
            }
        }, {
            "#relation": {
                attr: 'lgShop.lgMall.lgDistrict'
            }
        }]
    }), _lgSkuItemShop)
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