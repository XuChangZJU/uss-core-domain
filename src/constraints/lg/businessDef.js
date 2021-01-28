const {
    AllowEveryoneAuth,
    OwnerRelationAuth,
    AnyRelationAuth,
} = require('../action');
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
    relation: shopRelation,
    STATE_TRANS_MATRIX: SHOP_STATE_TRANS_MATRIX,
} = require('../../constants/lg/shop');

const {
    action: weChatStoreAction,
    state: weChatStoreState,
    relation: weChatStoreRelation,
} = require('../../constants/lg/weChatStore');

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

const AUTH_MATRIX = {
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
                },   {
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
                },
                {
                    "#relation": {
                        attr: 'lgMall.lgDistrict',
                        relations: [districtRelation.owner, districtRelation.manager],
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
                },
                {
                    "#relation": {
                        attr: 'lgMall.lgDistrict',
                        relations: [districtRelation.owner, districtRelation.manager],
                    },
                },
            ],
        },
        [shopAction.disable]: {
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
    lgWeChatStore: {
        [weChatStoreAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userLgShop',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { lgWeChatStore } = actionData;
                                const query = {
                                    userId: user.id,
                                    lgShopId: lgWeChatStore.lgShopId,
                                    relation: shopRelation.owner,
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        },
        [weChatStoreAction.update]: {
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
                        relations: [shopRelation.manager],
                    },
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [tradeTransportState.unsend].includes(row.transportState);
                            },
                        }
                    ],
                },
                {
                    "#relation": {
                        attr: 'lgShop',
                        relations: [shopRelation.owner],
                    },
                }
            ]
        },
        [tradeAction.send]: {
            auths: [
                {
                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [tradeTransportState.unsend].includes(row.transportState) && user.id === row.buyerId;
                            },
                        }
                    ],
                }
            ]
        },
        [tradeAction.confirmArrive]: {
            auths: [
                {

                    '#data': [
                        {
                            check: ({user, row}) => {
                                return [tradeTransportState.unsend].includes(row.transportState);
                            },
                        }
                    ],
                }
            ]
        },
    },
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
