'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _lgShopSpecies, _express, _lgSkuValue, _lgValue, _lgProperty, _lgPropertySpecies, _lgSpecies, _lgBrand, _lgSkuItem, _lgDistrict, _lgMall, _lgShop, _lgWeChatSettlement, _lgSku, _lgTrade, _lgServiceCompany, _enterUp, _lgShoppingCart, _lgSkuItemValue, _lgSkuItemShop, _lgReckoner;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('../../constants/roleConstant2'),
    Roles = _require.Roles;

var _require2 = require('../action'),
    AllowEveryoneAuth = _require2.AllowEveryoneAuth,
    OwnerRelationAuth = _require2.OwnerRelationAuth,
    AnyRelationAuth = _require2.AnyRelationAuth;

var _require3 = require('../../constants/lg/shopSpecies'),
    shopSpeciesAction = _require3.action;

var _require4 = require('../../constants/lg/enterUp'),
    enterUpAction = _require4.action;

var _require5 = require('../../constants/lg/district'),
    districtAction = _require5.action,
    districtRelation = _require5.relation;

var _require6 = require('../../constants/lg/mall'),
    mallAction = _require6.action,
    mallRelation = _require6.relation;

var _require7 = require('../../constants/lg/shop'),
    shopAction = _require7.action,
    shopState = _require7.state,
    shopRelation = _require7.relation,
    SHOP_STATE_TRANS_MATRIX = _require7.STATE_TRANS_MATRIX;

var _require8 = require('../../constants/lg/weChatSettlement'),
    WeChatSettlementAction = _require8.action,
    WeChatSettlementState = _require8.state,
    WeChatSettlementRelation = _require8.relation;

var _require9 = require('../../constants/lg/sku'),
    skuAction = _require9.action,
    skuState = _require9.state,
    SKU_STATE_TRANS_MATRIX = _require9.STATE_TRANS_MATRIX;

var _require10 = require('../../constants/lg/trade'),
    tradeAction = _require10.action,
    tradeTransportState = _require10.transportState,
    tradeState = _require10.state,
    TRADE_STATE_TRANS_MATRIX = _require10.STATE_TRANS_MATRIX;

var _require11 = require('../../constants/lg/skuItem'),
    skuItemAction = _require11.action,
    skuItemState = _require11.state,
    SKUITEM_STATE_TRANS_MATRIX = _require11.STATE_TRANS_MATRIX;

var _require12 = require('../../constants/lg/brand'),
    brandAction = _require12.action;

var _require13 = require('../../constants/lg/species'),
    speciesAction = _require13.action;

var _require14 = require('../../constants/lg/property'),
    propertyAction = _require14.action;

var _require15 = require('../../constants/lg/propertySpecies'),
    propertySpeciesAction = _require15.action;

var _require16 = require('../../constants/lg/value'),
    valueAction = _require16.action;

var _require17 = require('../../constants/lg/skuValue'),
    skuValueAction = _require17.action;

var _require18 = require('../../constants/lg/serviceCompany'),
    serviceCompanyAction = _require18.action,
    serviceCompanyRelation = _require18.relation;

var _require19 = require('../../constants/lg/shoppingCart'),
    shoppingCartAction = _require19.action;

var _require20 = require('../../constants/lg/skuItemValue'),
    skuItemValueAction = _require20.action;

var _require21 = require('../../constants/lg/skuItemShop'),
    skuItemShopAction = _require21.action;

var _require22 = require('../../constants/lg/plate'),
    plateAction = _require22.action;

var _require23 = require('../../constants/lg/tradeSkuItemShop'),
    tradeSkuItemShopAction = _require23.action,
    tradeSkuItemShopState = _require23.state;

var _require24 = require('../../constants/lg/express'),
    expressAction = _require24.action,
    expressState = _require24.state;

var _require25 = require('../../constants/lg/service'),
    serviceAction = _require25.action;

var _require26 = require('../../constants/lg/reckoner'),
    ReckonerAction = _require26.action,
    ReckonerRelation = _require26.relation;

