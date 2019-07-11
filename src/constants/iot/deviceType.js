/**
 * Created by Administrator on 2019/7/11.
 */
const moment = require('moment');
const assert = require('assert');
const extractableAfter = {
    tomorrow: 1,
    dayAfterTomorrow: 2,
};

const decodeExtractableAfter = (ea) => {
    const S = {
        [extractableAfter.tomorrow]: '次日',
        [extractableAfter.dayAfterTomorrow]: '后日',
    };
    return S[ea];
};

function getExtractableAfter(ea, hour) {
    const m = moment();

    switch (ea) {
        case extractableAfter.tomorrow: {
            m.add(1, 'day');
            break;
        }
        case extractableAfter.dayAfterTomorrow: {
            m.add(2, 'day');
            break;
        }
        default: {
            throw new Error(`unrecognized ea: ${ea}`);
        }
    }

    if (hour) {
        m.hours(hour).minutes(0).seconds(0);
    }
    else {
        m.hours(0).minutes(0).seconds(0);
    }
    return m.valueOf();
}

module.exports = {
    extractableAfter,
    decodeExtractableAfter,
    getExtractableAfter,
};
