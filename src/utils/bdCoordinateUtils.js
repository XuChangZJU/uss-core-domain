/**
 * Created by Administrator on 2018/4/20.
 */
const x_pi = 3.14159265358979324 * 3000.0 / 180.0;
const precision = 10000000;

function bdEncrypt(ggLng, ggLat)
{
    const x = ggLng, y = ggLat;
    const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    const bdLng = Math.ceil((z * Math.cos(theta) + 0.0065) * precision) / precision;
    const bdLat = Math.ceil((z * Math.sin(theta) + 0.006) * precision) / precision;

    return [bdLng, bdLat];
}

function bdDecrypt(bdLng, bdLat)
{
    const x = bdLng - 0.0065, y = bdLat - 0.006;
    const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    const ggLng = Math.ceil((z * Math.cos(theta)) * precision) / precision;
    const ggLat = Math.ceil((z * Math.sin(theta)) * precision) / precision;
    return [ggLng, ggLat];
}
module.exports = {
    bdEncrypt,
    bdDecrypt,
};
