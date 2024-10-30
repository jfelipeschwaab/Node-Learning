import calculadora from "./calculadora";
function mult(a,b) {
    return a*b;
}

function subt(a,b) {
    return a-b;
}

function div(a,b) {
    return a/b;
}

console.log(calculadora.soma(10,20));
console.log(calculadora.subt(10,20));
console.log(calculadora.div(10,20));
console.log(calculadora.mult(10,20));

console.log(calculadora.minhaCalculadora)