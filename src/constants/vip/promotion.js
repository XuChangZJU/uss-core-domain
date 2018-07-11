/**
 * Created by Administrator on 2018/7/11.
 */
const moment = require('moment');

const startAt = {
    tomorrow: 1,
    now: 2,
    nextWeek: 11,
    nextMonth: 12,
};

const decodeStartAt = (sa) => {
    const STRING = {
        [startAt.tomorrow]: '自明天起',
        [startAt.now]: '马上',
        [startAt.nextWeek]: '下周起',
        [startAt.nextMonth]: '下月起',
    };

    return STRING[sa];
};

const getStartAt = (sa) => {
    switch (sa) {
        case startAt.tomorrow: {
            return moment().add(1, 'd').startOf('day');
        }
        case startAt.now: {
            return moment();
        }
        case startAt.nextWeek: {
            return moment().add(1, 'w').startOf('week');
        }
        case startAt.nextMonth: {
            return moment().add(1, 'm').startOf('month');
        }
        default: {
            throw new Error('illegal startAt');
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
    };

    return STRING[p];
};

const getEndOf = (sa, p) => {
    if (isNaN(sa)) {
        throw new Error('illegal startAt');
    }
    switch (p) {
        case period.oneDay: {
            return sa + 24 * 3600 * 1000;
        }
        case period.twoDays: {
            return sa + 48 * 3600 * 1000;
        }
        case period.threeDays: {
            return sa + 72 * 3600 * 1000;
        }
        case period.fiveDays: {
            return sa + 120 * 3600 * 1000;
        }
        case period.oneWeek: {
            return sa + 7 * 24 * 3600 * 1000;
        }
        case period.twoWeeks: {
            return sa + 14 * 24 * 3600 * 1000;
        }
        case period.oneMonth: {
            return moment(sa).add(1, 'm').valueOf();
        }
        case period.twoMonths: {
            return moment(sa).add(2, 'm').valueOf();
        }
        case period.threeMonths: {
            return moment(sa).add(3, 'm').valueOf();
        }
        case period.sixMonths: {
            return moment(sa).add(6, 'm').valueOf();
        }
        case period.oneYear: {
            return moment(sa).add(1, 'y').valueOf();
        }
    }
};

module.exports = {
    startAt,
    decodeStartAt,
    period,
    decodePeriod,
    getStartAt,
    getEndOf,
}
