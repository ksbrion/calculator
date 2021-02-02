let firstNumber;
let secondNumber;
let operator;
let i =0; //Indicator if screen should be cleared ex. screen should be cleared when typing secondNumber
let clearIndicator =1;  //Indicator for the equals button; such that the operation would repeat when equal button is pressed more than once ex. 1+1 = = = should be equal 4 
let decimalIndicator =1; //Indicator to prevent two or more decimal points;
let operatorIndicator = 0; //Indicator to allow operator button function for several operations ex. 12 + 7 - 5 * 3 = 42
let screen = document.querySelector('#screen #operation');
let equation  = document.querySelector('#screen #equation');
let operatorButton = Array.from(document.querySelectorAll('#buttons .operators'));
let numberButton = Array.from(document.querySelectorAll('#buttons .numbers'));
let buttons = Array.from(document.querySelectorAll('#buttons div'));

screen.textContent="";
equation.textContent="";

operatorButton.forEach(button => button.addEventListener('click', store));
numberButton.forEach(button => button.addEventListener('click', numberSelect));
document.querySelector('#equals').addEventListener('click', equals);
document.querySelector('#clear').addEventListener('click', clear);
document.querySelector('#decimal').addEventListener('click', decimal);
document.querySelector('#plusMinus').addEventListener('click', plusMinus);
document.querySelector('#delete').addEventListener('click',backSpace);
document.addEventListener('keydown', inputScreen); 


function operatorStore(targetOperation){
        clearIndicator =1;
        decimalIndicator = 1;
        operator = targetOperation.getAttribute('id');
        if(screen.textContent===""){
            firstNumber = 0;
        }
        else {
            firstNumber = parseFloat(screen.textContent);
        }
        operatorIndicator = 1;
}

function store(e){
    let targetOperation;
    if(e.type === "click"){
        targetOperation = e.target;
    }
    else if (e.type === "keydown"){
        let y = e.key;
        targetOperation = document.querySelector(`div[data-operator="${y}"]`)
    }
    else return;
    if(operatorIndicator ===0){
        operatorStore(targetOperation)
    }
    else{
        equal();
        operatorStore(targetOperation);
    }
}

//function when operator act as an equal operator ex. 12 + 7 - 5 * 3 =
function equal(){
    if(firstNumber === undefined) return;
    let result;
    operatorButton.forEach(button => button.classList.remove('selectedOperators'));
    
    if (clearIndicator == 1){
        if(operatorIndicator === 0){
            secondNumber= secondNumber;
            firstNumber = parseFloat(screen.textContent);
        }
        else{
        secondNumber = parseFloat(screen.textContent);
        }

        if(Number.isNaN(secondNumber)) return;
        
        result = operate(firstNumber, secondNumber, operator);
            if(Number.isNaN(result) || result === Infinity){
                clear();
                screen.textContent="Error";
            }
            else{
                screen.textContent=result;
                clearIndicator = 0;
                decimalIndicator = 1;
                i=0;
            }
        
    }
    else{
        firstNumber = operate(firstNumber, secondNumber, operator);
        if(Number.isNaN(secondNumber)) return;
        else{
        screen.textContent=operate(firstNumber, secondNumber, operator);
        i=0;
        }
    }
    (screen.textContent==="Error") ? equation.textContent="" : equation.textContent=`${firstNumber} ${convertOperator(operator)} ${secondNumber} =`;
}

//function when equals button is pressed
function equals(){
    equal();
    operatorIndicator=0;
}

function clear(e){
    operatorButton.forEach(button => button.classList.remove('selectedOperators'));
    firstNumber = undefined;
    secondNumber = undefined;
    operator = undefined;
    clearIndicator = 1;
    screen.textContent="";
    equation.textContent="";
    i =0; 
    decimalIndicator =1; 
    operatorIndicator = 0; 
}

function numberSelect(e){
    clearIndicator =1;
    operatorButton.forEach(button => button.classList.remove('selectedOperators'));
    let targetNumber;
    if(e.type === "click"){
        targetNumber = e.target;
        console.log(targetNumber);
    }
    else if (e.type === "keydown"){
        let y = e.key;
        targetNumber = document.querySelector(`div[data-number="${y}"]`)
    }

    if(operator!=undefined){
        switch(i){
            case 0:
                screen.textContent = "";
                screen.textContent += targetNumber.getAttribute('data-number');
                i += 1;
                break;
            case 1:
                screen.textContent += targetNumber.getAttribute('data-number');
                break;
        }
    }
    else{
        screen.textContent += targetNumber.getAttribute('data-number');
    }
}

