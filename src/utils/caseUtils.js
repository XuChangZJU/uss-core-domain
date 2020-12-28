/**
 * Created by Xc on 2020/12/27.
 */
// 下划线转换驼峰
function toCamel(name) {
    return name.replace(/\_(\w)/g, function(all, letter){
        return letter.toUpperCase();
    });
}
// 驼峰转换下划线
function toLine(name) {
    return name.replace(/([A-Z])/g,"_$1").toLowerCase();
}

module.exports = {
    toCamel,
    toLine,
};
