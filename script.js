const buttons = document.querySelectorAll(".btn");
const operatorButton = document.querySelectorAll(".operator-btn");
const clearButton = document.querySelector(".clear-btn");
const deleteButton = document.querySelector(".delete-btn");
const equalsButton = document.querySelector(".equals-btn");
const display = document.getElementById("display");
let shouldResetDisplay = false;


buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if(shouldResetDisplay){
        display.value = '';
        shouldResetDisplay = false;
    }
    display.value += button.innerText;
  });
});
operatorButton.forEach((button) => {
    button.addEventListener("click", () => {
        if (display.value !== '') {
            if (shouldResetDisplay) {
              shouldResetDisplay = false;
            };
        display.value +=button.innerText;
    }
    });
});
clearButton.addEventListener("click", () => {
    display.value = '';
    shouldResetDisplay = false;
   });

deleteButton.addEventListener("click", () => {
    display.value = display.value.slice( 0, -1);
});
equalsButton.addEventListener("click", () => {
    try {
        display.value = operate(display.value);
        shouldResetDisplay = true;
    } catch (error) {
        display.value = "Error"
        shouldResetDisplay = true;
    }  
});

function operate(expression){
    const tokens = expression.match(/(\d+(\.\d+)?|[+\-*/])/g);
    if (!tokens) {
        return 'Error'; 
      }
    
      let total = parseFloat(tokens[0]); 
    
      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextNumber = parseFloat(tokens[i + 1]);
    

        if (isNaN(nextNumber)) {
          return 'Error'; 
        }
    
        switch (operator) {
          case '+':
            total += nextNumber;
            break;
          case '-':
            total -= nextNumber;
            break;
          case '*':
            total *= nextNumber;
            break;
          case '/':
            if (nextNumber === 0) {
              return 'Error'; 
            }
            total /= nextNumber;
            break;
          default:
            return 'Error'; 
        }
      }
      return total; 
    }
