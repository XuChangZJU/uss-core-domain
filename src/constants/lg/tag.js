/**
 * Created by Xc on 2020/11/12.
 */
const pick = require('lodash/pick');
const assign = require('lodash/assign');
const { action: CommonAction, decodeAction: decodeCommonAction } = require('../action');


const action = pick(CommonAction, ['create', 'remove']);
const decodeAction = (a) => decodeCommonAction(a);

const data = {
    sku: {
        ldms: '离岛免税',
    },
    shop: {
        ldms: '离岛免税',
    },
    user: {
        touristGuide: '导游',
        taxiDriver: '的士司机',
        customer: '顾客',
        privileger: '特权者',
    },
};

const def = {
    data,
};


module.exports = {
    action,
    decodeAction,

    def,
};
