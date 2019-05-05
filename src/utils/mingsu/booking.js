/**
 * Created by Administrator on 2019/5/5.
 */
const moment = require('moment');
const assert = require('assert');
const LunarDateUtils = require('../../utils/lunarDateUtils');
/**
 * 计算国家法定假日
 * @param year
 * @returns {Array}
 */
function getHolidays (year) {
    const holidays = [];
    // 元旦
    holidays.push([moment(`${year}-01-01`).startOf('day'), moment(`${year}-01-02`).startOf('day')]);

    // 五一
    holidays.push([moment(`${year}-05-01`).startOf('day'), moment(`${year}-05-04`).startOf('day')]);

    // 国庆
    holidays.push([moment(`${year}-10-01`).startOf('day'), moment(`${year}-10-08`).startOf('day')]);

    // 清明
    holidays.push([moment(`${year}-04-05`).startOf('day'), moment(`${year}-04-06`).startOf('day')]);

    const leapMonth = LunarDateUtils.leapMonth(year);
    // 春节
    {
        const start = LunarDateUtils.lunar2solar(year, 1, 1, leapMonth === 1);
        const { cYear, cMonth, cDay } = start;
        assert(start.cYear === year);     // 春节不可能和阳历年不同一年吧……
        holidays.push([moment(`${cYear}-${cMonth < 10 ? `0${cMonth}` : cMonth}-${cDay < 10 ? `0${cDay}` : cDay}`).add(-1, 'd').startOf('day'),
            moment(`${cYear}-${cMonth < 10 ? `0${cMonth}` : cMonth}-${cDay < 10 ? `0${cDay}` : cDay}`).startOf('day').add(6, 'd')]);
    }
    {
        // 端午
        const start = LunarDateUtils.lunar2solar(year, 5, 5, leapMonth === 5);
        const { cYear, cMonth, cDay } = start;
        assert(start.cYear === year);     // 春节不可能和阳历年不同一年吧……
        holidays.push([moment(`${cYear}-${cMonth < 10 ? `0${cMonth}` : cMonth}-${cDay < 10 ? `0${cDay}` : cDay}`).startOf('day'),
            moment(`${cYear}-${cMonth < 10 ? `0${cMonth}` : cMonth}-${cDay < 10 ? `0${cDay}` : cDay}`).startOf('day').add(1, 'd')]);
    }
    {
        // 中秋
        const start = LunarDateUtils.lunar2solar(year, 8, 15, leapMonth === 5);
        const { cYear, cMonth, cDay } = start;
        assert(start.cYear === year);     // 春节不可能和阳历年不同一年吧……
        holidays.push([moment(`${cYear}-${cMonth < 10 ? `0${cMonth}` : cMonth}-${cDay < 10 ? `0${cDay}` : cDay}`).startOf('day'),
            moment(`${cYear}-${cMonth < 10 ? `0${cMonth}` : cMonth}-${cDay < 10 ? `0${cDay}` : cDay}`).startOf('day').add(1, 'd')]);
    }

    return holidays;
}


function formatMonthOrDayToIso(value) {
    if (value < 10) {
        return `0${value}`;
    }
    return `${value}`;
}

/**
 * 将一个区间内的周末和非周末分段
 * @param start
 * @param end
 * @returns {{Weekday: Array, Weekend: Array}}
 */
function destructOnWeekend(start, end) {
    const Weekday = [];
    const Weekend = [];
    let iter = moment(start);

    while (iter.isBefore(end)) {
        const day = iter.day();
        if (day === 0) {
            const s1 = moment(iter);
            iter.add(1, 'd');
            Weekend.push([s1, moment(iter)]);
        }
        else if (day === 6) {
            const s1 = moment(iter);
            iter.add(2, 'd');
            if (!iter.isAfter(end)) {
                Weekend.push([s1, moment(iter)]);
            }
            else {
                // 只能加一天
                iter.add(-1, 'd');
                Weekend.push([s1, moment(iter)]);
            }
        }
        else {
            const s1 = moment(iter);
            iter.day(6);
            if (!iter.isAfter(end)) {
                Weekday.push([s1, moment(iter)]);
            }
            else {
                // 最多只能等于end
                iter = moment(end);
                Weekday.push([s1, moment(iter)]);
            }
        }
    }

    return {
        Weekday,
        Weekend,
    };
}

