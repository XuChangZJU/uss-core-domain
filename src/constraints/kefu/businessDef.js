const {
    AllowEveryoneAuth,
    OwnerRelationAuth,
    AnyRelationAuth,
} = require('../action');

const {
    action: axbBindAction,
    state: axbBindState,
    STATE_TRANS_MATRIX: AXB_BIND_STATE_TRANS_MATRIX,
} = require('../../constants/kefu/axbBind');

const {
    action: companyAction,
    relation: companyRelation,
    state: companyState,
    STATE_TRAN_MATRIX: COMPANY_STATE_TRANS_MATRIX,
} = require('../../constants/kefu/company');

const AUTH_MATRIX = {
    /*axbBind: {
        [axbBindAction.bind]: {},
        [axbBindAction.unbind]: {},
        [axbBindAction.expire]: {},
    },*/
    company: {
        [companyAction.enable]: {
            auths: [
                {
                    '#relation': {
                        relations: [companyRelation.owner],
                    },
                    '#data': {
                        check: ({user, row}) => {
                            return row.state === companyState.offline;
                        },
                    },
                },
            ],
        },
        [companyAction.disable]: {
            auths: [
                {
                    '#relation': {
                        relations: [companyRelation.owner],
                    },
                    '#data': {
                        check: ({user, row}) => {
                            return row.state === companyState.online;
                        },
                    },
                },
            ],
        },
    },
};

const STATE_TRANS_MATRIX = {
    company: COMPANY_STATE_TRANS_MATRIX,
};

module.export = {
    AUTH_MATRIX,
    STATE_TRANS_MATRIX,
};