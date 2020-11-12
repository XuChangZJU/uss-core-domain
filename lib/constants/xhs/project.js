'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Created by Xc on 2020/9/26.
 */

var pick = require('lodash/pick');
var assign = require('lodash/assign');

var _require = require('../action'),
    CommonAction = _require.action,
    decodeCommonAction = _require.decodeAction;

var action = assign(pick(CommonAction, ['create', 'update', 'remove']), {
    try: 101,
    share: 102
});

var decodeAction = function decodeAction(a) {
    var _T;

    var T = (_T = {}, _defineProperty(_T, action.try, '试用'), _defineProperty(_T, action.share, '分享'), _T);

    return T[a] || decodeCommonAction(a);
};

var type = {
    app: 1,
    mp: 2,
    web: 3,
    public: 4
};

var decodeType = function decodeType(t) {
    var _T2;

    var T = (_T2 = {}, _defineProperty(_T2, type.app, 'App'), _defineProperty(_T2, type.mp, '小程序'), _defineProperty(_T2, type.web, '网页'), _defineProperty(_T2, type.public, '公众号'), _T2);

    return T[t];
};

module.exports = {
    action: action,
    decodeAction: decodeAction,
    type: type,
    decodeType: decodeType
};