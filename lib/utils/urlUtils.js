/**
 * Created by Administrator on 2016/11/29.
 */
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

    if (sort && (typeof sort === 'undefined' ? 'undefined' : _typeof(sort)) === 'object') {
        var _sort = JSON.stringify(sort);
        url += first ? '?' : '&';
        first = false;
        url += 'sort=' + encodeURIComponent(_sort);
    }
    if (query && (typeof query === 'undefined' ? 'undefined' : _typeof(query)) === 'object') {
        url += first ? '?' : '&';
        first = false;
        var _query = JSON.stringify(query);
        url += 'query=' + encodeURIComponent(_query);
        // url += '&query=' + encodeURIComponent(_query);
    }
    if (extras && (typeof extras === 'undefined' ? 'undefined' : _typeof(extras)) === 'object') {
        // for (const item in extras) {
        Object.keys(extras).forEach(function (item) {
            if (extras[item]) {
                url += first ? '?' : '&';
                first = false;
                // const _query = JSON.stringify(query);
                url += item + '=' + encodeURIComponent(typeof extras[item] !== "string" ? JSON.stringify(extras[item]) : extras[item]);
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
    if (extras && (typeof extras === 'undefined' ? 'undefined' : _typeof(extras)) === 'object') {
        // for (const item in extras) {
        Object.keys(extras).forEach(function (item) {
            if (extras[item]) {
                url += first ? '?' : '&';
                first = false;
                // const _query = JSON.stringify(query);
                url += item + '=' + encodeURIComponent(typeof extras[item] !== "string" ? JSON.stringify(extras[item]) : extras[item]);
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
        body: JSON.stringify(body),
        mode: 'cors'
    };
}

module.exports = {
    genItemUrl: genItemUrl,
    genInitArea: genInitArea,
    genGetListUrl: genGetListUrl
};