'use strict';

/**
 * Created by Administrator on 2019/5/5.
 */
var moment = require('moment');
var assert = require('assert');
var LunarDateUtils = require('../../utils/lunarDateUtils');
/**
 * 计算国家法定假日
 * @param year
 * @returns {Array}
 */
function getHolidays(year) {
    var holidays = [];
    // 元旦
    holidays.push([moment(year + '-01-01').startOf('day'), moment(year + '-01-02').startOf('day')]);

    // 五一
    holidays.push([moment(year + '-05-01').startOf('day'), moment(year + '-05-04').startOf('day')]);

    // 国庆
    holidays.push([moment(year + '-10-01').startOf('day'), moment(year + '-10-08').startOf('day')]);

    // 清明
    holidays.push([moment(year + '-04-05').startOf('day'), moment(year + '-04-06').startOf('day')]);

    var leapMonth = LunarDateUtils.leapMonth(year);
    // 春节
    {
        var start = LunarDateUtils.lunar2solar(year, 1, 1, leapMonth === 1);
        var cYear = start.cYear,
            cMonth = start.cMonth,
            cDay = start.cDay;

        assert(start.cYear === year); // 春节不可能和阳历年不同一年吧……
        holidays.push([moment(cYear + '-' + (cMonth < 10 ? '0' + cMonth : cMonth) + '-' + (cDay < 10 ? '0' + cDay : cDay)).add(-1, 'd').startOf('day'), moment(cYear + '-' + (cMonth < 10 ? '0' + cMonth : cMonth) + '-' + (cDay < 10 ? '0' + cDay : cDay)).startOf('day').add(6, 'd')]);
    }
    {
        // 端午
        var _start = LunarDateUtils.lunar2solar(year, 5, 5, leapMonth === 5);
        var _cYear = _start.cYear,
            _cMonth = _start.cMonth,
            _cDay = _start.cDay;

        assert(_start.cYear === year); // 春节不可能和阳历年不同一年吧……
        holidays.push([moment(_cYear + '-' + (_cMonth < 10 ? '0' + _cMonth : _cMonth) + '-' + (_cDay < 10 ? '0' + _cDay : _cDay)).startOf('day'), moment(_cYear + '-' + (_cMonth < 10 ? '0' + _cMonth : _cMonth) + '-' + (_cDay < 10 ? '0' + _cDay : _cDay)).startOf('day').add(1, 'd')]);
    }
    {
        // 中秋
        var _start2 = LunarDateUtils.lunar2solar(year, 8, 15, leapMonth === 5);
        var _cYear2 = _start2.cYear,
            _cMonth2 = _start2.cMonth,
            _cDay2 = _start2.cDay;

        assert(_start2.cYear === year); // 春节不可能和阳历年不同一年吧……
        holidays.push([moment(_cYear2 + '-' + (_cMonth2 < 10 ? '0' + _cMonth2 : _cMonth2) + '-' + (_cDay2 < 10 ? '0' + _cDay2 : _cDay2)).startOf('day'), moment(_cYear2 + '-' + (_cMonth2 < 10 ? '0' + _cMonth2 : _cMonth2) + '-' + (_cDay2 < 10 ? '0' + _cDay2 : _cDay2)).startOf('day').add(1, 'd')]);
    }

    return holidays;
}

function formatMonthOrDayToIso(value) {
    if (value < 10) {
        return '0' + value;
    }
    return '' + value;
}

/**
 * 将一个区间内的周末和非周末分段
 * @param start
 * @param end
 * @returns {{Weekday: Array, Weekend: Array}}
 */
