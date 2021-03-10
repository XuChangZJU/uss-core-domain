/**
 * Created by Administrator on 2016/11/29.
 */
"use strict";

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assert = require('assert');

function genGetListUrl(api, indexFrom, count, sort, query, extras) {
    var url = '' + api;
    var first = true;
    if (typeof indexFrom === 'number') {
        url += first ? '?' : '&';
        first = false;
        url += 'indexFrom=' + indexFrom;
    }
    if (count > 0 && typeof count === 'number') {
        url += first ? '?' : '&';
        first = false;
        url += 'count=' + count;
    }

    if (sort && (typeof sort === 'undefined' ? 'undefined' : (0, _typeof3.default)(sort)) === 'object') {
        var _sort = (0, _stringify2.default)(sort);
        url += first ? '?' : '&';
        first = false;
        url += 'sort=' + encodeURIComponent(_sort);
    }
    if (query && (typeof query === 'undefined' ? 'undefined' : (0, _typeof3.default)(query)) === 'object') {
        url += first ? '?' : '&';
        first = false;
        var _query = (0, _stringify2.default)(query);
        url += 'query=' + encodeURIComponent(_query).replace(/'/g, '%27'); //encodeURIComponent不会对- _ . ! ~ * ' ( )进行编码
    }
    if (extras && (typeof extras === 'undefined' ? 'undefined' : (0, _typeof3.default)(extras)) === 'object') {
        // for (const item in extras) {
        (0, _keys2.default)(extras).forEach(function (item) {
            if (extras[item]) {
                url += first ? '?' : '&';
                first = false;
                // const _query = JSON.stringify(query);
                url += item + '=' + encodeURIComponent(typeof extras[item] !== "string" ? (0, _stringify2.default)(extras[item]) : extras[item]);
            }
        });
        // }
    }
    return url;
}

function genItemUrl(api, id, extras) {
    assert(api.endsWith(':id'));
    var url = api.replace(':id', id);

    var first = true;
    if (extras && (typeof extras === 'undefined' ? 'undefined' : (0, _typeof3.default)(extras)) === 'object') {
        // for (const item in extras) {
        (0, _keys2.default)(extras).forEach(function (item) {
            if (extras[item]) {
                url += first ? '?' : '&';
                first = false;
                // const _query = JSON.stringify(query);
                url += item + '=' + encodeURIComponent(typeof extras[item] !== "string" ? (0, _stringify2.default)(extras[item]) : extras[item]);
            }
        });
        // }
    }
    return url;
}

function genInitArea(method, body) {
    return {
        method: method,
        headers: {
            'Content-type': 'application/json'
        },
        body: (0, _stringify2.default)(body),
        mode: 'cors'
    };
}

module.exports = {
    genItemUrl: genItemUrl,
    genInitArea: genInitArea,
    genGetListUrl: genGetListUrl
};