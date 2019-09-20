/**
 * Created by Administrator on 2019/9/20.
 */
const { Roles } = require('../../constants/roleConstant2');
const { action: AgencyAction, relation: AgencyRelation } = require('../../constants/iot/agency');


const MATRIX = {
    agency: {
        [AgencyAction.create]: {
            // visible: 'always',           /*** always: 长显示，none: 不显示 *//
            auth: [
                {
                    '#role': Roles.EDITOR,
                },
                {
                    '#relation': {
                        attr: 'parentId',
                        relation: AgencyRelation.owner,
                    },
                    '#attr': {
                        rel: 'user',
                        attr: {
                            mobile: {
                                $exists: true,
                            },
                        },
                    },
                }
            ]
        },
        [AgencyAction.setAgencySkuPrice]: {
            auth: [
                {
                    '#relation': {
                        attr: 'parentId',
                        relation: AgencyRelation.owner,
                    },
                }
            ]
        },
    },
};

module.exports = {
    MATRIX,
};

