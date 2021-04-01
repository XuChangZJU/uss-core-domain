const { Roles } = require('../../constants/roleConstant2');
const {
    AllowEveryoneAuth,
    OwnerRelationAuth,
    AnyRelationAuth,
} = require('../action');
const {
    action: shopSpeciesAction,
} = require('../../constants/lg/shopSpecies');
const {
    action: enterUpAction,
} = require('../../constants/lg/enterUp');
const {
    action: districtAction,
    relation: districtRelation,
} = require('../../constants/lg/district');
const {
    action: mallAction,
    relation: mallRelation,
} = require('../../constants/lg/mall');

const {
    action: shopAction,
    state: shopState,
    relation: shopRelation,
    STATE_TRANS_MATRIX: SHOP_STATE_TRANS_MATRIX,
} = require('../../constants/lg/shop');

const {
    action: WeChatSettlementAction,
    state: WeChatSettlementState,
    relation: WeChatSettlementRelation,
} = require('../../constants/lg/weChatSettlement');

const {
    action: skuAction,
    state: skuState,
    STATE_TRANS_MATRIX: SKU_STATE_TRANS_MATRIX,
} = require('../../constants/lg/sku');

const {
    action: tradeAction,
    transportState: tradeTransportState,
    state: tradeState,
    STATE_TRANS_MATRIX: TRADE_STATE_TRANS_MATRIX,
} = require('../../constants/lg/trade');

const {
    action: skuItemAction,
    state: skuItemState,
    STATE_TRANS_MATRIX: SKUITEM_STATE_TRANS_MATRIX,
} = require('../../constants/lg/skuItem');

const {
    action: brandAction,
} = require('../../constants/lg/brand');

const {
    action: speciesAction,
} = require('../../constants/lg/species');

const {
    action: propertyAction
} = require('../../constants/lg/property');

const {
    action: propertySpeciesAction,
} = require('../../constants/lg/propertySpecies');

const {
    action: valueAction,
} = require('../../constants/lg/value');

const {
    action: skuValueAction,
} = require('../../constants/lg/skuValue');

const {
    action: serviceCompanyAction,
    relation: serviceCompanyRelation
} = require('../../constants/lg/serviceCompany');

const {
    action: shoppingCartAction,
} = require('../../constants/lg/shoppingCart');

const {
    action: skuItemValueAction,
} = require('../../constants/lg/skuItemValue');

const {
    action: skuItemShopAction,
} = require('../../constants/lg/skuItemShop');

const {
    action: plateAction,
} = require('../../constants/lg/plate');

const {
    action: tradeSkuItemShopAction,
    state: tradeSkuItemShopState,
} = require('../../constants/lg/tradeSkuItemShop');

const {
    action: expressAction,
    state: expressState,
} = require('../../constants/lg/express');
const {
    action: serviceAction,
} = require('../../constants/lg/service');

const {
    action: ReckonerAction,
    relation: ReckonerRelation,
} = require('../../constants/lg/reckoner');

