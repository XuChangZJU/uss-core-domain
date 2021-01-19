const {
    action,
    decodeAction,
} = require('./common');

const type = Object.assign({}, {
    singleChoice: 1,
    multipleChoice: 2,
    fillBlank: 3,
});


const decodeType = (t) => {
    const T = {
        [type.singleChoice]: '单项选择',
        [type.multipleChoice]: '多项选择',
        [type.fillBlank]: '填空'
    };
    return T[t];
};


const ageGroup = {
    1: {
        max: 6,
        min: 0,
    },
    2: {
        max: 12,
        min: 7,
    },
    3: {
        max: 13,
        min: 18,
    },
    4: {
        max: 60,
        min: 19,
    },
    5: {
        max: 999,
        min: 61,
    },
};

const ageToAgeGroup = (a) => {
    let i = 1;
    let ans;
    while(ageGroup[i] && !ans){
        if(ageGroup[i].min <= a && ageGroup[i].max >= a){
            ans = i;
        }
        i ++;
    }
    return ans || 5;
};

module.exports = {
    type,
    decodeType,
    action,
    decodeAction,
    ageGroup,
    ageToAgeGroup,
};
