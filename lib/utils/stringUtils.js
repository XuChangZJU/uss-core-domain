'use strict';

var _isInteger = require('babel-runtime/core-js/number/is-integer');

var _isInteger2 = _interopRequireDefault(_isInteger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Administrator on 2016/4/13.
 */

/**
 * 模板字符串 使用 定义const NotFilled = template`${0}未填写`; 调用NotFilled('姓名') 等于姓名未填写
 * @param strings
 * @param keys
 * @returns {function(...[*]): string}
 */
function template(strings) {
    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        keys[_key - 1] = arguments[_key];
    }

    return function () {
        for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            values[_key2] = arguments[_key2];
        }

        var dict = values[values.length - 1] || {};
        var result = [strings[0]];
        keys.forEach(function (key, i) {
            var value = (0, _isInteger2.default)(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    };
}

function checkMobile(str) {
    var re = /^1\d{10}$/;
    if (re.test(str)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 生成随机字符串
 * @param {长度} len 
 */
function random() {
    var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;

    var DICT = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = DICT.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += DICT.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

module.exports = {
    template: template,
    checkMobile: checkMobile,
    random: random
};