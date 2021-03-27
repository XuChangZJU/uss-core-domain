"use strict";

function toFixed(float) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

    var powerValue = Math.pow(10, precision);

    return Math.floor(float * powerValue) / powerValue;
}

module.exports = {
    toFixed: toFixed
};