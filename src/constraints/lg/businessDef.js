const { Roles } = require('../../constants/roleConstant2');
const ErrorCode = require('../../constants/errorCode');
const {
    AllowEveryoneAuth,
    OwnerRelationAuth,
    AnyRelationAuth,
} = require('../action');
const {
    action: ShopSpeciesAction,
} = require('../../constants/lg/shopSpecies');
const {
    action: EnterUpAction,
} = require('../../constants/lg/enterUp');
const {
    action: DistrictAction,
    relation: DistrictRelation,
} = require('../../constants/lg/district');
const {
    action: MallAction,
    relation: MallRelation,
} = require('../../constants/lg/mall');

const {
    action: ShopAction,
    state: ShopState,
    relation: ShopRelation,
    STATE_TRANS_MATRIX: SHOP_STATE_TRANS_MATRIX,
} = require('../../constants/lg/shop');

const {
    action: WeChatSettlementAction,
    state: WeChatSettlementState,
    relation: WeChatSettlementRelation,
} = require('../../constants/lg/weChatSettlement');

const {
    action: SkuAction,
    state: SkuState,
    STATE_TRANS_MATRIX: SKU_STATE_TRANS_MATRIX,
} = require('../../constants/lg/sku');

const {
    action: TradeAction,
    transportState: TradeTransportState,
    state: TradeState,
    STATE_TRANS_MATRIX: TRADE_STATE_TRANS_MATRIX,
} = require('../../constants/lg/trade');

const {
    action: SkuItemAction,
    state: SkuItemState,
    STATE_TRANS_MATRIX: SKUITEM_STATE_TRANS_MATRIX,
} = require('../../constants/lg/skuItem');

const {
    action: BrandAction,
} = require('../../constants/lg/brand');

const {
    action: SpeciesAction,
} = require('../../constants/lg/species');

const {
    action: PropertyAction
} = require('../../constants/lg/property');

const {
    action: PropertySpeciesAction,
} = require('../../constants/lg/propertySpecies');

const {
    action: ValueAction,
} = require('../../constants/lg/value');

const {
    action: SkuValueAction,
} = require('../../constants/lg/skuValue');

const {
    action: ServiceCompanyAction,
    relation: ServiceCompanyRelation
} = require('../../constants/lg/serviceCompany');

const {
    action: ShoppingCartAction,
} = require('../../constants/lg/shoppingCart');

const {
    action: skuItemValueAction,
} = require('../../constants/lg/skuItemValue');

const {
    action: SkuItemShopAction,
} = require('../../constants/lg/skuItemShop');

const {
    action: PlateAction,
} = require('../../constants/lg/plate');

const {
    action: TradeSkuItemShopAction,
    state: TradeSkuItemShopState,
} = require('../../constants/lg/tradeSkuItemShop');

const {
    action: ExpressAction,
    state: ExpressState,
} = require('../../constants/lg/express');
const {
    action: ServiceAction,
} = require('../../constants/lg/service');

const {
    action: ReckonerAction,
    relation: ReckonerRelation,
} = require('../../constants/lg/reckoner');

const {
    action: TradeRefundAction,
    state: TradeRefundState,
    STATE_TRANS_MATRIX: TRADEREFUND_STATE_TRANS_MATRIX,
} = require('../../constants/lg/tradeRefund');

const {
    action: TradeSkuItemShopRefundAction,
    state: TradeSkuItemShopRefundState,
} = require('../../constants/lg/tradeSkuItemShopRefund');

