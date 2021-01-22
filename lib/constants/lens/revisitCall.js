'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var state = {
    active: 301,
    expired: 401
};

var decodeState = function decodeState(s) {
    var _S;

    var S = (_S = {}, _defineProperty(_S, state.active, '活跃的'), _defineProperty(_S, state.expired, '已过期'), _S);
    return S[s];
};

module.exports = {
    state: state,
    decodeState: decodeState
};