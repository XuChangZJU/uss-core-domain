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
                            relation: 'userDistrict',
                            condition: ({ user, row }) => {
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
                            relation: 'userDistrict',
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
                            relation: 'userMall',
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
};
const STATE_TRAN_MATRIX = {
    lgShop: SHOP_STATE_TRANS_MATRIX,
};
module.exports = {
    AUTH_MATRIX,
    STATE_TRAN_MATRIX,
};
