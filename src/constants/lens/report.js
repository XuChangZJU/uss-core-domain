const {
    action,
    decodeAction,
    state,
    decodeState,
} = require('../action');

const { category: tradeCategory } = require('./trade');


const getReportCategoryId  = (c) => {
    const S = {
        [tradeCategory.OkGlassCheck]: 2,
        [tradeCategory.visionTrainingCheck]: 3,
        [tradeCategory.check]: 1,
    };

    return S[c];
};

module.exports = {
    action,
    decodeAction,
    state,
    decodeState,
    getReportCategoryId,
};
