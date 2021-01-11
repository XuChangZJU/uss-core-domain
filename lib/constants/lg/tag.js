'use strict';

/**
 * Created by Xc on 2020/11/12.
 */
var pick = require('lodash/pick');
var assign = require('lodash/assign');

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var action = pick(CommonAction, ['create', 'remove']);
var decodeAction = function decodeAction(a) {
    return decodeCommonAction(a);
};

var data = {
    sku: {
        ldms: '离岛免税'
    },
    shop: {
        ldms: '离岛免税'
    },
    user: {
        touristGuide: '导游',
        taxiDriver: '的士司机',
        customer: '顾客',
        privileger: '特权者'
    }
};

var def = {
    data: data
};

module.exports = {
    action: action,
    decodeAction: decodeAction,

    def: def
};