/**
 * 将一个周期内的假期和非假期分段
 * @param start
 * @param end
 * @param holidays
 * @returns {{HolidayPart: Array, NotHolidayPart: Array}}
 */
function destructOnHolidays(start, end, holidays) {
    // 先把假期排序
    holidays.sort(
        (ele1, ele2) => ele1[0].valueOf() - ele2[0].valueOf()
    );

    const HolidayPart = [];
    const NotHolidayPart = [];
    let lastHolidayEnd = 0;
    holidays.forEach(
        (ele) => {
            if (lastHolidayEnd === 0) {
                // 不在计算中
                if (start.isBefore(ele[0])) {
                    if (!end.isAfter(ele[0])) {

                    }
                    else if (!end.isAfter(ele[1])) {
                        NotHolidayPart.push([start, ele[0]]);
                        HolidayPart.push([ele[0], end]);
                    }
                    else {
                        NotHolidayPart.push([start, ele[0]]);
                        HolidayPart.push([ele[0], ele[1]]);
                        lastHolidayEnd = ele[1];
                    }
                }
                else if (start.isBefore(ele[1])) {
                    if(!end.isAfter(ele[1])) {
                        HolidayPart.push([start, end]);
                    }
                    else {
                        HolidayPart.push([start, ele[1]]);
                        lastHolidayEnd = ele[1];
                    }
                }
            }
            else {
                if (!end.isAfter(ele[0])) {
                    NotHolidayPart.push([lastHolidayEnd, end]);
                    lastHolidayEnd = 0;
                }
                else if (!end.isAfter(ele[1])) {
                    NotHolidayPart.push([lastHolidayEnd, ele[0]]);
                    HolidayPart.push([ele[0], end]);
                    lastHolidayEnd = 0;
                }
                else {
                    NotHolidayPart.push([lastHolidayEnd, ele[0]]);
                    HolidayPart.push([ele[0], ele[1]]);
                    lastHolidayEnd = ele[1];
                }
            }
        }
    );
    if (HolidayPart.length === 0 && NotHolidayPart.length === 0) {
        // 上面循环只计算与某一个假期有相交的情况，如果都没有，说明不和任何假期相交
        NotHolidayPart.push([start, end]);
    }
    else if(lastHolidayEnd !== 0) {
        // 在最后一个假期之后
        NotHolidayPart.push([lastHolidayEnd, end]);
    }

    return {
        HolidayPart,
        NotHolidayPart,
    };
}


/**
 * 本函数传入左闭右开的日期区间，返回结果是分析这个区间内的淡旺季、节假日和周末
 * @param startsAt
 * @param endsAt
 * @param CONFIG: { HighSeasonStart: { month: 5, day: 1}, HighSeasonEnd: { month: 10, day: 16 } }
 */
