"use strict";

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2017/2/16.
 */

/**
 * 每个promise都执行完，formatErrorFn处理单个promise抛出的异常数据
 * @param {*} promises 
 * @param {*} formatErrorFn 
 */
Promise.every = function _callee2(promises, formatErrorFn) {
    var result, promises2, firstFailure;
    return _regenerator2.default.async(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    result = promises.map(function () {
                        return false;
                    });
                    promises2 = promises.map(function _callee(ele, idx) {
                        return _regenerator2.default.async(function _callee$(_context) {
                            while (1) {
                                switch (_context.prev = _context.next) {
                                    case 0:
                                        _context.prev = 0;
                                        _context.next = 3;
                                        return _regenerator2.default.awrap(ele);

                                    case 3:
                                        result[idx] = _context.sent;
                                        _context.next = 9;
                                        break;

                                    case 6:
                                        _context.prev = 6;
                                        _context.t0 = _context["catch"](0);

                                        if (formatErrorFn) {
                                            result[idx] = formatErrorFn(_context.t0);
                                        } else {
                                            result[idx] = _context.t0;
                                        }

                                    case 9:
                                    case "end":
                                        return _context.stop();
                                }
                            }
                        }, null, undefined, [[0, 6]]);
                    });
                    _context2.next = 4;
                    return _regenerator2.default.awrap(_promise2.default.all(promises2));

                case 4:
                    if (!formatErrorFn) {
                        _context2.next = 6;
                        break;
                    }

                    return _context2.abrupt("return", result);

                case 6:
                    firstFailure = result.find(function (ele) {
                        return ele instanceof Error;
                    });

                    if (!firstFailure) {
                        _context2.next = 9;
                        break;
                    }

                    throw firstFailure;

                case 9:
                    return _context2.abrupt("return", result);

                case 10:
                case "end":
                    return _context2.stop();
            }
        }
    }, null, undefined);
};

/**
 * 依次执行异步动作
 * @param {*} promises 
 */
Promise.oneByOne = function _callee3(promises) {
    var result, iterator;
    return _regenerator2.default.async(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    iterator = function iterator(idx) {
                        if (idx === promises.length) {
                            return _promise2.default.resolve(result);
                        }
                        return promises[idx]().then(function (r) {
                            result.push(r);
                            return iterator(idx + 1);
                        });
                    };

                    result = [];
                    return _context3.abrupt("return", iterator(0));

                case 3:
                case "end":
                    return _context3.stop();
            }
        }
    }, null, undefined);
};