function destructOnWeekend(start, end) {
    var Weekday = [];
    var Weekend = [];
    var iter = moment(start);

    while (iter.isBefore(end)) {
        var day = iter.day();
        if (day === 0) {
            var s1 = moment(iter);
            iter.add(1, 'd');
            Weekend.push([s1, moment(iter)]);
        } else if (day === 6) {
            var _s = moment(iter);
            iter.add(2, 'd');
            if (!iter.isAfter(end)) {
                Weekend.push([_s, moment(iter)]);
            } else {
                // 只能加一天
                iter.add(-1, 'd');
                Weekend.push([_s, moment(iter)]);
            }
        } else {
            var _s2 = moment(iter);
            iter.day(6);
            if (!iter.isAfter(end)) {
                Weekday.push([_s2, moment(iter)]);
            } else {
                // 最多只能等于end
                iter = moment(end);
                Weekday.push([_s2, moment(iter)]);
            }
        }
    }

    return {
        Weekday: Weekday,
        Weekend: Weekend
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
    holidays.sort(function (ele1, ele2) {
        return ele1[0].valueOf() - ele2[0].valueOf();
    });

    var HolidayPart = [];
    var NotHolidayPart = [];
    var lastHolidayEnd = 0;
    holidays.forEach(function (ele) {
        if (lastHolidayEnd === 0) {
            // 不在计算中
            if (start.isBefore(ele[0])) {
                if (!end.isAfter(ele[0])) {} else if (!end.isAfter(ele[1])) {
                    NotHolidayPart.push([start, ele[0]]);
                    HolidayPart.push([ele[0], end]);
                } else {
                    NotHolidayPart.push([start, ele[0]]);
                    HolidayPart.push([ele[0], ele[1]]);
                    lastHolidayEnd = ele[1];
                }
            } else if (start.isBefore(ele[1])) {
                if (!end.isAfter(ele[1])) {
                    HolidayPart.push([start, end]);
                } else {
                    HolidayPart.push([start, ele[1]]);
                    lastHolidayEnd = ele[1];
                }
            }
        } else {
            if (!end.isAfter(ele[0])) {
                NotHolidayPart.push([lastHolidayEnd, end]);
                lastHolidayEnd = 0;
            } else if (!end.isAfter(ele[1])) {
                NotHolidayPart.push([lastHolidayEnd, ele[0]]);
                HolidayPart.push([ele[0], end]);
                lastHolidayEnd = 0;
            } else {
                NotHolidayPart.push([lastHolidayEnd, ele[0]]);
                HolidayPart.push([ele[0], ele[1]]);
                lastHolidayEnd = ele[1];
            }
        }
    });
    if (HolidayPart.length === 0 && NotHolidayPart.length === 0) {
        // 上面循环只计算与某一个假期有相交的情况，如果都没有，说明不和任何假期相交
        NotHolidayPart.push([start, end]);
    } else if (lastHolidayEnd !== 0) {
        // 在最后一个假期之后
        NotHolidayPart.push([lastHolidayEnd, end]);
    }

    return {
        HolidayPart: HolidayPart,
        NotHolidayPart: NotHolidayPart
    };
}

/**
 * 本函数传入左闭右开的日期区间，返回结果是分析这个区间内的淡旺季、节假日和周末
 * @param startsAt
 * @param endsAt
 * @param CONFIG: { HighSeasonStart: { month: 5, day: 1}, HighSeasonEnd: { month: 10, day: 16 } }
 */
function destructInterval(startsAt, endsAt) {
    var CONFIG = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : { HighSeasonStart: { month: 5, day: 1 }, HighSeasonEnd: { month: 10, day: 16 } };

    /* 简化情况，最多算300天
     */
    assert(endsAt - startsAt < 300 * 24 * 3600 * 1000);
    // 统一转化为左闭右开区间
    var mStart = moment(startsAt).startOf('day');
    var mEnd = moment(endsAt).startOf('day');
    var HighSeasonStart = CONFIG.HighSeasonStart,
        HighSeasonEnd = CONFIG.HighSeasonEnd;

    var RESULT = {
        hSWe: [], // high season weekend
        hSHo: [], // high season holiday
        hSWd: [], // high season weekday
        oSWe: [], // off season weekend
        oSHo: [], // off season holiday
        oSWd: [] // off season weeday
    };

    if (mStart.year() < mEnd.year()) {
        // 不在同一年
        assert(mStart.year() + 1 === mEnd.year());
        var OffSeasonPart = [];
        var HighSeasonPart = [];

        var yS1 = moment(mStart.year() + '-01-01 00:00:00');
        var yE1 = moment(mStart.year() + 1 + '-01-01 00:00:00');
        var hsS1 = moment(mStart.year() + '-' + formatMonthOrDayToIso(HighSeasonStart.month) + '-' + formatMonthOrDayToIso(HighSeasonStart.day) + ' 00:00:00');
        var hsE1 = moment(mStart.year() + '-' + formatMonthOrDayToIso(HighSeasonEnd.month) + '-' + formatMonthOrDayToIso(HighSeasonEnd.day) + ' 00:00:00');
        if (mStart.isAfter(hsE1)) {
            OffSeasonPart.push([mStart, yE1]);
        } else if (mStart.isAfter(hsS1)) {
            HighSeasonPart.push([mStart, hsE1]);
            OffSeasonPart.push([hsE1, yE1]);
        } else {
            OffSeasonPart.push([mStart, hsS1]);
            HighSeasonPart.push([hsS1, hsE1]);
            OffSeasonPart.push([hsE1, yE1]);
        }

        var holidays = getHolidays(mStart.year());
        OffSeasonPart.forEach(function (ele) {
            var _destructOnHolidays = destructOnHolidays(ele[0], ele[1], holidays),
                HolidayPart = _destructOnHolidays.HolidayPart,
                NotHolidayPart = _destructOnHolidays.NotHolidayPart;

            RESULT.oSHo = RESULT.oSHo.concat(HolidayPart);
            NotHolidayPart.forEach(function (nHol) {
                var _destructOnWeekend = destructOnWeekend(nHol[0], nHol[1]),
                    Weekend = _destructOnWeekend.Weekend,
                    Weekday = _destructOnWeekend.Weekday;

                RESULT.oSWd = RESULT.oSWd.concat(Weekday);
                RESULT.oSWe = RESULT.oSWe.concat(Weekend);
            });
        });

        HighSeasonPart.forEach(function (ele) {
            var _destructOnHolidays2 = destructOnHolidays(ele[0], ele[1], holidays),
                HolidayPart = _destructOnHolidays2.HolidayPart,
                NotHolidayPart = _destructOnHolidays2.NotHolidayPart;

            RESULT.hSHo = RESULT.hSHo.concat(HolidayPart);
            NotHolidayPart.forEach(function (nHol) {
                var _destructOnWeekend2 = destructOnWeekend(nHol[0], nHol[1]),
                    Weekend = _destructOnWeekend2.Weekend,
                    Weekday = _destructOnWeekend2.Weekday;

                RESULT.hSWd = RESULT.hSWd.concat(Weekday);
                RESULT.hSWe = RESULT.hSWe.concat(Weekend);
            });
        });

        var OffSeasonPart2 = [];
        var HighSeasonPart2 = [];
        var yS2 = moment(mEnd.year() + '-01-01 00:00:00');
        var yE2 = moment(mEnd.year() + 1 + '-01-01 00:00:00');
        var hsS2 = moment(mEnd.year() + '-' + formatMonthOrDayToIso(HighSeasonStart.month) + '-' + formatMonthOrDayToIso(HighSeasonStart.day) + ' 00:00:00');
        var hsE2 = moment(mEnd.year() + '-' + formatMonthOrDayToIso(HighSeasonEnd.month) + '-' + formatMonthOrDayToIso(HighSeasonEnd.day) + ' 00:00:00');
        if (!mEnd.isAfter(hsS2)) {
            if (mEnd.isAfter(yS2)) {
                OffSeasonPart2.push([yS2, mEnd]);
            }
        } else if (!mEnd.isAfter(hsE2)) {
            OffSeasonPart2.push([yS2, hsS2]);
            HighSeasonPart2.push([hsS2, mEnd]);
        } else {
            OffSeasonPart2.push([yS2, hsS2]);
            HighSeasonPart2.push([hsS2, hsE2]);
            OffSeasonPart2.push([hsE2, mEnd]);
        }

        var holidays2 = getHolidays(mEnd.year());
        OffSeasonPart2.forEach(function (ele) {
            var _destructOnHolidays3 = destructOnHolidays(ele[0], ele[1], holidays2),
                HolidayPart = _destructOnHolidays3.HolidayPart,
                NotHolidayPart = _destructOnHolidays3.NotHolidayPart;

            RESULT.oSHo = RESULT.oSHo.concat(HolidayPart);
            NotHolidayPart.forEach(function (nHol) {
                var _destructOnWeekend3 = destructOnWeekend(nHol[0], nHol[1]),
                    Weekend = _destructOnWeekend3.Weekend,
                    Weekday = _destructOnWeekend3.Weekday;

                RESULT.oSWd = RESULT.oSWd.concat(Weekday);
                RESULT.oSWe = RESULT.oSWe.concat(Weekend);
            });
        });

        HighSeasonPart2.forEach(function (ele) {
            var _destructOnHolidays4 = destructOnHolidays(ele[0], ele[1], holidays2),
                HolidayPart = _destructOnHolidays4.HolidayPart,
                NotHolidayPart = _destructOnHolidays4.NotHolidayPart;

            RESULT.hSHo = RESULT.hSHo.concat(HolidayPart);
            NotHolidayPart.forEach(function (nHol) {
                var _destructOnWeekend4 = destructOnWeekend(nHol[0], nHol[1]),
                    Weekend = _destructOnWeekend4.Weekend,
                    Weekday = _destructOnWeekend4.Weekday;

                RESULT.hSWd = RESULT.hSWd.concat(Weekday);
                RESULT.hSWe = RESULT.hSWe.concat(Weekend);
            });
        });
    } else {
        var _OffSeasonPart = [];
        var _HighSeasonPart = [];
        var _yS = moment(mStart.year() + '-01-01 00:00:00');
        var _yE = moment(mStart.year() + 1 + '-01-01 00:00:00');
        var _hsS = moment(mStart.year() + '-' + formatMonthOrDayToIso(HighSeasonStart.month) + '-' + formatMonthOrDayToIso(HighSeasonStart.day) + ' 00:00:00');
        var _hsE = moment(mStart.year() + '-' + formatMonthOrDayToIso(HighSeasonEnd.month) + '-' + formatMonthOrDayToIso(HighSeasonEnd.day) + ' 00:00:00');

        if (mStart.isBefore(_hsS)) {
            if (!mEnd.isAfter(_hsS)) {
                _OffSeasonPart.push([mStart, mEnd]);
            } else if (!mEnd.isAfter(_hsE)) {
                _OffSeasonPart.push([mStart, _hsS]);
                _HighSeasonPart.push([_hsS, mEnd]);
            } else {
                _OffSeasonPart.push([mStart, _hsS]);
                _HighSeasonPart.push([_hsS, _hsE]);
                _OffSeasonPart.push([_hsE, mEnd]);
            }
        } else if (mStart.isBefore(_hsE)) {
            if (!mEnd.isAfter(_hsE)) {
                _HighSeasonPart.push([mStart, mEnd]);
            } else {
                _HighSeasonPart.push([mStart, _hsE]);
                _OffSeasonPart.push([_hsE, mEnd]);
            }
        } else {
            _OffSeasonPart.push(mStart, mEnd);
        }

        var _holidays = getHolidays(mStart.year());
        _OffSeasonPart.forEach(function (ele) {
            var _destructOnHolidays5 = destructOnHolidays(ele[0], ele[1], _holidays),
                HolidayPart = _destructOnHolidays5.HolidayPart,
                NotHolidayPart = _destructOnHolidays5.NotHolidayPart;

            RESULT.oSHo = RESULT.oSHo.concat(HolidayPart);
            NotHolidayPart.forEach(function (nHol) {
                var _destructOnWeekend5 = destructOnWeekend(nHol[0], nHol[1]),
                    Weekend = _destructOnWeekend5.Weekend,
                    Weekday = _destructOnWeekend5.Weekday;

                RESULT.oSWd = RESULT.oSWd.concat(Weekday);
                RESULT.oSWe = RESULT.oSWe.concat(Weekend);
            });
        });

        _HighSeasonPart.forEach(function (ele) {
            var _destructOnHolidays6 = destructOnHolidays(ele[0], ele[1], _holidays),
                HolidayPart = _destructOnHolidays6.HolidayPart,
                NotHolidayPart = _destructOnHolidays6.NotHolidayPart;

            RESULT.hSHo = RESULT.hSHo.concat(HolidayPart);
            NotHolidayPart.forEach(function (nHol) {
                var _destructOnWeekend6 = destructOnWeekend(nHol[0], nHol[1]),
                    Weekend = _destructOnWeekend6.Weekend,
                    Weekday = _destructOnWeekend6.Weekday;

                RESULT.hSWd = RESULT.hSWd.concat(Weekday);
                RESULT.hSWe = RESULT.hSWe.concat(Weekend);
            });
        });
    }

    return RESULT;
}

function isLegalStartsAtAndEndsAt(_ref) {
    var startsAt = _ref.startsAt,
        endsAt = _ref.endsAt;

    if (typeof startsAt !== 'number' || typeof endsAt !== 'number') {
        throw new Error('startsAt:[' + startsAt + ']\u548CendsAt:[' + endsAt + ']\u683C\u5F0F\u4E0D\u5BF9');
    }
    if (startsAt > endsAt) {
        throw new Error('startsAt:[' + startsAt + ']\u5927\u4E8EendsAt:[' + endsAt + ']');
    }
    var ms = moment(startsAt);
    var me = moment(endsAt);

    if (ms.endOf('day').valueOf() < Date.now()) {
        throw new Error('startsAt:[' + startsAt + ']\u5C0F\u4E8E\u4ECA\u5929');
    }
    if (ms.endOf('day').valueOf() === me.endOf('day').valueOf()) {
        throw new Error('startsAt:[' + startsAt + ']\u548CendsAt:[' + endsAt + ']\u5728\u540C\u4E00\u5929');
    }
    return true;
}

module.exports = {
    destructInterval: destructInterval,
    isLegalStartsAtAndEndsAt: isLegalStartsAtAndEndsAt
};