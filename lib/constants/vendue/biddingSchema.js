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

function getBS(price, biddingSchema, add) {
    var b = void 0;

    for (var i = 0; i < biddingSchema.length; i++) {
        if (biddingSchema[i].min <= price && biddingSchema[i].max > price && add === 1) {
            b = biddingSchema[i];
            break;
        }
        if (biddingSchema[i].min < price && biddingSchema[i].max >= price && add === -1) {
            b = biddingSchema[i];
            break;
        }
    }
    return b;
}

function getChangedPrice(params) {
    var _FN;

    var FN = (_FN = {}, _defineProperty(_FN, type.increasingBy258, function (_ref) {
        var price = _ref.price,
            add = _ref.add;

        var secondPos = [-2, 0, 2, 5, 8, 10];
        var myPrice2 = Math.floor(price);
        var myPrice1 = myPrice2.toString();
        if (/^10{2,}$/.test(price) && add === -1) {
            var _ans = '98';
            for (var i = 0; i < myPrice1.length - 3; i++) {
                _ans += '0';
            }
            return parseInt(_ans);
        }
        if (myPrice1.length < 2 || price === 10 && add === -1) {
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
    }), _defineProperty(_FN, type.sequentiallyIncreasing, function (_ref2) {
        var price = _ref2.price,
            section = _ref2.section,
            add = _ref2.add;
        var step = section.step;

        if (price + step * add < 0) {
            return 0;
        }
        return price + step * add;
    }), _FN);

    //传入 价格 竞价阶梯
    var price = params.price,
        biddingSchema = params.biddingSchema,
        add = params.add;

    var section = getBS(price, biddingSchema, add); //价格在竞价阶梯哪一段
    if (!section) {
        if (price >= biddingSchema[biddingSchema.length - 1].max) {
            return FN[biddingSchema[biddingSchema.length - 1].type](params);
        }
        if (price <= biddingSchema[0].min) {
            return FN[biddingSchema[0].type](params);
        }
        return -1;
    }
    var fn = FN[section.type];
    if (typeof fn !== 'function') {
        return -1;
    }
    var ans = fn(Object.assign({}, params, { section: section }));
    if (ans > section.max) {
        return section.max;
    }
    if (ans < section.min) {
        return section.min;
    }
    return ans;
}

module.exports = {
    type: type,
    decodeType: decodeType,
    getBS: getBS,
    getChangedPrice: getChangedPrice
};