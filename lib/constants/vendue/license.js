"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var type = Object.assign({}, {
    noInsurance: 1
});

var STRINGS_OF_ORIGINS = _defineProperty({}, type.noInsurance, "免保");

function decodeType(o) {
    return STRINGS_OF_ORIGINS[o];
}

module.exports = {
    type: type,
    decodeType: decodeType
};