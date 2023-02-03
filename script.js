const clearAll = document.querySelector('.clear-all');
const clearEntry = document.querySelector('.clear-entry');
const enterButton = document.querySelector('.enter');
const plusMinus = document.querySelector('.plus-minus');

const addButton = document.querySelector('.add');
const subtractButton = document.querySelector('.subtract');
const multiplyButton = document.querySelector('.multiply');
const divideButton = document.querySelector('.divide');

const display = document.querySelector('.display.main');
const allNumbers = document.querySelectorAll('.number');

let displayCache1 = undefined;
let displayCache2 = undefined; 
let operatorCache = undefined;

let shouldClearDisplay = false;

allNumbers.forEach(number => {
  number.addEventListener('click', () => numtoScreen(number.textContent));
})

clearEntry.addEventListener('click', () => clearDisplay());

clearAll.addEventListener('click', () => {
  clearDisplay();
  displayCache1 = undefined;
  displayCache2 = undefined;
  operatorCache = undefined;
  shouldClearDisplay = false;
})

plusMinus.addEventListener('click', () => {
  if (display.textContent.includes('-')) {
    display.textContent = display.textContent.replace('-', '');
  } else {
    display.textContent = '-' + display.textContent;
  }
})

addButton.addEventListener('click', () => {
  shouldClearDisplay = true;
  if (!operatorCache) {
    operatorCache = 'add';
    displayCache1 = display.textContent;
  } else if (displayCache1 !== undefined) {
    displayCache2 = display.textContent
    let result = operate(operatorCache, displayCache1, displayCache2);
    if (result.toString().length > 11) {
      result = result.toFixed(9).toString().slice(0, 11);
    }
    operatorCache = 'add';
    displayCache1 = result;
    display.textContent = result;
  }
})

subtractButton.addEventListener('click', () => {
  shouldClearDisplay = true;
  if (!operatorCache) {
    operatorCache = 'subtract';
    displayCache1 = display.textContent;
  } else if (displayCache1 !== undefined) {
    displayCache2 = display.textContent
    let result = operate(operatorCache, displayCache1, displayCache2);
    if (result.toString().length > 11) {
      result = result.toFixed(9).toString().slice(0, 11);
    }
    operatorCache = 'subtract';
    displayCache1 = result;
    display.textContent = result;
  }
})

multiplyButton.addEventListener('click', () => {
  shouldClearDisplay = true;
  if (!operatorCache) {
    operatorCache = 'multiply';
    displayCache1 = display.textContent;
  } else if (displayCache1 !== undefined) {
    displayCache2 = display.textContent
    let result = operate(operatorCache, displayCache1, displayCache2);
    if (result.toString().length > 11) {
      result = result.toFixed(9).toString().slice(0, 11);
    }
    operatorCache = 'multiply';
    displayCache1 = result;
    display.textContent = result;
  }
})

divideButton.addEventListener('click', () => {
  shouldClearDisplay = true;
  if (!operatorCache) {
    operatorCache = 'divide';
    displayCache1 = display.textContent;
  } else if (displayCache1 !== undefined) {
    displayCache2 = display.textContent
    let result = operate(operatorCache, displayCache1, displayCache2);
    if (result.toString().length > 11) {
      result = result.toFixed(9).toString().slice(0, 11);
    }
    operatorCache = 'divide';
    displayCache1 = result;
    display.textContent = result;
  }
})

enterButton.addEventListener('click', () => {
  if (displayCache1 && operatorCache) {
    displayCache2 = display.textContent;
    let result = operate(operatorCache, displayCache1, displayCache2);
    if (result.toString().length > 11) {
      result = result.toFixed(9).toString().slice(0, 11);
    }
    operatorCache = undefined;
    displayCache1 = undefined;
    displayCache2 = undefined;
    shouldClearDisplay = true;
    display.textContent = result;
  }
})


function numtoScreen(number) {
  if ((display.textContent === '0' && number !== '.') || shouldClearDisplay) {
    display.textContent = number;
    shouldClearDisplay = false;
  } else if (number === '.' && !display.textContent.includes('.')) {
    display.textContent += number;
  } else if (number !== '.' && display.textContent.length < 11) {
    display.textContent += number;
  }
}

function clearDisplay() {
  display.textContent = '0';
}

// Math functions
function add(num1, num2) {
  return Number.parseFloat(num1) + Number.parseFloat(num2);
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 == 0) return '>:(';
  return num1 / num2;
}

function operate(operator, num1, num2) {
  return operator === 'add' ? add(num1, num2)
  : operator === 'subtract' ? subtract(num1, num2)
  : operator === 'multiply' ? multiply(num1, num2)
  : operator === 'divide' ? divide(num1, num2)
  : 'ERROR';
}