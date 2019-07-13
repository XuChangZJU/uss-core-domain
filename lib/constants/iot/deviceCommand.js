'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2019/6/30.
 */
var state = {
    init: 1,
    success: 10,
    failure: 21,
    givenUp: 101
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.init, '初建'), _defineProperty(_S, state.success, '成功'), _defineProperty(_S, state.failure, '失败'), _defineProperty(_S, state.givenUp, '放弃'), _S);

    return S[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};