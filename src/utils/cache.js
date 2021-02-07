/**
 * 简单的用Map结构作为数据的缓存
 */

function load(cache, entity, id) {
    const k = `${entity}-${id}`;
    if (cache.has(k)) {
        return cache.get(k);
    }
    return;
}

function save(cache, entity, data) {
    const { id } = data;
    const k = `${entity}-${id}`;
    if (cache.has(k)) {
        const origin = cache.get(k);
        const fresh = Object.assign({}, origin, data);
        cache.set(k, fresh);
    }
    cache.set(k, data);
}

function remove(cache, entity, id) {
    const k = `${entity}-${id}`;
    cache.delete(k);
}

module.exports = {
    load,
    save,
    remove,
};
