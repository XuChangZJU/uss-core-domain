"use strict";

var _STRINGS_OF_ORIGINS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ErrorCode = require('../errorCode');

var type = Object.assign({}, {
    sequentiallyIncreasing: 1,
    increasingBy258: 2
});

var STRINGS_OF_ORIGINS = (_STRINGS_OF_ORIGINS = {}, _defineProperty(_STRINGS_OF_ORIGINS, type.sequentiallyIncreasing, "顺序递增"), _defineProperty(_STRINGS_OF_ORIGINS, type.increasingBy258, "258拍"), _STRINGS_OF_ORIGINS);

function decodeType(o) {
    return STRINGS_OF_ORIGINS[o];
}

function getChangedPrice(params) {
    var _FN;

    var FN = (_FN = {}, _defineProperty(_FN, type.increasingBy258, function (_ref) {
        var myPrice = _ref.myPrice,
            add = _ref.add;

        var secondPos = [-2, 0, 2, 5, 8, 10];
        var myPrice2 = Math.floor(myPrice);
        var myPrice1 = myPrice2.toString();
        if (/^10{2,}$/.test(myPrice1)) {
            var ans = '98';
            for (var i = 0; i < myPrice1.length - 3; i++) {
                ans += '0';
            }
            return parseInt(ans);
        }
        if (myPrice1.length < 2) {
            throw ErrorCode.createErrorByCode(ErrorCode.errorLegalParamError, '258加价格至少为10');
        }
        var posJudge = Math.floor((parseInt(myPrice1[1]) - 1) / 3) + 1;
        var basic = 1;
        for (var _i = 0; _i < myPrice1.length - 2; _i++) {
            basic *= 10;
        }
        return (parseInt(myPrice1[0]) * 10 + secondPos[posJudge + add]) * basic;
    }), _defineProperty(_FN, type.sequentiallyIncreasing, function (_ref2) {
        var myPrice = _ref2.myPrice,
            step = _ref2.step,
            add = _ref2.add;

        return myPrice + step * add;
    }), _FN);
    return FN[params.type](params);
}
module.exports = {
    type: type,
    decodeType: decodeType,
    getChangedPrice: getChangedPrice
};