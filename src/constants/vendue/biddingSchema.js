const ErrorCode = require('../errorCode');

const type = Object.assign({}, {
    sequentiallyIncreasing: 1,
    increasingBy258: 2,
});

const STRINGS_OF_ORIGINS = {
    [type.sequentiallyIncreasing]: "顺序递增",
    [type.increasingBy258]: "258拍",
};

function decodeType(o) {
    return STRINGS_OF_ORIGINS[o];
}

function getBS({ price, biddingSchema }){
    let b;
    for (let i = 0; i < biddingSchema.length; i++){
        if( biddingSchema[i].min<= price && biddingSchema[i].max > price){
           b = biddingSchema[i];
           break;
        }
    }
    return b;
}

function getChangedPrice(params){
    const FN = {
        [type.increasingBy258]: ({myPrice, add}) => {
            const secondPos = [-2, 0, 2, 5, 8, 10];
            const myPrice2 = Math.floor(myPrice);
            let myPrice1 = myPrice2.toString();
            if(/^10{2,}$/.test(myPrice)){
                let ans = '98';
                for (let i = 0; i < myPrice1.length -3; i ++){
                    ans += '0';
                }
                return parseInt(ans);
            }
            if ((myPrice1.length < 2) || (myPrice === 10 && add === -1)) {
                return 10;
            }
            let posJudge = Math.floor((parseInt(myPrice1[1])-2)/3)+2;
            const tailNum = myPrice1.substr(2);
            if(parseInt(tailNum)>0 && add < 0){
                posJudge++;
            }
            let basic = 1;
            for (let i = 0; i < myPrice1.length-2; i++){
                basic *= 10;
            }
            return (parseInt(myPrice1[0])*10 + secondPos[posJudge+add])*basic;
        },
        [type.sequentiallyIncreasing]: ({myPrice, step, add}) => {
            if(myPrice + step * add < 0){
                return 0;
            }
            return myPrice + step * add;
        }
    }
    return FN[params.type](params);
}
module.exports = {
    type,
    decodeType,
    getBS,
    getChangedPrice,
};