const AUTH_MATRIX = {
    lgService: {
        [serviceAction.create]: AllowEveryoneAuth,
    },
    lgShopSpecies: {
        [shopSpeciesAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgShop',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { lgShopSpecies } = actionData;
                                if(lgShopSpecies.lgShopId){
                                    return {
                                        userId: user.id,
                                        lgShopId: lgShopSpecies.lgShopId,
                                        relation: {
                                            $in: [shopRelation.owner, shopRelation.manager]
                                        }
                                    }
                                }
                                return {
                                    userId: -1,
                                };
                            },
                        },
                    ]
                },
            ]
        },
        [shopSpeciesAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                },
            ]
        },
    },
    express: {
        [expressAction.create]: AllowEveryoneAuth,
        [expressAction.remove]: AllowEveryoneAuth,
        [expressAction.taPrepare]: AllowEveryoneAuth,
        [expressAction.taAccept]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [expressState.tsSending].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [expressAction.taReject]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [expressState.tsSending].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [expressAction.taSend]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [expressState.tsInPreparing].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
    },
    lgSkuValue: {
        [skuValueAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgShop',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                    relation: {
                                        $in: [shopRelation.owner, shopRelation.manager],
                                    },
                                };
                            },
                        },
                    ]
                },
            ]
        },
        [skuValueAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                },
            ]
        },
        [valueAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                },
            ]
        },
    },
    lgValue: {
        [valueAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                },
                {
                    "#exists": [
                        {
                            relation: 'userLgMall',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [mallRelation.owner, mallRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                },
                {
                    "#exists": [
                        {
                            relation: 'userLgShop',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { lgValue } = actionData;
                                if(lgValue.lgSkuId){
                                    return {
                                        userId: user.id,
                                        relation: {
                                            $in: [shopRelation.owner, shopRelation.manager],
                                        },
                                    }
                                }
                                return {
                                    userId: -1,
                                };
                            },
                        },
                    ]
                },
            ]
        },
        [valueAction.update]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                },
                {
                    "#exists": [
                        {
                            relation: 'userLgMall',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [mallRelation.owner, mallRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                },
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                },
            ]
        },
        [valueAction.remove]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                },
                {
                    "#exists": [
                        {
                            relation: 'userLgMall',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [mallRelation.owner, mallRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                },
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                },
            ]
        },
    },
    lgProperty: {
        [propertyAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                },
                {
                    "#exists": [
                        {
                            relation: 'userLgMall',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [mallRelation.owner, mallRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                },
                {
                    "#exists": [
                        {
                            relation: 'userLgShop',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { lgProperty } = actionData;
                                if(lgProperty.lgSkuId){
                                    return {
                                        userId: user.id,
                                        relation: {
                                            $in: [shopRelation.owner, shopRelation.manager],
                                        },
                                    }
                                }
                                return {
                                    userId: -1,
                                };
                            },
                        },
                    ]
                },
            ]
        },
        [propertyAction.update]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                },
                {
                    "#exists": [
                        {
                            relation: 'userLgMall',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [mallRelation.owner, mallRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                },
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                },
            ]
        },
        [propertyAction.remove]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                },
                {
                    "#exists": [
                        {
                            relation: 'userLgMall',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [mallRelation.owner, mallRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                },
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                },
            ]
        },
    },
    lgPropertySpecies: {
        [propertySpeciesAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
        [propertySpeciesAction.update]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
        [propertySpeciesAction.remove]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
    },
    lgSpecies: {
        [speciesAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
        [speciesAction.update]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
        [speciesAction.remove]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
    },
    lgBrand: {
        [brandAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
        [brandAction.update]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
        [brandAction.remove]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [districtRelation.owner, districtRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
    },
    lgSkuItem: {
        [skuItemAction.create]: {  // todo 细化写在definition中
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgShop',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                };
                                return query;
                            },
                        },
                    ],
                },
            ],
        },
        [skuItemAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                },
            ],
        },
        [skuItemAction.online]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [skuItemState.offline].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [skuAction.offline]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [skuItemState.online].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
    },
    lgDistrict: {
        [districtAction.update]: {
            auths: [
                {
                    "#relation": {
                        relations: [districtRelation.owner, districtRelation.manager],
                    },
                },
            ],
        },
        [districtRelation.remove]: {
            auths: [
                {
                    "#relation": {
                        relations: [districtRelation.owner],
                    },
                },
            ],
        },
    },
    lgMall: {
        [mallAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userLgDistrict',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { lgMall } = actionData;
                                const query = {
                                    userId: user.id,
                                    lgMallId: lgMall.lgDistrictId,
                                };
                                return query;
                            },
                        },
                    ],
                },
            ],
        },
        [mallAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgDistrict',
                        relations: [districtRelation.owner, districtRelation.manager],
                    },
                },
                {
                    "#relation": {
                        relations: [mallRelation.owner, mallRelation.manager],
                    },
                },
            ],
        },
        [mallRelation.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgDistrict',
                        relations: [districtRelation.owner, districtRelation.manager],
                    },
                },
                {
                    "#relation": {
                        relations: [mallRelation.owner],
                    },
                },
            ],
        },
    },
    lgShop: {
        [shopAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                };
                                return query;
                            },
                        },
                    ],
                },
                {
                    '#exists': [
                        {
                            relation: 'userLgMall',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { lgShop } = actionData;
                                const query = {
                                    userId: user.id,
                                    lgMallId: lgShop.lgMallId,
                                };
                                return query;
                            },
                        },
                    ],
                },
            ],
        },
        [shopAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: '',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                },
                {
                    "#relation": {
                        attr: 'lgMall',
                        relations: [mallRelation.owner, mallRelation.manager],
                    },
                },
                {
                    "#relation": {
                        attr: 'lgMall.lgDistrict',
                        relations: [districtRelation.owner, districtRelation.manager],
                    },
                },
            ],
        },
        [shopAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgMall',
                        relations: [mallRelation.owner, mallRelation.manager],
                    },
                },
                {
                    "#relation": {
                        relations: [shopRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'lgMall.lgDistrict',
                        relations: [districtRelation.owner, districtRelation.manager],
                    },
                },
            ],
        },
        [shopAction.online]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgMall',
                        relations: [mallRelation.owner, mallRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [shopState.offline].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'lgMall.lgDistrict',
                        relations: [districtRelation.owner, districtRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [shopState.offline].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                },
            ],
        },
        [shopAction.offline]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgMall',
                        relations: [mallRelation.owner, mallRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [shopState.online].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'lgMall.lgDistrict',
                        relations: [districtRelation.owner, districtRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [shopState.online].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                },
            ],
        },
        [shopAction.disable]: {
            auths: [
                {
                    '#role': [Roles.ROOT.name],
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [shopState.offline, shopState.online].includes(row.state);
                            },
                        }
                    ],
                },
            ],
        },
        [shopAction.able]: {
            auths: [
                {
                    '#role': [Roles.ROOT.name],
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [shopState.disabled].includes(row.state);
                            },
                        }
                    ],
                },
            ],
        },
        [shopAction.assign]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgMall',
                        relations: [mallRelation.owner, mallRelation.manager],
                    },
                },
                {
                    "#relation": {
                        attr: 'lgMall.lgDistrict',
                        relations: [districtRelation.owner, districtRelation.manager],
                    },
                },
                {
                    "#relation": {
                        relations: [shopRelation.owner],
                    },
                },
            ],
        },
        [shopAction.transfer]: {
            auths: [
                {
                    "#relation": {
                        relations: [shopRelation.owner],
                    },
                },
            ],
        },
        [shopAction.authGrantMulti2]: {
            auths: [
                {
                    "#relation": {
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                },
            ],
        },
        [shopAction.authRevoke]: {
            auths: [
                {
                    "#relation": {
                        relations: [shopRelation.owner],
                    },
                },
            ],
        },
    },
    lgWeChatSettlement: {
        [WeChatSettlementAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userLgShop',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { lgWeChatSettlement } = actionData;
                                const query = {
                                    userId: user.id,
                                    lgShopId: lgWeChatSettlement.lgShopId,
                                    relation: shopRelation.owner,
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        },
        [WeChatSettlementAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                        relations: [shopRelation.owner],
                    },
                },
            ],
        },
    },
    lgSku: {
        [skuAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userLgShop',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { lgSku } = actionData;
                                const query = {
                                    userId: user.id,
                                    lgShopId: lgSku.lgShopId,
                                    relation: {
                                        $in: [shopRelation.owner, shopRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        },
        [skuAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                }
            ]
        },
        [skuAction.online]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [skuState.offline].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [skuAction.offline]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [skuState.online].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
    },
    lgTrade: {
        [tradeAction.create]: AllowEveryoneAuth,
        [tradeAction.makePaid]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                    },
                }
            ]
        },
        [tradeAction.makeAbandoned]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                        relations: [shopRelation.manager, shopRelation.owner],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [tradeState.unpaid].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        },
        [tradeAction.pick]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [tradeTransportState.unpicked].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [tradeAction.taPrepare]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [tradeState.legal, tradeState.legal2].includes(row.state) && [tradeTransportState.unsend].includes(row.transportState);
                            },
                        }
                    ],
                },
            ],
        },
        [tradeAction.taSend]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [tradeState.legal, tradeState.legal2].includes(row.state) && [tradeTransportState.tsInPreparing].includes(row.transportState);
                            },
                        }
                    ],
                },
            ],
        },
        [tradeAction.taAccept]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [tradeState.legal, tradeState.legal2].includes(row.state) && row.buyerId && row.buyerId === user.id && [tradeTransportState.tsSending].includes(row.transportState);
                            },
                        }
                    ],
                },
            ],
        },
        [tradeAction.taReject]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [tradeState.legal, tradeState.legal2].includes(row.state) && row.buyerId && row.buyerId === user.id && [tradeTransportState.tsSending].includes(row.transportState);
                            },
                        }
                    ],
                },
            ],
        },
        [tradeAction.cancel]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.buyerId === user.id && [tradeState.unpaid].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'lgShop',
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [tradeState.unpaid].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [tradeAction.stopPaying]: {
            auths: [
                {
                    "#relation": {
                        attr: '',
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [tradeState.paying, tradeState.partialPaid].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [tradeAction.startToPay]: {
            auths: [
                {
                    "#relation": {
                        attr: '',
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [tradeState.unpaid, tradeState.partialPaid].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'lgShop',
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [tradeState.unpaid, tradeState.partialPaid].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
    },
    lgServiceCompany: {
        [serviceCompanyAction.create]: AllowEveryoneAuth,
        [serviceCompanyAction.update]: {
            auths: [
                {
                    "#relation": {
                        relations: [serviceCompanyRelation.owner, serviceCompanyRelation.manager],
                    },
                }
            ]
        },
        [serviceCompanyAction.remove]: {
            auths: [
                {
                    "#relation": {
                        relations: [serviceCompanyRelation.owner],
                    },
                }
            ]
        },
        [serviceCompanyAction.authGrantMulti2]: {
            auths: [
                {
                    "#relation": {
                        relations: [serviceCompanyRelation.owner, serviceCompanyRelation.manager],
                    },
                }
            ]
        },
        [serviceCompanyAction.assign]: {
            auths: [
                {
                    "#relation": {
                        relations: [serviceCompanyRelation.owner, serviceCompanyRelation.manager],
                    },
                }
            ]
        },
    },
    enterUp: {
        [enterUpAction.create]: AllowEveryoneAuth,
        [enterUpAction.update]: AnyRelationAuth,
    },
    lgShoppingCart: {
        [shoppingCartAction.create]: AllowEveryoneAuth,
        [shoppingCartAction.update]: {
            auths: [
                {
                    "#data": [
                        {
                            check: ({user, row}) => {
                                return row.userId === user.id;
                            },
                        }
                    ],
                },
            ]
        },
        [shoppingCartAction.remove]: {
            auths: [
                {
                    "#data": [
                        {
                            check: ({user, row}) => {
                                return row.userId === user.id;
                            },
                        }
                    ],
                },
            ]
        },
    },
    lgSkuItemValue: {
        [skuItemValueAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgShop',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                    relation: {
                                        $in: [shopRelation.owner, shopRelation.manager],
                                    },
                                };
                            },
                        },
                    ]
                },
                {
                    "#exists": [
                        {
                            relation: 'userLgMall',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                };
                            },
                        },
                    ]
                },
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                };
                            },
                        },
                    ]
                },
            ]
        },
        [skuItemValueAction.update]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgShop',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                    relation: {
                                        $in: [shopRelation.owner, shopRelation.manager],
                                    },
                                };
                            },
                        },
                    ]
                },
                {
                    "#exists": [
                        {
                            relation: 'userLgMall',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                };
                            },
                        },
                    ]
                },
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                };
                            },
                        },
                    ]
                },
            ]
        },
        [skuItemValueAction.remove]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgShop',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                    relation: {
                                        $in: [shopRelation.owner, shopRelation.manager],
                                    },
                                };
                            },
                        },
                    ]
                },
                {
                    "#exists": [
                        {
                            relation: 'userLgMall',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                };
                            },
                        },
                    ]
                },
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                };
                            },
                        },
                    ]
                },
            ]
        },
    },
    lgSkuItemShop: {
        [skuItemShopAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgShop',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                    relation: {
                                        $in: [shopRelation.owner, shopRelation.manager],
                                    },
                                };
                            },
                        },
                    ]
                },
            ]
        },
        [skuItemShopAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                },
                {
                    "#relation": {
                        attr: 'lgSku.lgShop.lgMall',
                    },
                },
                {
                    "#relation": {
                        attr: 'lgSku.lgShop.lgMall.lgDistrict',
                    },
                },
            ]
        },
        [skuItemShopAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [shopRelation.owner, shopRelation.manager],
                    },
                },
                {
                    "#relation": {
                        attr: 'lgSku.lgShop.lgMall',
                    },
                },
                {
                    "#relation": {
                        attr: 'lgSku.lgShop.lgMall.lgDistrict',
                    },
                },
            ]
        },
    },
    lgPlate: {
        [plateAction.create]: AllowEveryoneAuth,
    },
    lgTradeSkuItemShop: {
        [tradeSkuItemShopAction.create]: AllowEveryoneAuth,
    },
    lgReckoner: {
        [ReckonerAction.create]: AllowEveryoneAuth,
        [ReckonerAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: '',
                    },
                },
            ]
        },
        [ReckonerAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: '',
                        relation: [ReckonerRelation.owner],
                    },
                },
            ]
        },
    }
};
const STATE_TRAN_MATRIX = {
    lgShop: SHOP_STATE_TRANS_MATRIX,
    lgTrade: TRADE_STATE_TRANS_MATRIX,
    lgSku: SKU_STATE_TRANS_MATRIX,
    lgSkuItem: SKUITEM_STATE_TRANS_MATRIX,
};
module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};
