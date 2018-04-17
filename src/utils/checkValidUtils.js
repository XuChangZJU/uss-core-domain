/**
 * Created by Administrator on 2018/4/17.
 */
function checkConditionThrowString(condition, str) {
    if (!(condition)) {
        throw str;
    }
}

module.exports = {
    checkConditionThrowString,
};