var AUTH_MATRIX = {
    lgService: (0, _defineProperty3.default)({}, serviceAction.create, AllowEveryoneAuth),
    lgShopSpecies: (_lgShopSpecies = {}, (0, _defineProperty3.default)(_lgShopSpecies, shopSpeciesAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgShop',
                needData: true,
                condition: function condition(_ref) {
                    var user = _ref.user,
                        actionData = _ref.actionData;
                    var lgShopSpecies = actionData.lgShopSpecies;

                    if (lgShopSpecies.lgShopId) {
                        return {
                            userId: user.id,
                            lgShopId: lgShopSpecies.lgShopId,
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
    }), (0, _defineProperty3.default)(_lgShopSpecies, shopSpeciesAction.remove, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), _lgShopSpecies),
    express: (_express = {}, (0, _defineProperty3.default)(_express, expressAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_express, expressAction.remove, AllowEveryoneAuth), (0, _defineProperty3.default)(_express, expressAction.taPrepare, AllowEveryoneAuth), (0, _defineProperty3.default)(_express, expressAction.taAccept, {
        auths: [{
            '#data': [{
                check: function check(_ref2) {
                    var user = _ref2.user,
                        row = _ref2.row;

                    return [expressState.tsSending].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_express, expressAction.taReject, {
        auths: [{
            '#data': [{
                check: function check(_ref3) {
                    var user = _ref3.user,
                        row = _ref3.row;

                    return [expressState.tsSending].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_express, expressAction.taSend, {
        auths: [{
            '#data': [{
                check: function check(_ref4) {
                    var user = _ref4.user,
                        row = _ref4.row;

                    return [expressState.tsInPreparing].includes(row.state);
                }
            }]
        }]
    }), _express),
    lgSkuValue: (_lgSkuValue = {}, (0, _defineProperty3.default)(_lgSkuValue, skuValueAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgShop',
                condition: function condition(_ref5) {
                    var user = _ref5.user;

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
                condition: function condition(_ref6) {
                    var user = _ref6.user;

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
                condition: function condition(_ref7) {
                    var user = _ref7.user;

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
                condition: function condition(_ref8) {
                    var user = _ref8.user,
                        actionData = _ref8.actionData;
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
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgValue, valueAction.remove, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref11) {
                    var user = _ref11.user;

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
                condition: function condition(_ref12) {
                    var user = _ref12.user;

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
                condition: function condition(_ref13) {
                    var user = _ref13.user;

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
                condition: function condition(_ref14) {
                    var user = _ref14.user;

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
                condition: function condition(_ref15) {
                    var user = _ref15.user,
                        actionData = _ref15.actionData;
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
        }, {
            "#exists": [{
                relation: 'userLgMall',
                condition: function condition(_ref17) {
                    var user = _ref17.user;

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
        }, {
            "#exists": [{
                relation: 'userLgMall',
                condition: function condition(_ref19) {
                    var user = _ref19.user;

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
    }), (0, _defineProperty3.default)(_lgPropertySpecies, propertySpeciesAction.update, {
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
    }), (0, _defineProperty3.default)(_lgPropertySpecies, propertySpeciesAction.remove, {
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
    }), _lgPropertySpecies),
    lgSpecies: (_lgSpecies = {}, (0, _defineProperty3.default)(_lgSpecies, speciesAction.create, {
        auths: [{
            "#exists": [{
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
    }), (0, _defineProperty3.default)(_lgSpecies, speciesAction.update, {
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
    }), (0, _defineProperty3.default)(_lgSpecies, speciesAction.remove, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref25) {
                    var user = _ref25.user;

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
                condition: function condition(_ref26) {
                    var user = _ref26.user;

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
                condition: function condition(_ref27) {
                    var user = _ref27.user;

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
                condition: function condition(_ref28) {
                    var user = _ref28.user;

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
                condition: function condition(_ref29) {
                    var user = _ref29.user;

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
                check: function check(_ref30) {
                    var user = _ref30.user,
                        row = _ref30.row;

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
                check: function check(_ref31) {
                    var user = _ref31.user,
                        row = _ref31.row;

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
                condition: function condition(_ref32) {
                    var user = _ref32.user,
                        actionData = _ref32.actionData;
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
                condition: function condition(_ref33) {
                    var user = _ref33.user;

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
                condition: function condition(_ref34) {
                    var user = _ref34.user,
                        actionData = _ref34.actionData;
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
                attr: '',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }, {
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
            },
            '#data': [{
                check: function check(_ref35) {
                    var user = _ref35.user,
                        row = _ref35.row;

                    return [shopState.offline].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'lgMall.lgDistrict',
                relations: [districtRelation.owner, districtRelation.manager]
            },
            '#data': [{
                check: function check(_ref36) {
                    var user = _ref36.user,
                        row = _ref36.row;

                    return [shopState.offline].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgShop, shopAction.offline, {
        auths: [{
            "#relation": {
                attr: 'lgMall',
                relations: [mallRelation.owner, mallRelation.manager]
            },
            '#data': [{
                check: function check(_ref37) {
                    var user = _ref37.user,
                        row = _ref37.row;

                    return [shopState.online].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'lgMall.lgDistrict',
                relations: [districtRelation.owner, districtRelation.manager]
            },
            '#data': [{
                check: function check(_ref38) {
                    var user = _ref38.user,
                        row = _ref38.row;

                    return [shopState.online].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgShop, shopAction.disable, {
        auths: [{
            '#role': [Roles.ROOT.name],
            '#data': [{
                check: function check(_ref39) {
                    var user = _ref39.user,
                        row = _ref39.row;

                    return [shopState.offline, shopState.online].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgShop, shopAction.able, {
        auths: [{
            '#role': [Roles.ROOT.name],
            '#data': [{
                check: function check(_ref40) {
                    var user = _ref40.user,
                        row = _ref40.row;

                    return [shopState.disabled].includes(row.state);
                }
            }]
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
                condition: function condition(_ref41) {
                    var user = _ref41.user,
                        actionData = _ref41.actionData;
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
                condition: function condition(_ref42) {
                    var user = _ref42.user,
                        actionData = _ref42.actionData;
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
                check: function check(_ref43) {
                    var user = _ref43.user,
                        row = _ref43.row;

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
                check: function check(_ref44) {
                    var user = _ref44.user,
                        row = _ref44.row;

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
                relations: [shopRelation.manager, shopRelation.owner]
            },
            '#data': [{
                check: function check(_ref45) {
                    var user = _ref45.user,
                        row = _ref45.row;

                    return [tradeState.unpaid].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, tradeAction.pick, {
        auths: [{
            '#data': [{
                check: function check(_ref46) {
                    var user = _ref46.user,
                        row = _ref46.row;

                    return [tradeTransportState.unpicked].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, tradeAction.taPrepare, {
        auths: [{
            '#data': [{
                check: function check(_ref47) {
                    var user = _ref47.user,
                        row = _ref47.row;

                    return [tradeState.legal, tradeState.legal2].includes(row.state) && [tradeTransportState.unsend].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, tradeAction.taSend, {
        auths: [{
            "#relation": {
                attr: 'lgShop'
            },
            '#data': [{
                check: function check(_ref48) {
                    var user = _ref48.user,
                        row = _ref48.row;

                    return [tradeState.legal, tradeState.legal2].includes(row.state) && [tradeTransportState.tsInPreparing].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, tradeAction.taAccept, {
        auths: [{
            '#data': [{
                check: function check(_ref49) {
                    var user = _ref49.user,
                        row = _ref49.row;

                    return [tradeState.legal, tradeState.legal2].includes(row.state) && row.buyerId && row.buyerId === user.id && [tradeTransportState.tsSending].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, tradeAction.taReject, {
        auths: [{
            '#data': [{
                check: function check(_ref50) {
                    var user = _ref50.user,
                        row = _ref50.row;

                    return [tradeState.legal, tradeState.legal2].includes(row.state) && row.buyerId && row.buyerId === user.id && [tradeTransportState.tsSending].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, tradeAction.cancel, {
        auths: [{
            '#data': [{
                check: function check(_ref51) {
                    var user = _ref51.user,
                        row = _ref51.row;

                    return row.buyerId === user.id && [tradeState.unpaid].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'lgShop'
            },
            '#data': [{
                check: function check(_ref52) {
                    var user = _ref52.user,
                        row = _ref52.row;

                    return [tradeState.unpaid].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, tradeAction.stopPaying, {
        auths: [{
            "#relation": {
                attr: ''
            },
            '#data': [{
                check: function check(_ref53) {
                    var user = _ref53.user,
                        row = _ref53.row;

                    return [tradeState.paying, tradeState.partialPaid].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, tradeAction.startToPay, {
        auths: [{
            "#relation": {
                attr: ''
            },
            '#data': [{
                check: function check(_ref54) {
                    var user = _ref54.user,
                        row = _ref54.row;

                    return [tradeState.unpaid, tradeState.partialPaid].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'lgShop'
            },
            '#data': [{
                check: function check(_ref55) {
                    var user = _ref55.user,
                        row = _ref55.row;

                    return [tradeState.unpaid, tradeState.partialPaid].includes(row.state);
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
    }), (0, _defineProperty3.default)(_lgServiceCompany, serviceCompanyAction.assign, {
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
                check: function check(_ref56) {
                    var user = _ref56.user,
                        row = _ref56.row;

                    return row.userId === user.id;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgShoppingCart, shoppingCartAction.remove, {
        auths: [{
            "#data": [{
                check: function check(_ref57) {
                    var user = _ref57.user,
                        row = _ref57.row;

                    return row.userId === user.id;
                }
            }]
        }]
    }), _lgShoppingCart),
    lgSkuItemValue: (_lgSkuItemValue = {}, (0, _defineProperty3.default)(_lgSkuItemValue, skuItemValueAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgShop',
                condition: function condition(_ref58) {
                    var user = _ref58.user;

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
                condition: function condition(_ref59) {
                    var user = _ref59.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref60) {
                    var user = _ref60.user;

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
                condition: function condition(_ref61) {
                    var user = _ref61.user;

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
                condition: function condition(_ref62) {
                    var user = _ref62.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref63) {
                    var user = _ref63.user;

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
                condition: function condition(_ref64) {
                    var user = _ref64.user;

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
                condition: function condition(_ref65) {
                    var user = _ref65.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref66) {
                    var user = _ref66.user;

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
                condition: function condition(_ref67) {
                    var user = _ref67.user;

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
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'lgSku.lgShop.lgMall'
            }
        }, {
            "#relation": {
                attr: 'lgSku.lgShop.lgMall.lgDistrict'
            }
        }]
    }), (0, _defineProperty3.default)(_lgSkuItemShop, skuItemShopAction.remove, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [shopRelation.owner, shopRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'lgSku.lgShop.lgMall'
            }
        }, {
            "#relation": {
                attr: 'lgSku.lgShop.lgMall.lgDistrict'
            }
        }]
    }), _lgSkuItemShop),
    lgPlate: (0, _defineProperty3.default)({}, plateAction.create, AllowEveryoneAuth),
    lgTradeSkuItemShop: (0, _defineProperty3.default)({}, tradeSkuItemShopAction.create, AllowEveryoneAuth),
    lgReckoner: (_lgReckoner = {}, (0, _defineProperty3.default)(_lgReckoner, ReckonerAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_lgReckoner, ReckonerAction.update, {
        auths: [{
            "#relation": {
                attr: ''
            }
        }]
    }), (0, _defineProperty3.default)(_lgReckoner, ReckonerAction.remove, {
        auths: [{
            "#relation": {
                attr: '',
                relation: [ReckonerRelation.owner]
            }
        }]
    }), _lgReckoner)
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