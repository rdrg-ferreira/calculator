const display = document.querySelector(".display");
const buttonArea = document.querySelector(".button-area");

const numbers = {"zero": 0, "one": 1,
                "two": 2, "three": 3,
                "four": 4, "five": 5,
                "six": 6, "seven": 7,
                "eight": 8, "nine": 9,
            
                getNum(key) {
                    return numbers[key];
                }};

const operations = {"add": "+", "subtract": "-",
                    "multiply": "*", "divide": "/", "rest": "%",

                    getOperation(key) {
                        return operations[key];
                    }};

const operatorList = ["+", "-", "*", "/", "%"];

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

function rest(n1, n2) {
    return n1 % n2;
}

function getElementsOnDisplay() {
    const splitDisplay = display.innerText.split("");
    
    let elements = [];
    let operatorIndex = -1;
    for (let i = 0; i < splitDisplay.length; i++) {
        const element = splitDisplay[i];

        if (operatorList.includes(element)) {
            // if the operator is the first element on the display
            // skip it to include it in the first number
            if (i - 1 < 0) {
                continue;
            }

            elements.push(splitDisplay.slice(0, i).join(""));
            operatorIndex = i;
            elements.push(splitDisplay[i]);
            break;
        }
    }

    // push the last number into the nums array if it exists
    if (splitDisplay.length > operatorIndex + 1) {
        elements.push(splitDisplay.slice(operatorIndex + 1).join(""));
    }

    return elements.map((element) => {
        return operatorList.includes(element) ? element : parseInt(element);
    });
}

function getOperatorCount() {
    const splitDisplay = display.innerText.split("");

    let count = 0;
    splitDisplay.forEach((element) => {
        if (operatorList.includes(element)) count++;
    });

    return count;
}

function isLastElementAnOperator() {
    const splitDisplay = display.innerText.split("");
    return operatorList.includes(splitDisplay[splitDisplay.length - 1]);
}

function operate() {
    // index 0 and 2 are the numbers and index 1 is the operator
    const elementList = getElementsOnDisplay();
    
    let result = 0;
    switch (elementList[1]) {
        case "+":
            result = add(elementList[0], elementList[2]);
            break;
        
        case "-":
            result = subtract(elementList[0], elementList[2]);
            break;

        case "*":
            result = multiply(elementList[0], elementList[2]);
            break;

        case "/":
            result = divide(elementList[0], elementList[2]);
            break;

        case "%":
            result = rest(elementList[0], elementList[2]);
            break;
    }

    showOnDisplay(result, true);
}

function createButtons() {
    buttonArea.addEventListener("click", (e) => {
        const button = e.target;

        if (numbers.getNum(button.id) !== undefined) {
            showOnDisplay(numbers.getNum(button.id));
        }

        else if (operations.getOperation(button.id) !== undefined) {
            if (getElementsOnDisplay().length === 3) {
                operate();
                showOnDisplay(operations.getOperation(button.id));
            }

            else if (getOperatorCount() < 2 && !isLastElementAnOperator()) {
                showOnDisplay(operations.getOperation(button.id));
            }
        }

        else if (button.id === "clear") {
            clearDisplay();
        }

        else if (button.id === "equal") {
            if (getElementsOnDisplay().length === 3) {
                operate();
            }
        }
    });
}

function showOnDisplay(element, result = false) {
    if (display.innerText === "Can't divide by zero") clearDisplay();

    if (result) {
        display.innerText = element;
    } else {
        display.innerText += element;
    }
}

function clearDisplay() {
    display.innerText = "";
}

createButtons();