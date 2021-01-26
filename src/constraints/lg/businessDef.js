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
    action: storeAction,
    state: storeState,
    relation: storeRelation,
} = require('../../constants/lg/store');

const {
    action: skuAction,
    state: skuState,
    STATE_TRANS_MATRIX: SKU_STATE_TRANS_MATRIX,
} = require('../../constants/lg/sku');
const AUTH_MATRIX = {
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
    lgStore: {
        [storeAction.create]: {
            auths: [
                {
                    '#exists': [
                        {
                            relation: 'userLgShop',
                            needData: true,
                            condition: ({ user, actionData }) => {
                                const { lgStore } = actionData;
                                const query = {
                                    userId: user.id,
                                    lgShopId: lgStore.lgShopId,
                                    relation: shopRelation.owner,
                                };
                                return query;
                            },
                        },
                    ],
                },
            ]
        },
        [storeAction.update]: {
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
};
const STATE_TRAN_MATRIX = {
    lgShop: SHOP_STATE_TRANS_MATRIX,
};
module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};
