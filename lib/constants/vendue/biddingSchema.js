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

function getBS(_ref) {
    var price = _ref.price,
        biddingSchema = _ref.biddingSchema;

    var b = void 0;
    for (var i = 0; i < biddingSchema.length; i++) {
        if (biddingSchema[i].min <= price && biddingSchema[i].max > price) {
            b = biddingSchema[i];
            break;
        }
    }
    return b;
}

function getChangedPrice(params) {
    var _FN;

    var FN = (_FN = {}, _defineProperty(_FN, type.increasingBy258, function (_ref2) {
        var myPrice = _ref2.myPrice,
            add = _ref2.add;

        var secondPos = [-2, 0, 2, 5, 8, 10];
        var myPrice2 = Math.floor(myPrice);
        var myPrice1 = myPrice2.toString();
        if (/^10{2,}$/.test(myPrice)) {
            var ans = '98';
            for (var i = 0; i < myPrice1.length - 3; i++) {
                ans += '0';
            }
            return parseInt(ans);
        }
        if (myPrice1.length < 2 || myPrice === 10 && add === -1) {
            return 10;
        }
        var posJudge = Math.floor((parseInt(myPrice1[1]) - 2) / 3) + 2;
        var tailNum = myPrice1.substr(2);
        if (parseInt(tailNum) > 0 && add < 0) {
            posJudge++;
        }
        var basic = 1;
        for (var _i = 0; _i < myPrice1.length - 2; _i++) {
            basic *= 10;
        }
        return (parseInt(myPrice1[0]) * 10 + secondPos[posJudge + add]) * basic;
    }), _defineProperty(_FN, type.sequentiallyIncreasing, function (_ref3) {
        var myPrice = _ref3.myPrice,
            step = _ref3.step,
            add = _ref3.add;

        if (myPrice + step * add < 0) {
            return 0;
        }
        return myPrice + step * add;
    }), _FN);
    return FN[params.type](params);
}
module.exports = {
    type: type,
    decodeType: decodeType,
    getBS: getBS,
    getChangedPrice: getChangedPrice
};