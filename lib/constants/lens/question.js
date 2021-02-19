'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./common'),
    action = _require.action,
    decodeAction = _require.decodeAction;

var type = (0, _assign2.default)({}, {
    'singleChoice': 1,
    'multipleChoice': 2,
    'fillBlank': 3
});

var decodeType = function decodeType(t) {
    var _T;

    var T = (_T = {}, (0, _defineProperty3.default)(_T, type.singleChoice, '单项选择'), (0, _defineProperty3.default)(_T, type.multipleChoice, '多项选择'), (0, _defineProperty3.default)(_T, type.fillBlank, '填空'), _T);
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
        max: 18,
        min: 13
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