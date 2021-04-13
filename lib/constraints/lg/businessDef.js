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
    ShopSpeciesAction = _require3.action;

var _require4 = require('../../constants/lg/enterUp'),
    EnterUpAction = _require4.action;

var _require5 = require('../../constants/lg/district'),
    DistrictAction = _require5.action,
    DistrictRelation = _require5.relation;

var _require6 = require('../../constants/lg/mall'),
    MallAction = _require6.action,
    MallRelation = _require6.relation;

var _require7 = require('../../constants/lg/shop'),
    ShopAction = _require7.action,
    ShopState = _require7.state,
    ShopRelation = _require7.relation,
    SHOP_STATE_TRANS_MATRIX = _require7.STATE_TRANS_MATRIX;

var _require8 = require('../../constants/lg/weChatSettlement'),
    WeChatSettlementAction = _require8.action,
    WeChatSettlementState = _require8.state,
    WeChatSettlementRelation = _require8.relation;

var _require9 = require('../../constants/lg/sku'),
    SkuAction = _require9.action,
    SkuState = _require9.state,
    SKU_STATE_TRANS_MATRIX = _require9.STATE_TRANS_MATRIX;

var _require10 = require('../../constants/lg/trade'),
    TradeAction = _require10.action,
    TradeTransportState = _require10.transportState,
    TradeState = _require10.state,
    TRADE_STATE_TRANS_MATRIX = _require10.STATE_TRANS_MATRIX;

var _require11 = require('../../constants/lg/skuItem'),
    SkuItemAction = _require11.action,
    SkuItemState = _require11.state,
    SKUITEM_STATE_TRANS_MATRIX = _require11.STATE_TRANS_MATRIX;

var _require12 = require('../../constants/lg/brand'),
    BrandAction = _require12.action;

var _require13 = require('../../constants/lg/species'),
    SpeciesAction = _require13.action;

var _require14 = require('../../constants/lg/property'),
    PropertyAction = _require14.action;

var _require15 = require('../../constants/lg/propertySpecies'),
    PropertySpeciesAction = _require15.action;

var _require16 = require('../../constants/lg/value'),
    ValueAction = _require16.action;

var _require17 = require('../../constants/lg/skuValue'),
    SkuValueAction = _require17.action;

var _require18 = require('../../constants/lg/serviceCompany'),
    ServiceCompanyAction = _require18.action,
    ServiceCompanyRelation = _require18.relation;

var _require19 = require('../../constants/lg/shoppingCart'),
    ShoppingCartAction = _require19.action;

var _require20 = require('../../constants/lg/skuItemValue'),
    skuItemValueAction = _require20.action;

var _require21 = require('../../constants/lg/skuItemShop'),
    SkuItemShopAction = _require21.action;

var _require22 = require('../../constants/lg/plate'),
    PlateAction = _require22.action;

var _require23 = require('../../constants/lg/tradeSkuItemShop'),
    TradeSkuItemShopAction = _require23.action,
    TradeSkuItemShopState = _require23.state;

var _require24 = require('../../constants/lg/express'),
    ExpressAction = _require24.action,
    ExpressState = _require24.state;

var _require25 = require('../../constants/lg/service'),
    ServiceAction = _require25.action;

var _require26 = require('../../constants/lg/reckoner'),
    ReckonerAction = _require26.action,
    ReckonerRelation = _require26.relation;