function decimal(e){
    operatorButton.forEach(button => button.classList.remove('selectedOperators'));
    if(decimalIndicator === 1){
        if(operator!=undefined){
            switch(i){
                case 0:
                    screen.textContent = "0";
                    screen.textContent += '.';
                    i += 1;
                    decimalIndicator = 0;
                    break;
                case 1:
                    screen.textContent += '.';
                    decimalIndicator = 0;
                    break;
            }
        }
        else{
            if(screen.textContent===""){
                screen.textContent += "0."
                decimalIndicator = 0;
            }
            else{
                screen.textContent += "."
                decimalIndicator = 0;
            }
        }


    }
    else return;
}

function plusMinus(e){
    operatorButton.forEach(button => button.classList.remove('selectedOperators'));
    if(screen.textContent===""){
        return;
    }
    else{
    screen.textContent = parseFloat(screen.textContent)*-1;
    }
}

function backSpace(e){
    operatorButton.forEach(button => button.classList.remove('selectedOperators'));
    let array = screen.textContent.split("")
    if (array.length >0){
        array.pop();
        screen.textContent = array.join("");
    }
    else return;
}

function operate(firstNumber, secondNumber, operator){
    let result;
    switch(operator){
        case 'add':
            result = add(firstNumber,secondNumber);
            break;
        case 'subtract':
            result = subtract(firstNumber, secondNumber);
            break;
        case 'multiply':
            result = multiply(firstNumber, secondNumber);
            break;
        case 'division':
            result=division(firstNumber, secondNumber);
    }
    return result;
}

function add(a,b){
    return Math.round((a+b)*100000)/100000;
}

function subtract(a,b){
    return Math.round((a-b)*100000)/100000;
}

function multiply(a,b){
    return Math.round((a*b)*100000)/100000;
}

function division(a,b){
    return Math.round((a/b)*100000)/100000;
}

function convertOperator(operator) {
    if (operator === "division") return "÷";
    if (operator  === "multiply") return "×";
    if (operator  === "subtract") return "−";
    if (operator  === "add") return "+";
  }

//Button animation;
buttons.forEach(buttons => buttons.addEventListener('click', selected));

function selected(e){
    let typeButton = e.target.getAttribute("class");
    if (typeButton.includes('others')){
        e.target.classList.add('selectedOthers');
        
    }
    else if (typeButton.includes('operators') || typeButton.includes('equals')){
        e.target.classList.add('selectedOperators');
    }
    else if (typeButton.includes('numbers')){
        e.target.classList.add('selectedNumbers');
    }
    else if (typeButton.includes('decimal')){
        e.target.classList.add('selectedNumbers');
    }
}

//Button animation;
buttons.forEach(buttons => buttons.addEventListener('transitionend', removeTransition));

function removeTransition(e){
    if (e.propertyName !== 'transform') return;
    else{
        let typeButton = e.target.getAttribute("class");
        if (typeButton.includes('others')){
            e.target.classList.remove('selectedOthers');
        }
        else if (typeButton.includes('equals')){
            e.target.classList.remove('selectedOperators');
        }
        else if (typeButton.includes('numbers')|| typeButton.includes('decimal')){
            e.target.classList.remove('selectedNumbers');
        }
        else if(typeButton.includes('decimal')){
            e.target.classList.remove('selectedNumbers');
    }
    }
}

function inputScreen(e){
    let x=e.which||e.keyCode;
    if (e.key >= 0 && e.key <= 9) { 
        document.querySelector(`div[data-number="${e.key}"]`).classList.add('selectedNumbers');
        operatorButton.forEach(button => button.classList.remove('selectedOperators'));
        numberSelect(e);
      }
    else if(e.key === "Escape"){
        clear();
        document.querySelector(`div[data-others="clear"]`).classList.add('selectedOthers');
        operatorButton.forEach(button => button.classList.remove('selectedOperators'));
    }
    else if(e.key === "Backspace"){
        backSpace();
        document.querySelector(`div[data-others="backspace"]`).classList.add('selectedOthers');
        operatorButton.forEach(button => button.classList.remove('selectedOperators'));
    }
    else if(e.key === "=" || e.key === "Enter"){
        equals();
        document.querySelector(`div[data-operator="="]`).classList.add('selectedOperators');
        operatorButton.forEach(button => button.classList.remove('selectedOperators'));
    }
    else if(e.key ==="*" || e.key==="-" || e.key==="/" || e.key==="+"){
        store(e);
        document.querySelector(`div[data-operator="${e.key}"]`).classList.add('selectedOperators');
    }
    else if(e.key ==="."){
        document.querySelector(`div[data-number="${e.key}"]`).classList.add('selectedNumbers');
        operatorButton.forEach(button => button.classList.remove('selectedOperators'));
        decimal();
    }
}

