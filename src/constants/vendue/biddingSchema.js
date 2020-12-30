const ErrorCode = require('../errorCode');

const type = Object.assign({}, {
    sequentiallyIncreasing: 1,
    increasingBy258: 2,
});

const STRINGS_OF_ORIGINS = {
    [type.sequentiallyIncreasing]: "顺序递增",
    [type.increasingBy258]: "2/5/8递增",
};

function decodeType(o) {
    return STRINGS_OF_ORIGINS[o];
}

function getBS(price, biddingSchema, add){
    let b;

    for (let i = 0; i < biddingSchema.length; i++){
        if( biddingSchema[i].min<= price && biddingSchema[i].max > price && add === 1){
           b = biddingSchema[i];
           break;
        }
        if( biddingSchema[i].min< price && biddingSchema[i].max >= price && add === -1){
            b = biddingSchema[i];
            break;
        }
    }
    return b;
}

function getChangedPrice(params){
    const FN = {
        [type.increasingBy258]: ({ price, add }) => {
            const secondPos = [-2, 0, 2, 5, 8, 10];
            const myPrice2 = Math.floor(price);
            let myPrice1 = myPrice2.toString();
            if(/^10{2,}$/.test(price) && add === -1 ){
                let ans = '98';
                for (let i = 0; i < myPrice1.length -3; i ++){
                    ans += '0';
                }
                return parseInt(ans);
            }
            if ((myPrice1.length < 2) || (price === 10 && add === -1)) {
                return 10;
            }
            let posJudge = Math.floor((parseInt(myPrice1[1])-2)/3)+2;
            const tailNum = myPrice1.substr(2);
            if(parseInt(tailNum)>0 && add < 0){
                posJudge++;
            }
            let basic = 1;
            for (let i = 0; i < myPrice1.length - 2; i++){
                basic *= 10;
            }
            return (parseInt(myPrice1[0]) * 10 + secondPos[posJudge + add]) * basic;
        },
        [type.sequentiallyIncreasing]: ({ price, section, add }) => {
            const { step, min, max } = section;
            if((price - min) % step !== 0){
                price = min + (Math.floor((price - min)/step )) * step;
                if(add < 0){
                    add ++;
                }
            }
            if(price + step * add < 0){
                return 0;
            }
            return price + step * add;
        }
    };

    //传入 价格 竞价阶梯
    const { price, biddingSchema, add } = params;
    let section = getBS(price, biddingSchema, add); //价格在竞价阶梯哪一段
    if (!section) {
        if(price >= biddingSchema[biddingSchema.length - 1].max){
            section = biddingSchema[biddingSchema.length - 1];
            return FN[section.type](Object.assign({}, params, { section }));
        }
        if(price <= biddingSchema[0].min){
            section = biddingSchema[0];
            return FN[section.type](Object.assign({}, params, { section }));
        }
        return -1;
    }
    const fn = FN[section.type];
    if (typeof fn !== 'function') {
        return -1;
    }
    const ans =  fn(Object.assign({}, params, { section }));
    if ( ans > section.max ){
        return section.max;
    }
    if ( ans < section.min ){
        return section.min;
    }
    return ans;
}

module.exports = {
    type,
    decodeType,
    getBS,
    getChangedPrice,
};


