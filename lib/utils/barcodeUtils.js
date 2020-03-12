'use strict';

/**
 * Created by Xc on 2020/3/12.
 */
function encodeBarcode(entity, uuid) {
    return entity + '-' + uuid;
}

function decodeBarcode(barcode) {
    return barcode.split('-');
}

module.exports = {
    encodeBarcode: encodeBarcode,
    decodeBarcode: decodeBarcode
};