function destructInterval(startsAt, endsAt, CONFIG = { HighSeasonStart: { month: 5, day: 1}, HighSeasonEnd: { month: 10, day: 16 }}) {
    /* 简化情况，最多算300天
     */
    assert(endsAt - startsAt < 300 * 24 * 3600 * 1000);
    // 统一转化为左闭右开区间
    const mStart = moment(startsAt).startOf('day');
    const mEnd = moment(endsAt).startOf('day');
    const { HighSeasonStart, HighSeasonEnd } = CONFIG;
    const RESULT = {
        hSWe: [],       // high season weekend
        hSHo: [],       // high season holiday
        hSWd: [],       // high season weekday
        oSWe: [],       // off season weekend
        oSHo: [],       // off season holiday
        oSWd: [],       // off season weeday
    };

    if (mStart.year() < mEnd.year()) {
        // 不在同一年
        assert(mStart.year() + 1 === mEnd.year());
        const OffSeasonPart = [];
        const HighSeasonPart = [];

        const yS1 = moment(`${mStart.year()}-01-01 00:00:00`);
        const yE1 = moment(`${mStart.year() + 1}-01-01 00:00:00`);
        const hsS1 = moment(`${mStart.year()}-${formatMonthOrDayToIso(HighSeasonStart.month)}-${formatMonthOrDayToIso(HighSeasonStart.day)} 00:00:00`);
        const hsE1 = moment(`${mStart.year()}-${formatMonthOrDayToIso(HighSeasonEnd.month)}-${formatMonthOrDayToIso(HighSeasonEnd.day)} 00:00:00`);
        if (mStart.isAfter(hsE1)) {
            OffSeasonPart.push([mStart, yE1]);
        }
        else if (mStart.isAfter(hsS1)) {
            HighSeasonPart.push([mStart, hsE1]);
            OffSeasonPart.push([hsE1, yE1]);
        }
        else {
            OffSeasonPart.push([mStart, hsS1]);
            HighSeasonPart.push([hsS1, hsE1]);
            OffSeasonPart.push([hsE1, yE1]);
        }

        const holidays = getHolidays(mStart.year());
        OffSeasonPart.forEach(
            (ele) => {
                const { HolidayPart, NotHolidayPart } = destructOnHolidays(ele[0], ele[1], holidays);
                RESULT.oSHo = RESULT.oSHo.concat(HolidayPart);
                NotHolidayPart.forEach(
                    (nHol) => {
                        const { Weekend, Weekday } = destructOnWeekend(nHol[0], nHol[1]);
                        RESULT.oSWd = RESULT.oSWd.concat(Weekday);
                        RESULT.oSWe = RESULT.oSWe.concat(Weekend);
                    }
                );
            }
        );

        HighSeasonPart.forEach(
            (ele) => {
                const { HolidayPart, NotHolidayPart } = destructOnHolidays(ele[0], ele[1], holidays);
                RESULT.hSHo = RESULT.hSHo.concat(HolidayPart);
                NotHolidayPart.forEach(
                    (nHol) => {
                        const { Weekend, Weekday } = destructOnWeekend(nHol[0], nHol[1]);
                        RESULT.hSWd = RESULT.hSWd.concat(Weekday);
                        RESULT.hSWe = RESULT.hSWe.concat(Weekend);
                    }
                );
            }
        );

        const OffSeasonPart2 = [];
        const HighSeasonPart2 = [];
        const yS2 = moment(`${mEnd.year()}-01-01 00:00:00`);
        const yE2 = moment(`${mEnd.year() + 1}-01-01 00:00:00`);
        const hsS2 = moment(`${mEnd.year()}-${formatMonthOrDayToIso(HighSeasonStart.month)}-${formatMonthOrDayToIso(HighSeasonStart.day)} 00:00:00`);
        const hsE2 = moment(`${mEnd.year()}-${formatMonthOrDayToIso(HighSeasonEnd.month)}-${formatMonthOrDayToIso(HighSeasonEnd.day)} 00:00:00`);
        if (!mEnd.isAfter(hsS2)) {
            if (mEnd.isAfter(yS2)) {
                OffSeasonPart2.push([yS2, mEnd]);
            }
        }
        else if (!mEnd.isAfter(hsE2)) {
            OffSeasonPart2.push([yS2, hsS2]);
            HighSeasonPart2.push([hsS2, mEnd]);
        }
        else {
            OffSeasonPart2.push([yS2, hsS2]);
            HighSeasonPart2.push([hsS2, hsE2]);
            OffSeasonPart2.push([hsE2, mEnd]);
        }

        const holidays2 = getHolidays(mEnd.year());
        OffSeasonPart2.forEach(
            (ele) => {
                const { HolidayPart, NotHolidayPart } = destructOnHolidays(ele[0], ele[1], holidays2);
                RESULT.oSHo = RESULT.oSHo.concat(HolidayPart);
                NotHolidayPart.forEach(
                    (nHol) => {
                        const { Weekend, Weekday } = destructOnWeekend(nHol[0], nHol[1]);
                        RESULT.oSWd = RESULT.oSWd.concat(Weekday);
                        RESULT.oSWe = RESULT.oSWe.concat(Weekend);
                    }
                );
            }
        );

        HighSeasonPart2.forEach(
            (ele) => {
                const { HolidayPart, NotHolidayPart } = destructOnHolidays(ele[0], ele[1], holidays2);
                RESULT.hSHo = RESULT.hSHo.concat(HolidayPart);
                NotHolidayPart.forEach(
                    (nHol) => {
                        const {Weekend, Weekday} = destructOnWeekend(nHol[0], nHol[1]);
                        RESULT.hSWd = RESULT.hSWd.concat(Weekday);
                        RESULT.hSWe = RESULT.hSWe.concat(Weekend);
                    }
                );
            }
        );
    }
    else {
        const OffSeasonPart = [];
        const HighSeasonPart = [];
        const yS1 = moment(`${mStart.year()}-01-01 00:00:00`);
        const yE1 = moment(`${mStart.year() + 1}-01-01 00:00:00`);
        const hsS1 = moment(`${mStart.year()}-${formatMonthOrDayToIso(HighSeasonStart.month)}-${formatMonthOrDayToIso(HighSeasonStart.day)} 00:00:00`);
        const hsE1 = moment(`${mStart.year()}-${formatMonthOrDayToIso(HighSeasonEnd.month)}-${formatMonthOrDayToIso(HighSeasonEnd.day)} 00:00:00`);

        if (mStart.isBefore(hsS1)) {
            if (!mEnd.isAfter(hsS1)) {
                OffSeasonPart.push([mStart, mEnd]);
            }
            else if (!mEnd.isAfter(hsE1)) {
                OffSeasonPart.push([mStart, hsS1]);
                HighSeasonPart.push([hsS1, mEnd]);
            }
            else {
                OffSeasonPart.push([mStart, hsS1]);
                HighSeasonPart.push([hsS1, hsE1]);
                OffSeasonPart.push([hsE1, mEnd]);
            }
        }
        else if (mStart.isBefore(hsE1)) {
            if (!mEnd.isAfter(hsE1)) {
                HighSeasonPart.push([mStart, mEnd]);
            }
            else {
                HighSeasonPart.push([mStart, hsE1]);
                OffSeasonPart.push([hsE1, mEnd]);
            }
        }
        else {
            OffSeasonPart.push(mStart, mEnd);
        }

        const holidays = getHolidays(mStart.year());
        OffSeasonPart.forEach(
            (ele) => {
                const { HolidayPart, NotHolidayPart } = destructOnHolidays(ele[0], ele[1], holidays);
                RESULT.oSHo = RESULT.oSHo.concat(HolidayPart);
                NotHolidayPart.forEach(
                    (nHol) => {
                        const { Weekend, Weekday } = destructOnWeekend(nHol[0], nHol[1]);
                        RESULT.oSWd = RESULT.oSWd.concat(Weekday);
                        RESULT.oSWe = RESULT.oSWe.concat(Weekend);
                    }
                );
            }
        );

        HighSeasonPart.forEach(
            (ele) => {
                const { HolidayPart, NotHolidayPart } = destructOnHolidays(ele[0], ele[1], holidays);
                RESULT.hSHo = RESULT.hSHo.concat(HolidayPart);
                NotHolidayPart.forEach(
                    (nHol) => {
                        const { Weekend, Weekday } = destructOnWeekend(nHol[0], nHol[1]);
                        RESULT.hSWd = RESULT.hSWd.concat(Weekday);
                        RESULT.hSWe = RESULT.hSWe.concat(Weekend);
                    }
                );
            }
        );
    }

    return RESULT;
}

module.exports = {
    destructInterval,
};