'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('./common'),
    action = _require.action,
    decodeAction = _require.decodeAction;

var type = Object.assign({}, {
    'singleChoice': 1,
    'multipleChoice': 2,
    'fillBlank': 3
});

var decodeType = function decodeType(t) {
    var _T;

    var T = (_T = {}, _defineProperty(_T, type.singleChoice, '单项选择'), _defineProperty(_T, type.multipleChoice, '多项选择'), _defineProperty(_T, type.fillBlank, '填空'), _T);
    return T[t];
};

var ageGroup = {
    1: {
        max: 6,
        min: 0
    },
    2: {
        max: 12,
        min: 7
    },
    3: {
        max: 13,
        min: 18
    },
    4: {
        max: 60,
        min: 19
    },
    5: {
        max: 999,
        min: 61
    }
};

var ageToAgeGroup = function ageToAgeGroup(a) {
    var i = 1;
    var ans = void 0;
    while (ageGroup[i] && !ans) {
        if (ageGroup[i].min <= a && ageGroup[i].max >= a) {
            ans = i;
        }
        i++;
    }
    return ans || 5;
};

module.exports = {
    type: type,
    decodeType: decodeType,
    action: action,
    decodeAction: decodeAction,
    ageGroup: ageGroup,
    ageToAgeGroup: ageToAgeGroup
};