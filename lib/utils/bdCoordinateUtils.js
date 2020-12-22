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
function rad(v) {
    return v * Math.PI / 180;
}
function getDist(lng1, lat1, lng2, lat2) {
    var a = rad(lat1) - rad(lat2);
    var b = rad(lng1) - rad(lng2);

    var s = 2 * Math.sin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.pow(Math.sin(b / 2), 2)));
    var EARTH_RADIUS = 6378.137;
    return Math.round(s * EARTH_RADIUS * 10000) / 10;
}
module.exports = {
    getDist: getDist,
    bdEncrypt: bdEncrypt,
    bdDecrypt: bdDecrypt
};