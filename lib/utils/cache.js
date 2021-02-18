"use strict";

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 简单的用Map结构作为数据的缓存
 */

function load(cache, entity, id) {
    var k = entity + "-" + id;
    if (cache.has(k)) {
        return cache.get(k);
    }
    return;
}

function save(cache, entity, data) {
    var id = data.id;

    var k = entity + "-" + id;
    if (cache.has(k)) {
        var origin = cache.get(k);
        var fresh = (0, _assign2.default)({}, origin, data);
        cache.set(k, fresh);
    }
    cache.set(k, data);
}

function remove(cache, entity, id) {
    var k = entity + "-" + id;
    cache.delete(k);
}

module.exports = {
    load: load,
    save: save,
    remove: remove
};