var AUTH_MATRIX = {
    lgService: (0, _defineProperty3.default)({}, ServiceAction.create, AllowEveryoneAuth),
    lgShopSpecies: (_lgShopSpecies = {}, (0, _defineProperty3.default)(_lgShopSpecies, ShopSpeciesAction.create, {
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
                                $in: [ShopRelation.owner, ShopRelation.manager]
                            }
                        };
                    }
                    return {
                        userId: -1
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgShopSpecies, ShopSpeciesAction.remove, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
            }
        }]
    }), _lgShopSpecies),
    express: (_express = {}, (0, _defineProperty3.default)(_express, ExpressAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_express, ExpressAction.update, AllowEveryoneAuth), (0, _defineProperty3.default)(_express, ExpressAction.remove, AllowEveryoneAuth), (0, _defineProperty3.default)(_express, ExpressAction.taPrepare, AllowEveryoneAuth), (0, _defineProperty3.default)(_express, ExpressAction.taAccept, {
        auths: [{
            '#data': [{
                check: function check(_ref2) {
                    var user = _ref2.user,
                        row = _ref2.row;

                    return [ExpressState.tsSending].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_express, ExpressAction.taReject, {
        auths: [{
            '#data': [{
                check: function check(_ref3) {
                    var user = _ref3.user,
                        row = _ref3.row;

                    return [ExpressState.tsSending].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_express, ExpressAction.taSend, {
        auths: [{
            '#data': [{
                check: function check(_ref4) {
                    var user = _ref4.user,
                        row = _ref4.row;

                    return [ExpressState.tsInPreparing].includes(row.transportState);
                }
            }]
        }]
    }), _express),
    lgSkuValue: (_lgSkuValue = {}, (0, _defineProperty3.default)(_lgSkuValue, SkuValueAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgShop',
                condition: function condition(_ref5) {
                    var user = _ref5.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [ShopRelation.owner, ShopRelation.manager]
                        }
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgSkuValue, SkuValueAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgSkuValue, ValueAction.remove, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
            }
        }]
    }), _lgSkuValue),
    lgValue: (_lgValue = {}, (0, _defineProperty3.default)(_lgValue, ValueAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref6) {
                    var user = _ref6.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
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
                            $in: [MallRelation.owner, MallRelation.manager]
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
                                $in: [ShopRelation.owner, ShopRelation.manager]
                            }
                        };
                    }
                    return {
                        userId: -1
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgValue, ValueAction.update, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref9) {
                    var user = _ref9.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
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
                            $in: [MallRelation.owner, MallRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgValue, ValueAction.remove, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref11) {
                    var user = _ref11.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
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
                            $in: [MallRelation.owner, MallRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
            }
        }]
    }), _lgValue),
    lgProperty: (_lgProperty = {}, (0, _defineProperty3.default)(_lgProperty, PropertyAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref13) {
                    var user = _ref13.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
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
                            $in: [MallRelation.owner, MallRelation.manager]
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
                                $in: [ShopRelation.owner, ShopRelation.manager]
                            }
                        };
                    }
                    return {
                        userId: -1
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgProperty, PropertyAction.update, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref16) {
                    var user = _ref16.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
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
                            $in: [MallRelation.owner, MallRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgProperty, PropertyAction.remove, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref18) {
                    var user = _ref18.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
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
                            $in: [MallRelation.owner, MallRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }, {
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
            }
        }]
    }), _lgProperty),
    lgPropertySpecies: (_lgPropertySpecies = {}, (0, _defineProperty3.default)(_lgPropertySpecies, PropertySpeciesAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref20) {
                    var user = _ref20.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgPropertySpecies, PropertySpeciesAction.update, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref21) {
                    var user = _ref21.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgPropertySpecies, PropertySpeciesAction.remove, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref22) {
                    var user = _ref22.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _lgPropertySpecies),
    lgSpecies: (_lgSpecies = {}, (0, _defineProperty3.default)(_lgSpecies, SpeciesAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref23) {
                    var user = _ref23.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgSpecies, SpeciesAction.update, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref24) {
                    var user = _ref24.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgSpecies, SpeciesAction.remove, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref25) {
                    var user = _ref25.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _lgSpecies),
    lgBrand: (_lgBrand = {}, (0, _defineProperty3.default)(_lgBrand, BrandAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref26) {
                    var user = _ref26.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgBrand, BrandAction.update, {
        auths: [{
            '#exists': [{
                relation: 'userLgDistrict',
                condition: function condition(_ref27) {
                    var user = _ref27.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgBrand, BrandAction.remove, {
        auths: [{
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref28) {
                    var user = _ref28.user;

                    var query = {
                        userId: user.id,
                        relation: {
                            $in: [DistrictRelation.owner, DistrictRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), _lgBrand),
    lgSkuItem: (_lgSkuItem = {}, (0, _defineProperty3.default)(_lgSkuItem, SkuItemAction.create, { // todo 细化写在definition中
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
    }), (0, _defineProperty3.default)(_lgSkuItem, SkuItemAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgSkuItem, SkuItemAction.online, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
            },
            '#data': [{
                check: function check(_ref30) {
                    var user = _ref30.user,
                        row = _ref30.row;

                    return [SkuItemState.offline].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgSkuItem, SkuAction.offline, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
            },
            '#data': [{
                check: function check(_ref31) {
                    var user = _ref31.user,
                        row = _ref31.row;

                    return [SkuItemState.online].includes(row.state);
                }
            }]
        }]
    }), _lgSkuItem),
    lgDistrict: (_lgDistrict = {}, (0, _defineProperty3.default)(_lgDistrict, DistrictAction.update, {
        auths: [{
            "#relation": {
                relations: [DistrictRelation.owner, DistrictRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgDistrict, DistrictAction.remove, {
        auths: [{
            "#relation": {
                relations: [DistrictRelation.owner]
            }
        }]
    }), _lgDistrict),
    lgMall: (_lgMall = {}, (0, _defineProperty3.default)(_lgMall, MallAction.create, {
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
    }), (0, _defineProperty3.default)(_lgMall, MallAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgDistrict',
                relations: [DistrictRelation.owner, DistrictRelation.manager]
            }
        }, {
            "#relation": {
                relations: [MallRelation.owner, MallRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgMall, MallRelation.remove, {
        auths: [{
            "#relation": {
                attr: 'lgDistrict',
                relations: [DistrictRelation.owner, DistrictRelation.manager]
            }
        }, {
            "#relation": {
                relations: [MallRelation.owner]
            }
        }]
    }), _lgMall),
    lgShop: (_lgShop = {}, (0, _defineProperty3.default)(_lgShop, ShopAction.create, {
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
    }), (0, _defineProperty3.default)(_lgShop, ShopAction.update, {
        auths: [{
            "#relation": {
                attr: '',
                relations: [ShopRelation.owner, ShopRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'lgMall',
                relations: [MallRelation.owner, MallRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'lgMall.lgDistrict',
                relations: [DistrictRelation.owner, DistrictRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgShop, ShopAction.remove, {
        auths: [{
            "#relation": {
                attr: 'lgMall',
                relations: [MallRelation.owner, MallRelation.manager]
            }
        }, {
            "#relation": {
                relations: [ShopRelation.owner]
            }
        }, {
            "#relation": {
                attr: 'lgMall.lgDistrict',
                relations: [DistrictRelation.owner, DistrictRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgShop, ShopAction.online, {
        auths: [{
            "#relation": {
                attr: 'lgMall',
                relations: [MallRelation.owner, MallRelation.manager]
            },
            '#data': [{
                check: function check(_ref35) {
                    var user = _ref35.user,
                        row = _ref35.row;

                    return [ShopState.offline].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'lgMall.lgDistrict',
                relations: [DistrictRelation.owner, DistrictRelation.manager]
            },
            '#data': [{
                check: function check(_ref36) {
                    var user = _ref36.user,
                        row = _ref36.row;

                    return [ShopState.offline].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                relations: [ShopRelation.owner, ShopRelation.manager]
            },
            '#data': [{
                check: function check(_ref37) {
                    var user = _ref37.user,
                        row = _ref37.row;

                    return [ShopState.offline].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgShop, ShopAction.offline, {
        auths: [{
            "#relation": {
                attr: 'lgMall',
                relations: [MallRelation.owner, MallRelation.manager]
            },
            '#data': [{
                check: function check(_ref38) {
                    var user = _ref38.user,
                        row = _ref38.row;

                    return [ShopState.online].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'lgMall.lgDistrict',
                relations: [DistrictRelation.owner, DistrictRelation.manager]
            },
            '#data': [{
                check: function check(_ref39) {
                    var user = _ref39.user,
                        row = _ref39.row;

                    return [ShopState.online].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                relations: [ShopRelation.owner, ShopRelation.manager]
            },
            '#data': [{
                check: function check(_ref40) {
                    var user = _ref40.user,
                        row = _ref40.row;

                    return [ShopState.online].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgShop, ShopAction.disable, {
        auths: [{
            '#role': [Roles.ROOT.name],
            '#data': [{
                check: function check(_ref41) {
                    var user = _ref41.user,
                        row = _ref41.row;

                    return [ShopState.online, ShopState.offline].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgShop, ShopAction.able, {
        auths: [{
            '#role': [Roles.ROOT.name],
            '#data': [{
                check: function check(_ref42) {
                    var user = _ref42.user,
                        row = _ref42.row;

                    return [ShopState.disabled].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgShop, ShopAction.assign, {
        auths: [{
            "#relation": {
                attr: 'lgMall',
                relations: [MallRelation.owner, MallRelation.manager]
            }
        }, {
            "#relation": {
                attr: 'lgMall.lgDistrict',
                relations: [DistrictRelation.owner, DistrictRelation.manager]
            }
        }, {
            "#relation": {
                relations: [ShopRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_lgShop, ShopAction.transfer, {
        auths: [{
            "#relation": {
                relations: [ShopRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_lgShop, ShopAction.authGrantMulti2, {
        auths: [{
            "#relation": {
                relations: [ShopRelation.owner, ShopRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgShop, ShopAction.authRevoke, {
        auths: [{
            "#relation": {
                relations: [ShopRelation.owner]
            }
        }]
    }), _lgShop),
    lgWeChatSettlement: (_lgWeChatSettlement = {}, (0, _defineProperty3.default)(_lgWeChatSettlement, WeChatSettlementAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userLgShop',
                needData: true,
                condition: function condition(_ref43) {
                    var user = _ref43.user,
                        actionData = _ref43.actionData;
                    var lgWeChatSettlement = actionData.lgWeChatSettlement;

                    var query = {
                        userId: user.id,
                        lgShopId: lgWeChatSettlement.lgShopId,
                        relation: ShopRelation.owner
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgWeChatSettlement, WeChatSettlementAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [ShopRelation.owner]
            }
        }]
    }), _lgWeChatSettlement),
    lgSku: (_lgSku = {}, (0, _defineProperty3.default)(_lgSku, SkuAction.create, {
        auths: [{
            '#exists': [{
                relation: 'userLgShop',
                needData: true,
                condition: function condition(_ref44) {
                    var user = _ref44.user,
                        actionData = _ref44.actionData;
                    var lgSku = actionData.lgSku;

                    var query = {
                        userId: user.id,
                        lgShopId: lgSku.lgShopId,
                        relation: {
                            $in: [ShopRelation.owner, ShopRelation.manager]
                        }
                    };
                    return query;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgSku, SkuAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgSku, SkuAction.remove, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgSku, SkuAction.online, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
            },
            '#data': [{
                check: function check(_ref45) {
                    var user = _ref45.user,
                        row = _ref45.row;

                    return [SkuState.offline].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgSku, SkuAction.offline, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
            },
            '#data': [{
                check: function check(_ref46) {
                    var user = _ref46.user,
                        row = _ref46.row;

                    return [SkuState.online].includes(row.state);
                }
            }]
        }]
    }), _lgSku),
    lgTrade: (_lgTrade = {}, (0, _defineProperty3.default)(_lgTrade, TradeAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_lgTrade, TradeAction.makePaid, {
        auths: [{
            "#relation": {
                attr: 'lgShop'
            }
        }]
    }), (0, _defineProperty3.default)(_lgTrade, TradeAction.makeAbandoned, {
        auths: [{
            "#relation": {
                attr: 'lgShop',
                relations: [ShopRelation.manager, ShopRelation.owner]
            },
            '#data': [{
                check: function check(_ref47) {
                    var user = _ref47.user,
                        row = _ref47.row;

                    return [TradeState.legal2].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, TradeAction.pick, {
        auths: [{
            '#data': [{
                check: function check(_ref48) {
                    var user = _ref48.user,
                        row = _ref48.row;

                    return [TradeTransportState.unpicked].includes(row.transportState);
                },
                message: '订单已提货'
            }, {
                check: function check(_ref49) {
                    var user = _ref49.user,
                        row = _ref49.row;

                    return [TradeState.legal2, TradeState.legal].includes(row.state);
                },
                message: '订单未结算，请结算完成后再进行提货'
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, TradeAction.taPrepare, {
        auths: [{
            '#data': [{
                check: function check(_ref50) {
                    var user = _ref50.user,
                        row = _ref50.row;

                    return [TradeState.legal, TradeState.legal2].includes(row.state) && [TradeTransportState.unsend].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, TradeAction.taSend, {
        auths: [{
            "#relation": {
                attr: 'lgShop'
            },
            '#data': [{
                check: function check(_ref51) {
                    var user = _ref51.user,
                        row = _ref51.row;

                    return [TradeState.legal, TradeState.legal2].includes(row.state) && [TradeTransportState.tsInPreparing].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, TradeAction.taAccept, {
        auths: [{
            '#data': [{
                check: function check(_ref52) {
                    var user = _ref52.user,
                        row = _ref52.row;

                    return [TradeState.legal, TradeState.legal2].includes(row.state) && row.buyerId && row.buyerId === user.id && [TradeTransportState.tsSending].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, TradeAction.taReject, {
        auths: [{
            '#data': [{
                check: function check(_ref53) {
                    var user = _ref53.user,
                        row = _ref53.row;

                    return [TradeState.legal, TradeState.legal2].includes(row.state) && row.buyerId && row.buyerId === user.id && [TradeTransportState.tsSending].includes(row.transportState);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, TradeAction.cancel, {
        auths: [{
            '#data': [{
                check: function check(_ref54) {
                    var user = _ref54.user,
                        row = _ref54.row;

                    return row.buyerId === user.id && [TradeState.unpaid].includes(row.state);
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

                    return [TradeState.unpaid].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, TradeAction.refund, {
        auths: [{
            '#data': [{
                check: function check(_ref56) {
                    var user = _ref56.user,
                        row = _ref56.row;

                    return row.buyerId === user.id && [TradeState.legal, TradeState.partialPaid].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, TradeAction.stopPaying, {
        auths: [{
            "#relation": {
                attr: ''
            },
            '#data': [{
                check: function check(_ref57) {
                    var user = _ref57.user,
                        row = _ref57.row;

                    return [TradeState.paying, TradeState.partialPaid].includes(row.state);
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgTrade, TradeAction.startToPay, {
        auths: [{
            "#relation": {
                attr: ''
            },
            '#data': [{
                check: function check(_ref58) {
                    var user = _ref58.user,
                        row = _ref58.row;

                    return [TradeState.unpaid, TradeState.partialPaid].includes(row.state);
                }
            }]
        }, {
            "#relation": {
                attr: 'lgShop'
            },
            '#data': [{
                check: function check(_ref59) {
                    var user = _ref59.user,
                        row = _ref59.row;

                    return [TradeState.unpaid, TradeState.partialPaid].includes(row.state);
                }
            }]
        }]
    }), _lgTrade),
    lgServiceCompany: (_lgServiceCompany = {}, (0, _defineProperty3.default)(_lgServiceCompany, ServiceCompanyAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_lgServiceCompany, ServiceCompanyAction.update, {
        auths: [{
            "#relation": {
                relations: [ServiceCompanyRelation.owner, ServiceCompanyRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgServiceCompany, ServiceCompanyAction.remove, {
        auths: [{
            "#relation": {
                relations: [ServiceCompanyRelation.owner]
            }
        }]
    }), (0, _defineProperty3.default)(_lgServiceCompany, ServiceCompanyAction.authGrantMulti2, {
        auths: [{
            "#relation": {
                relations: [ServiceCompanyRelation.owner, ServiceCompanyRelation.manager]
            }
        }]
    }), (0, _defineProperty3.default)(_lgServiceCompany, ServiceCompanyAction.assign, {
        auths: [{
            "#relation": {
                relations: [ServiceCompanyRelation.owner, ServiceCompanyRelation.manager]
            }
        }]
    }), _lgServiceCompany),
    enterUp: (_enterUp = {}, (0, _defineProperty3.default)(_enterUp, EnterUpAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_enterUp, EnterUpAction.update, AnyRelationAuth), _enterUp),
    lgShoppingCart: (_lgShoppingCart = {}, (0, _defineProperty3.default)(_lgShoppingCart, ShoppingCartAction.create, AllowEveryoneAuth), (0, _defineProperty3.default)(_lgShoppingCart, ShoppingCartAction.update, {
        auths: [{
            "#data": [{
                check: function check(_ref60) {
                    var user = _ref60.user,
                        row = _ref60.row;

                    return row.userId === user.id;
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgShoppingCart, ShoppingCartAction.remove, {
        auths: [{
            "#data": [{
                check: function check(_ref61) {
                    var user = _ref61.user,
                        row = _ref61.row;

                    return row.userId === user.id;
                }
            }]
        }]
    }), _lgShoppingCart),
    lgSkuItemValue: (_lgSkuItemValue = {}, (0, _defineProperty3.default)(_lgSkuItemValue, skuItemValueAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgShop',
                condition: function condition(_ref62) {
                    var user = _ref62.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [ShopRelation.owner, ShopRelation.manager]
                        }
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgMall',
                condition: function condition(_ref63) {
                    var user = _ref63.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref64) {
                    var user = _ref64.user;

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
                condition: function condition(_ref65) {
                    var user = _ref65.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [ShopRelation.owner, ShopRelation.manager]
                        }
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgMall',
                condition: function condition(_ref66) {
                    var user = _ref66.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref67) {
                    var user = _ref67.user;

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
                condition: function condition(_ref68) {
                    var user = _ref68.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [ShopRelation.owner, ShopRelation.manager]
                        }
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgMall',
                condition: function condition(_ref69) {
                    var user = _ref69.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }, {
            "#exists": [{
                relation: 'userLgDistrict',
                condition: function condition(_ref70) {
                    var user = _ref70.user;

                    return {
                        userId: user.id
                    };
                }
            }]
        }]
    }), _lgSkuItemValue),
    lgSkuItemShop: (_lgSkuItemShop = {}, (0, _defineProperty3.default)(_lgSkuItemShop, SkuItemShopAction.create, {
        auths: [{
            "#exists": [{
                relation: 'userLgShop',
                condition: function condition(_ref71) {
                    var user = _ref71.user;

                    return {
                        userId: user.id,
                        relation: {
                            $in: [ShopRelation.owner, ShopRelation.manager]
                        }
                    };
                }
            }]
        }]
    }), (0, _defineProperty3.default)(_lgSkuItemShop, SkuItemShopAction.update, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
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
    }), (0, _defineProperty3.default)(_lgSkuItemShop, SkuItemShopAction.remove, {
        auths: [{
            "#relation": {
                attr: 'lgSku.lgShop',
                relations: [ShopRelation.owner, ShopRelation.manager]
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
    lgPlate: (0, _defineProperty3.default)({}, PlateAction.create, AllowEveryoneAuth),
    lgTradeSkuItemShop: (0, _defineProperty3.default)({}, TradeSkuItemShopAction.create, AllowEveryoneAuth),
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