'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Administrator on 2018/7/11.
 */
var moment = require('moment');

var startAt = {
    tomorrow: 1,
    now: 2,
    nextWeek: 11,
    nextMonth: 12
};

var decodeStartAt = function decodeStartAt(sa) {
    var _STRING;

    var STRING = (_STRING = {}, _defineProperty(_STRING, startAt.tomorrow, '自明天起'), _defineProperty(_STRING, startAt.now, '马上'), _defineProperty(_STRING, startAt.nextWeek, '下周起'), _defineProperty(_STRING, startAt.nextMonth, '下月起'), _STRING);

    return STRING[sa];
};

var getStartAt = function getStartAt(sa) {
    switch (sa) {
        case startAt.tomorrow:
            {
                return moment().add(1, 'd').startOf('day');
            }
        case startAt.now:
            {
                return moment();
            }
        case startAt.nextWeek:
            {
                return moment().add(1, 'w').startOf('week');
            }
        case startAt.nextMonth:
            {
                return moment().add(1, 'm').startOf('month');
            }
        default:
            {
                throw new Error('illegal startAt');
            }
    }
};

var period = {
    oneDay: 1,
    twoDays: 2,
    threeDays: 3,
    fiveDays: 5,
    oneWeek: 101,
    twoWeeks: 102,
    oneMonth: 201,
    twoMonths: 202,
    threeMonths: 203,
    sixMonths: 204,
    oneYear: 301
};

var decodePeriod = function decodePeriod(p) {
    var _STRING2;

    var STRING = (_STRING2 = {}, _defineProperty(_STRING2, period.oneDay, '一天'), _defineProperty(_STRING2, period.twoDays, '两天'), _defineProperty(_STRING2, period.threeDays, '三天'), _defineProperty(_STRING2, period.fiveDays, '五天'), _defineProperty(_STRING2, period.oneWeek, '一周'), _defineProperty(_STRING2, period.twoWeeks, '两周'), _defineProperty(_STRING2, period.oneMonth, '一个月'), _defineProperty(_STRING2, period.twoMonths, '两个月'), _defineProperty(_STRING2, period.threeMonths, '三个月'), _defineProperty(_STRING2, period.sixMonths, '六个月'), _defineProperty(_STRING2, period.oneYear, '一年'), _STRING2);

    return STRING[p];
};

var getEndOf = function getEndOf(sa, p) {
    if (isNaN(sa)) {
        throw new Error('illegal startAt');
    }
    switch (p) {
        case period.oneDay:
            {
                return sa + 24 * 3600 * 1000;
            }
        case period.twoDays:
            {
                return sa + 48 * 3600 * 1000;
            }
        case period.threeDays:
            {
                return sa + 72 * 3600 * 1000;
            }
        case period.fiveDays:
            {
                return sa + 120 * 3600 * 1000;
            }
        case period.oneWeek:
            {
                return sa + 7 * 24 * 3600 * 1000;
            }
        case period.twoWeeks:
            {
                return sa + 14 * 24 * 3600 * 1000;
            }
        case period.oneMonth:
            {
                return moment(sa).add(1, 'M').valueOf();
            }
        case period.twoMonths:
            {
                return moment(sa).add(2, 'M').valueOf();
            }
        case period.threeMonths:
            {
                return moment(sa).add(3, 'M').valueOf();
            }
        case period.sixMonths:
            {
                return moment(sa).add(6, 'M').valueOf();
            }
        case period.oneYear:
            {
                return moment(sa).add(1, 'y').valueOf();
            }
    }
};

module.exports = {
    startAt: startAt,
    decodeStartAt: decodeStartAt,
    period: period,
    decodePeriod: decodePeriod,
    getStartAt: getStartAt,
    getEndOf: getEndOf
};