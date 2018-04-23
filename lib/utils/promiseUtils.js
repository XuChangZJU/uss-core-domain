"use strict";

/**
 * Created by Administrator on 2017/2/16.
 */
Promise.every = function (promises) {
    var result = promises.map(function () {
        return false;
    });
    var promises2 = promises.map(function (ele, idx) {
        return ele.then(function (res) {
            result[idx] = true;
            return Promise.resolve(res);
        }).catch(function (err) {
            return Promise.resolve(err);
        });
    });

    return Promise.all(promises2).then(function (res) {
        var failure = result.findIndex(function (ele) {
            return ele === false;
        });
        if (failure !== -1) {
            throw res[failure];
        }
        return Promise.resolve(res);
    });
};

Promise.oneByOne = function (promises) {
    var result = [];
    function iterator(idx) {
        if (idx === promises.length) {
            return Promise.resolve(result);
        }
        return promises[idx]().then(function (r) {
            result.push(r);
            return iterator(idx + 1);
        });
    }
    return iterator(0);
};