const tradeRefundDataCheck = (states) => {
    return [
        {
            check: ({user, row}) => {
                if (!states.includes(row.state)){
                    return ErrorCode.createErrorByCode(ErrorCode.errorDataInconsistency,
                        `当前状态不支持此操作`, {
                            name: 'lgTradeRefund',
                            operation: 'update',
                            data: row,
                        });
                };
                return true;
            },
        }
    ];
}
const AUTH_MATRIX = {
    lgService: {
        [ServiceAction.create]: AllowEveryoneAuth,
    },
    lgShopSpecies: {
        [ShopSpeciesAction.create]: {
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
                                            $in: [ShopRelation.owner, ShopRelation.manager]
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
        [ShopSpeciesAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                },
            ]
        },
    },
    express: {
        [ExpressAction.create]: AllowEveryoneAuth,
        [ExpressAction.update]: AllowEveryoneAuth,
        [ExpressAction.remove]: AllowEveryoneAuth,
        [ExpressAction.taPrepare]: AllowEveryoneAuth,
        [ExpressAction.taAccept]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [ExpressState.tsSending].includes(row.transportState);
                            },
                        }
                    ],
                }
            ]
        },
        [ExpressAction.taReject]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [ExpressState.tsSending].includes(row.transportState);
                            },
                        }
                    ],
                }
            ]
        },
        [ExpressAction.taSend]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [ExpressState.tsInPreparing].includes(row.transportState);
                            },
                        }
                    ],
                }
            ]
        },
    },
    lgSkuValue: {
        [SkuValueAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgShop',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                    relation: {
                                        $in: [ShopRelation.owner, ShopRelation.manager],
                                    },
                                };
                            },
                        },
                    ]
                },
            ]
        },
        [SkuValueAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                },
            ]
        },
        [ValueAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                },
            ]
        },
    },
    lgValue: {
        [ValueAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
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
                                        $in: [MallRelation.owner, MallRelation.manager],
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
                                            $in: [ShopRelation.owner, ShopRelation.manager],
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
        [ValueAction.update]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
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
                                        $in: [MallRelation.owner, MallRelation.manager],
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
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                },
            ]
        },
        [ValueAction.remove]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
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
                                        $in: [MallRelation.owner, MallRelation.manager],
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
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                },
            ]
        },
    },
    lgProperty: {
        [PropertyAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
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
                                        $in: [MallRelation.owner, MallRelation.manager],
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
                                            $in: [ShopRelation.owner, ShopRelation.manager],
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
        [PropertyAction.update]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
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
                                        $in: [MallRelation.owner, MallRelation.manager],
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
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                },
            ]
        },
        [PropertyAction.remove]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
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
                                        $in: [MallRelation.owner, MallRelation.manager],
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
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                },
            ]
        },
    },
    lgPropertySpecies: {
        [PropertySpeciesAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
        [PropertySpeciesAction.update]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
        [PropertySpeciesAction.remove]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
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
        [SpeciesAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
        [SpeciesAction.update]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
        [SpeciesAction.remove]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
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
        [BrandAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
        [BrandAction.update]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ]
                }
            ]
        },
        [BrandAction.remove]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgDistrict',
                            condition: ({ user }) => {
                                const query = {
                                    userId: user.id,
                                    relation: {
                                        $in: [DistrictRelation.owner, DistrictRelation.manager],
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
        [SkuItemAction.create]: {  // todo 细化写在definition中
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
        [SkuItemAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                },
            ],
        },
        [SkuItemAction.online]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [SkuItemState.offline].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [SkuAction.offline]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [SkuItemState.online].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
    },
    lgDistrict: {
        [DistrictAction.update]: {
            auths: [
                {
                    "#relation": {
                        relations: [DistrictRelation.owner, DistrictRelation.manager],
                    },
                },
            ],
        },
        [DistrictAction.remove]: {
            auths: [
                {
                    "#relation": {
                        relations: [DistrictRelation.owner],
                    },
                },
            ],
        },
    },
    lgMall: {
        [MallAction.create]: {
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
        [MallAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgDistrict',
                        relations: [DistrictRelation.owner, DistrictRelation.manager],
                    },
                },
                {
                    "#relation": {
                        relations: [MallRelation.owner, MallRelation.manager],
                    },
                },
            ],
        },
        [MallRelation.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgDistrict',
                        relations: [DistrictRelation.owner, DistrictRelation.manager],
                    },
                },
                {
                    "#relation": {
                        relations: [MallRelation.owner],
                    },
                },
            ],
        },
    },
    lgShop: {
        [ShopAction.create]: {
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
        [ShopAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: '',
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                },
                {
                    "#relation": {
                        attr: 'lgMall',
                        relations: [MallRelation.owner, MallRelation.manager],
                    },
                },
                {
                    "#relation": {
                        attr: 'lgMall.lgDistrict',
                        relations: [DistrictRelation.owner, DistrictRelation.manager],
                    },
                },
            ],
        },
        [ShopAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgMall',
                        relations: [MallRelation.owner, MallRelation.manager],
                    },
                },
                {
                    "#relation": {
                        relations: [ShopRelation.owner],
                    },
                },
                {
                    "#relation": {
                        attr: 'lgMall.lgDistrict',
                        relations: [DistrictRelation.owner, DistrictRelation.manager],
                    },
                },
            ],
        },
        [ShopAction.online]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgMall',
                        relations: [MallRelation.owner, MallRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [ShopState.offline].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'lgMall.lgDistrict',
                        relations: [DistrictRelation.owner, DistrictRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [ShopState.offline].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [ShopState.offline].includes(row.state);
                            },
                        }
                    ],
                },
            ],
        },
        [ShopAction.offline]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgMall',
                        relations: [MallRelation.owner, MallRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [ShopState.online].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'lgMall.lgDistrict',
                        relations: [DistrictRelation.owner, DistrictRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [ShopState.online].includes(row.state);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [ShopState.online].includes(row.state);
                            },
                        }
                    ],
                },
            ],
        },
        [ShopAction.disable]: {
            auths: [
                {
                    '#role': [Roles.ROOT.name],
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [ShopState.online, ShopState.offline].includes(row.state);
                            },
                        }
                    ],
                },
            ],
        },
        [ShopAction.able]: {
            auths: [
                {
                    '#role': [Roles.ROOT.name],
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [ShopState.disabled].includes(row.state);
                            },
                        }
                    ],
                },
            ],
        },
        [ShopAction.assign]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgMall',
                        relations: [MallRelation.owner, MallRelation.manager],
                    },
                },
                {
                    "#relation": {
                        attr: 'lgMall.lgDistrict',
                        relations: [DistrictRelation.owner, DistrictRelation.manager],
                    },
                },
                {
                    "#relation": {
                        relations: [ShopRelation.owner],
                    },
                },
            ],
        },
        [ShopAction.transfer]: {
            auths: [
                {
                    "#relation": {
                        relations: [ShopRelation.owner],
                    },
                },
            ],
        },
        [ShopAction.authGrantMulti2]: {
            auths: [
                {
                    "#relation": {
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                },
            ],
        },
        [ShopAction.authRevoke]: {
            auths: [
                {
                    "#relation": {
                        relations: [ShopRelation.owner],
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
                                    relation: ShopRelation.owner,
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
                        relations: [ShopRelation.owner],
                    },
                },
            ],
        },
    },
    lgSku: {
        [SkuAction.create]: {
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
                                        $in: [ShopRelation.owner, ShopRelation.manager],
                                    },
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        },
        [SkuAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                }
            ]
        },
        [SkuAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                }
            ]
        },
        [SkuAction.online]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [SkuState.offline].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [SkuAction.offline]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [SkuState.online].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
    },
    lgTrade: {
        [TradeAction.create]: AllowEveryoneAuth,
        [TradeAction.makePaid]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                    },
                }
            ]
        },
        [TradeAction.makeAbandoned]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                        relations: [ShopRelation.manager, ShopRelation.owner],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [TradeState.legal2].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        },
        [TradeAction.pick]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [TradeTransportState.unpicked].includes(row.transportState);
                            },
                            message: '订单已提货'
                        },
                        {
                            check: ({user, row}) => {
                                return [TradeState.legal2, TradeState.legal].includes(row.state);
                            },
                            message: '订单未结算，请结算完成后再进行提货',
                        }
                    ],
                }
            ]
        },
        [TradeAction.taPrepare]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [TradeState.legal, TradeState.legal2].includes(row.state) && [TradeTransportState.unsend].includes(row.transportState);
                            },
                        }
                    ],
                },
            ],
        },
        [TradeAction.taSend]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgShop',
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [TradeState.legal, TradeState.legal2].includes(row.state) && [TradeTransportState.tsInPreparing].includes(row.transportState);
                            },
                        }
                    ],
                },
            ],
        },
        [TradeAction.taAccept]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [TradeState.legal, TradeState.legal2].includes(row.state) && row.buyerId && row.buyerId === user.id && [TradeTransportState.tsSending].includes(row.transportState);
                            },
                        }
                    ],
                },
            ],
        },
        [TradeAction.taReject]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [TradeState.legal, TradeState.legal2].includes(row.state) && row.buyerId && row.buyerId === user.id && [TradeTransportState.tsSending].includes(row.transportState);
                            },
                        }
                    ],
                },
            ],
        },
        [TradeAction.cancel]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.buyerId === user.id && [TradeState.unpaid].includes(row.state);
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
                                return [TradeState.unpaid].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [TradeAction.refund]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return row.buyerId === user.id && [TradeState.legal, TradeState.partialPaid].includes(row.state);
                            },
                        }
                    ],
                },
            ]
        },
        [TradeAction.stopPaying]: {
            auths: [
                {
                    "#relation": {
                        attr: '',
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [TradeState.paying, TradeState.partialPaid].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
        [TradeAction.startToPay]: {
            auths: [
                {
                    "#relation": {
                        attr: '',
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [TradeState.unpaid, TradeState.partialPaid].includes(row.state);
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
                                return [TradeState.unpaid, TradeState.partialPaid].includes(row.state);
                            },
                        }
                    ],
                }
            ]
        },
    },
    lgServiceCompany: {
        [ServiceCompanyAction.create]: AllowEveryoneAuth,
        [ServiceCompanyAction.update]: {
            auths: [
                {
                    "#relation": {
                        relations: [ServiceCompanyRelation.owner, ServiceCompanyRelation.manager],
                    },
                }
            ]
        },
        [ServiceCompanyAction.remove]: {
            auths: [
                {
                    "#relation": {
                        relations: [ServiceCompanyRelation.owner],
                    },
                }
            ]
        },
        [ServiceCompanyAction.authGrantMulti2]: {
            auths: [
                {
                    "#relation": {
                        relations: [ServiceCompanyRelation.owner, ServiceCompanyRelation.manager],
                    },
                }
            ]
        },
        [ServiceCompanyAction.assign]: {
            auths: [
                {
                    "#relation": {
                        relations: [ServiceCompanyRelation.owner, ServiceCompanyRelation.manager],
                    },
                }
            ]
        },
    },
    enterUp: {
        [EnterUpAction.create]: AllowEveryoneAuth,
        [EnterUpAction.update]: AnyRelationAuth,
    },
    lgShoppingCart: {
        [ShoppingCartAction.create]: AllowEveryoneAuth,
        [ShoppingCartAction.update]: {
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
        [ShoppingCartAction.remove]: {
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
                                        $in: [ShopRelation.owner, ShopRelation.manager],
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
                                        $in: [ShopRelation.owner, ShopRelation.manager],
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
                                        $in: [ShopRelation.owner, ShopRelation.manager],
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
        [SkuItemShopAction.create]: {
            auths: [
                {
                    "#exists": [
                        {
                            relation: 'userLgShop',
                            condition: ({ user }) => {
                                return {
                                    userId: user.id,
                                    relation: {
                                        $in: [ShopRelation.owner, ShopRelation.manager],
                                    },
                                };
                            },
                        },
                    ]
                },
            ]
        },
        [SkuItemShopAction.update]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [ShopRelation.owner, ShopRelation.manager],
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
        [SkuItemShopAction.remove]: {
            auths: [
                {
                    "#relation": {
                        attr: 'lgSku.lgShop',
                        relations: [ShopRelation.owner, ShopRelation.manager],
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
        [PlateAction.create]: AllowEveryoneAuth,
    },
    lgTradeSkuItemShop: {
        [TradeSkuItemShopAction.create]: AllowEveryoneAuth,
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
    },
    lgTradeRefund: {
        [TradeRefundAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'lgTrade',
                            needData: true,
                            condition: ({ actionData, user }) => {
                                const { lgTradeRefund } = actionData;
                                const query = {
                                    id: lgTradeRefund.lgTradeId,
                                    buyerId: user.id,
                                };
                                return query;
                            },
                            message: '您不是该订单的付款人，不能申请退货',
                        },
                        {
                            relation: 'lgTrade',
                            needData: true,
                            condition: ({ actionData, user }) => {
                                const { lgTradeRefund } = actionData;
                                const query = {
                                    id: lgTradeRefund.lgTradeId,
                                    state: {
                                        $in: [TradeState.legal, TradeState.legal2, TradeState.partialRefunded]
                                    },
                                };
                                return query;
                            },
                            message: '当前订单尚未支付或已经退款，无法进行退款申请',
                        },
                    ],
                    '#unexists': [
                        {
                            relation: 'lgTradeRefund',
                            needData: true,
                            condition: ({ actionData, user }) => {
                                const { lgTradeRefund } = actionData;
                                const query = {
                                    lgTradeId: lgTradeRefund.lgTradeId,
                                    state: {
                                        $nin: [TradeRefundState.refunded, TradeRefundState.partialRefunded, TradeRefundState.cancelled],
                                    },
                                };
                                return query;
                            },
                            message: '您对该订单的退货申请正在处理中，请勿重复操作',
                        },
                    ],
                },
            ]
        },
        [TradeRefundAction.refund]: {
            auths: [
                {
                    '#data': tradeRefundDataCheck([TradeRefundState.waitingForAccept]),
                    '#relation': {
                        attr: 'lgTrade.lgShop',
                        relations: [ShopRelation.owner, ShopRelation.manager],
                    },
                },
                {
                    '#data': tradeRefundDataCheck([TradeRefundState.waitingForAccept]),
                    '#relation': {
                        attr: 'lgTrade.lgShop.lgMall',
                        relations: [MallRelation.owner, MallRelation.manager],
                    },
                },
                {
                    '#data': tradeRefundDataCheck([TradeRefundState.waitingForAccept]),
                    '#relation': {
                        attr: 'lgTrade.lgShop.lgMall.lgDistrict',
                        relations: [DistrictRelation.owner, DistrictRelation.manager],
                    },
                },
            ],
        },
        [TradeRefundAction.cancel]: {
            auths: [
                {
                    '#data': tradeRefundDataCheck([TradeRefundState.waitingForAccept]),
                    '#exists': [
                        {
                            relation: 'lgTrade',
                            condition: ({ row, user }) => {
                                const query = {
                                    id: row.lgTradeId,
                                    buyerId: user.id,
                                };
                                return query;
                            },
                            message: '您不是该退款的发起人，不能取消退款',
                        },
                    ],
                },
            ],
        },
    },
    lgTradeSkuItemShopRefund: {
        [TradeSkuItemShopRefundAction.create]: {
            auths: [
                {
                    '#unexists': [
                        {
                            relation: 'lgTradeSkuItemShopRefund',
                            needData: true,
                            condition: ({ actionData, user }) => {
                                const { lgTradeSkuItemShopRefund } = actionData;
                                const query = {
                                    lgTradeRefund: {
                                        state: {
                                            $nin: [TradeRefundState.cancelled],
                                        }
                                    },
                                    lgTradeSkuItemShopId: lgTradeSkuItemShopRefund.lgTradeSkuItemShopId,
                                };
                                return query;
                            },
                            message: '该商品已经发起过退款，不能重复退款',
                        },
                    ],
                }
            ]
        }
    }
};

const STATE_TRAN_MATRIX = {
    lgShop: SHOP_STATE_TRANS_MATRIX,
    lgTrade: TRADE_STATE_TRANS_MATRIX,
    lgSku: SKU_STATE_TRANS_MATRIX,
    lgSkuItem: SKUITEM_STATE_TRANS_MATRIX,
    lgTradeRefund: TRADEREFUND_STATE_TRANS_MATRIX,
};
module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};
