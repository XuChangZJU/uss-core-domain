/**
 * Created by Administrator on 2018/7/11.
 */
const moment = require('moment');

const beginsAt = {
    tomorrow: 1,
    now: 2,
    nextWeek: 11,
    nextMonth: 12,
    nextYear: 21,
};

const decodeBeginsAt = (sa) => {
    const STRING = {
        [beginsAt.tomorrow]: '自明天起',
        [beginsAt.now]: '马上',
        [beginsAt.nextWeek]: '下周起',
        [beginsAt.nextMonth]: '下月起',
        [beginsAt.nextYear]: '明年起',
    };

    return STRING[sa];
};

const getBeginsAt = (sa) => {
    switch (sa) {
        case beginsAt.tomorrow: {
            return moment().add(1, 'd').startOf('day');
        }
        case beginsAt.now: {
            return moment();
        }
        case beginsAt.nextWeek: {
            return moment().add(1, 'w').startOf('week');
        }
        case beginsAt.nextMonth: {
            return moment().add(1, 'm').startOf('month');
        }
        case beginsAt.nextYear: {
            return moment().add(1, 'y').startOf('year');
        }
        default: {
            throw new Error('illegal beginsAt');
        }
    }
}

const period = {
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
};

const decodePeriod = (p) => {
    const STRING = {
        [period.oneDay]: '一天',
        [period.twoDays]: '两天',
        [period.threeDays]: '三天',
        [period.fiveDays]: '五天',
        [period.oneWeek]: '一周',
        [period.twoWeeks]: '两周',
        [period.oneMonth]: '一个月',
        [period.twoMonths]: '两个月',
        [period.threeMonths]: '三个月',
        [period.sixMonths]: '六个月',
        [period.oneYear]: '一年',
        [period.twoDays]: '两年',
        [period.threeYears]: '三年',
        [period.fourYears]: '四年',
        [period.fiveYears]: '五年',
        [period.tenYears]: '十年',
    };

    return STRING[p];
};

const getEndOf = (ba, p) => {
    if (isNaN(ba)) {
        throw new Error('illegal beginsAt');
    }
    switch (p) {
        case period.oneDay: {
            return ba + 24 * 3600 * 1000;
        }
        case period.twoDays: {
            return ba + 48 * 3600 * 1000;
        }
        case period.threeDays: {
            return ba + 72 * 3600 * 1000;
        }
        case period.fiveDays: {
            return ba + 120 * 3600 * 1000;
        }
        case period.oneWeek: {
            return ba + 7 * 24 * 3600 * 1000;
        }
        case period.twoWeeks: {
            return ba + 14 * 24 * 3600 * 1000;
        }
        case period.oneMonth: {
            return moment(ba).add(1, 'm').valueOf();
        }
        case period.twoMonths: {
            return moment(ba).add(2, 'm').valueOf();
        }
        case period.threeMonths: {
            return moment(ba).add(3, 'm').valueOf();
        }
        case period.sixMonths: {
            return moment(ba).add(6, 'm').valueOf();
        }
        case period.oneYear: {
            return moment(ba).add(1, 'y').valueOf();
        }
        case period.twoYears: {
            return moment(ba).add(2, 'y').values();
        }
        case period.threeYears: {
            return moment(ba).add(3, 'y').values();
        }
        case period.fourYears: {
            return moment(ba).add(4, 'y').values();
        }
        case period.fiveYears: {
            return moment(ba).add(5, 'y').values();
        }
        case period.tenYears: {
            return moment(ba).add(10, 'y').values();
        }
        default: {
            throw new Error('illegal periods');
        }
    }
};

module.exports = {
    beginsAt,
    decodeBeginsAt,
    period,
    decodePeriod,
    getBeginsAt,
    getEndOf,
}
