"use strict";

/**
 * Created by Administrator on 2018/4/20.
 */
var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
var precision = 10000000;

function bdEncrypt(ggLng, ggLat) {
    var x = ggLng,
        y = ggLat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    var bdLng = Math.ceil((z * Math.cos(theta) + 0.0065) * precision) / precision;
    var bdLat = Math.ceil((z * Math.sin(theta) + 0.006) * precision) / precision;

    return [bdLng, bdLat];
}

function bdDecrypt(bdLng, bdLat) {
    var x = bdLng - 0.0065,
        y = bdLat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var ggLng = Math.ceil(z * Math.cos(theta) * precision) / precision;
    var ggLat = Math.ceil(z * Math.sin(theta) * precision) / precision;
    return [ggLng, ggLat];
}
module.exports = {
    bdEncrypt: bdEncrypt,
    bdDecrypt: bdDecrypt
};