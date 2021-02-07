"use strict";

/**
 * Created by Administrator on 2017/2/16.
 */

/**
 * 每个promise都执行完，若allowFailure为真，则返回结果数组，否则有异常会抛出异常
 * @param {*} promises 
 * @param {*} allowFailure 
 */
Promise.every = async function (promises, allowFailure) {
    var result = promises.map(function () {
        return false;
    });
    var promises2 = promises.map(async function (ele, idx) {
        try {
            result[idx] = await ele;
        } catch (err) {
            result[idx] = err;
        }
    });

    await Promise.all(promises2);
    if (allowFailure) {
        return result;
    }

    var firstFailure = result.find(function (ele) {
        return ele instanceof Error;
    });
    if (firstFailure) {
        throw firstFailure;
    }
    return result;
};

/**
 * 依次执行异步动作
 * @param {*} promises 
 */
Promise.oneByOne = async function (promises) {
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