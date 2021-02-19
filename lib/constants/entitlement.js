'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2018/7/11.
 */
var moment = require('moment');

var beginsAt = {
    tomorrow: 1,
    now: 2,
    nextWeek: 11,
    nextMonth: 12,
    nextYear: 21
};

var decodeBeginsAt = function decodeBeginsAt(sa) {
    var _STRING;

    var STRING = (_STRING = {}, (0, _defineProperty3.default)(_STRING, beginsAt.tomorrow, '自明天起'), (0, _defineProperty3.default)(_STRING, beginsAt.now, '马上'), (0, _defineProperty3.default)(_STRING, beginsAt.nextWeek, '下周起'), (0, _defineProperty3.default)(_STRING, beginsAt.nextMonth, '下月起'), (0, _defineProperty3.default)(_STRING, beginsAt.nextYear, '明年起'), _STRING);

    return STRING[sa];
};

var getBeginsAt = function getBeginsAt(sa) {
    switch (sa) {
        case beginsAt.tomorrow:
            {
                return moment().add(1, 'd').startOf('day').valueOf();
            }
        case beginsAt.now:
            {
                return moment().valueOf();
            }
        case beginsAt.nextWeek:
            {
                return moment().add(1, 'w').startOf('week').valueOf();
            }
        case beginsAt.nextMonth:
            {
                return moment().add(1, 'm').startOf('month').valueOf();
            }
        case beginsAt.nextYear:
            {
                return moment().add(1, 'y').startOf('year').valueOf();
            }
        default:
            {
                throw new Error('illegal beginsAt');
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
    oneYear: 301,
    twoYears: 302,
    threeYears: 303,
    fourYears: 304,
    fiveYears: 305,
    tenYears: 310,
    oneTime: 401,
    twoTimes: 402,
    threeTimes: 403,
    fourTimes: 404,
    fiveTimes: 405,
    unlimited: 1001
};

var decodePeriod = function decodePeriod(p) {
    var _STRING2;

    var STRING = (_STRING2 = {}, (0, _defineProperty3.default)(_STRING2, period.oneDay, '一天'), (0, _defineProperty3.default)(_STRING2, period.twoDays, '两天'), (0, _defineProperty3.default)(_STRING2, period.threeDays, '三天'), (0, _defineProperty3.default)(_STRING2, period.fiveDays, '五天'), (0, _defineProperty3.default)(_STRING2, period.oneWeek, '一周'), (0, _defineProperty3.default)(_STRING2, period.twoWeeks, '两周'), (0, _defineProperty3.default)(_STRING2, period.oneMonth, '一个月'), (0, _defineProperty3.default)(_STRING2, period.twoMonths, '两个月'), (0, _defineProperty3.default)(_STRING2, period.threeMonths, '三个月'), (0, _defineProperty3.default)(_STRING2, period.sixMonths, '六个月'), (0, _defineProperty3.default)(_STRING2, period.oneYear, '一年'), (0, _defineProperty3.default)(_STRING2, period.twoDays, '两年'), (0, _defineProperty3.default)(_STRING2, period.threeYears, '三年'), (0, _defineProperty3.default)(_STRING2, period.fourYears, '四年'), (0, _defineProperty3.default)(_STRING2, period.fiveYears, '五年'), (0, _defineProperty3.default)(_STRING2, period.tenYears, '十年'), (0, _defineProperty3.default)(_STRING2, period.oneTime, '一年'), (0, _defineProperty3.default)(_STRING2, period.twoTimes, '两年'), (0, _defineProperty3.default)(_STRING2, period.threeTimes, '三年'), (0, _defineProperty3.default)(_STRING2, period.fourTimes, '四年'), (0, _defineProperty3.default)(_STRING2, period.fiveTimes, '五年'), (0, _defineProperty3.default)(_STRING2, period.unlimited, '不限制'), _STRING2);

    return STRING[p];
};

var getEndsAt = function getEndsAt(ba, p) {
    if (isNaN(ba)) {
        throw new Error('illegal beginsAt');
    }
    switch (p) {
        case period.oneDay:
            {
                return ba + 24 * 3600 * 1000;
            }
        case period.twoDays:
            {
                return ba + 48 * 3600 * 1000;
            }
        case period.threeDays:
            {
                return ba + 72 * 3600 * 1000;
            }
        case period.fiveDays:
            {
                return ba + 120 * 3600 * 1000;
            }
        case period.oneWeek:
            {
                return ba + 7 * 24 * 3600 * 1000;
            }
        case period.twoWeeks:
            {
                return ba + 14 * 24 * 3600 * 1000;
            }
        case period.oneMonth:
            {
                return moment(ba).add(1, 'M').valueOf();
            }
        case period.twoMonths:
            {
                return moment(ba).add(2, 'M').valueOf();
            }
        case period.threeMonths:
            {
                return moment(ba).add(3, 'M').valueOf();
            }
        case period.sixMonths:
            {
                return moment(ba).add(6, 'M').valueOf();
            }
        case period.oneYear:
            {
                return moment(ba).add(1, 'y').valueOf();
            }
        case period.twoYears:
            {
                return moment(ba).add(2, 'y').values();
            }
        case period.threeYears:
            {
                return moment(ba).add(3, 'y').values();
            }
        case period.fourYears:
            {
                return moment(ba).add(4, 'y').values();
            }
        case period.fiveYears:
            {
                return moment(ba).add(5, 'y').values();
            }
        case period.tenYears:
            {
                return moment(ba).add(10, 'y').values();
            }
        case period.unlimited:
            {
                return undefined;
            }
        default:
            {
                throw new Error('illegal periods');
            }
    }
};

module.exports = {
    beginsAt: beginsAt,
    decodeBeginsAt: decodeBeginsAt,
    period: period,
    decodePeriod: decodePeriod,
    getBeginsAt: getBeginsAt,
    getEndsAt: getEndsAt
};