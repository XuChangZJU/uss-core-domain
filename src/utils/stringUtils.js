/**
 * Created by Administrator on 2016/4/13.
 */

/**
 * 模板字符串 使用 定义const NotFilled = template`${0}未填写`; 调用NotFilled('姓名') 等于姓名未填写
 * @param strings
 * @param keys
 * @returns {function(...[*]): string}
 */
function template(strings, ...keys) {
    return (function (...values) {
        const dict = values[values.length - 1] || {};
        const result = [strings[0]];
        keys.forEach((key, i) => {
            const value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    });
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
function random(len = 32) {
    const DICT = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　const maxPos = DICT.length;
　　let pwd = '';
　　for (let i = 0; i < len; i++) {
　　　　pwd += DICT.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}



module.exports = {
    template,
    checkMobile,
    random,
}
