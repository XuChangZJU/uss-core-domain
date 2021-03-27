function toFixed(float, precision = 2) {
    const powerValue = Math.pow(10, precision);

    return Math.floor(float * powerValue) / powerValue;
}

module.exports = {
    toFixed,
};
