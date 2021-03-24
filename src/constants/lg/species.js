const {
    action,
    decodeAction,
} = require('../action');

const type = {
    standard: 1,
    nonstandard: 2,
}
const decodeType = (t) => {
    const TEXT = {
        [type.standard]: '标准货物',
        [type.nonstandard]: '非标货物',
    }
}
module.exports = {
    action,
    decodeAction,
    type,
    decodeType,
};
