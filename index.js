let num1 = 0;
let operator = "+";
let num2 = 0;

function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

function operate(operator, n1, n2) {
    switch (operator) {
        case "+":
            add(n1, n2);
            break;
        
        case "-":
            subtract(n1, n2);
            break;

        case "*":
            multiply(n1, n2);
            break;

        case "/":
            divide(n1, n2);
            break;
    }
}