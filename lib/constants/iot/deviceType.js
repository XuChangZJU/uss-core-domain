'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2019/7/11.
 */
var moment = require('moment');
var assert = require('assert');
var extractableAfter = {
    tomorrow: 1,
    dayAfterTomorrow: 2
};

var decodeExtractableAfter = function decodeExtractableAfter(ea) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, extractableAfter.tomorrow, '次日'), _defineProperty(_S, extractableAfter.dayAfterTomorrow, '后日'), _S);
    return S[ea];
};

function getExtractableAfter(ea, hour) {
    var m = moment();

    switch (ea) {
        case extractableAfter.tomorrow:
            {
                m.add(1, 'day');
                break;
            }
        case extractableAfter.dayAfterTomorrow:
            {
                m.add(2, 'day');
                break;
            }
        default:
            {
                throw new Error('unrecognized ea: ' + ea);
            }
    }

    if (hour) {
        m.hours(hour).minutes(0).seconds(0);
    } else {
        m.hours(0).minutes(0).seconds(0);
    }
    return m.valueOf();
}

module.exports = {
    extractableAfter: extractableAfter,
    decodeExtractableAfter: decodeExtractableAfter,
    getExtractableAfter: getExtractableAfter
};