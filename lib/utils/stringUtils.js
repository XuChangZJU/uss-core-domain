'use strict';

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
            var value = Number.isInteger(key) ? values[key] : dict[key];
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

module.exports = {
    template: template,
    checkMobile: checkMobile
};