"use strict";

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
        var fresh = Object.assign({}, origin, data);
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