
const s = `
return class A {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    add() {
        const assign = require('lodash/assign');
        return this.a + this.b;
    }
};
`;

const f = new Function('require', s);

/* const ff = new f(2, 3);

console.log(ff.add()); */
console.log(f(require));

const clazz = f(require);
const ff = new clazz(2, 3);
console.log(ff.add());
