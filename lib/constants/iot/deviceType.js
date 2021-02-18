'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    var S = (_S = {}, (0, _defineProperty3.default)(_S, extractableAfter.tomorrow, '次日'), (0, _defineProperty3.default)(_S, extractableAfter.dayAfterTomorrow, '后日'), _S);
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