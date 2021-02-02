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
let buttons = Array.from(document.querySelectorAll('#buttons div'));

screen.textContent="";
equation.textContent="";

operatorButton.forEach(button => button.addEventListener('click', store));
document.querySelector('#equals').addEventListener('click', equals);
document.querySelector('#clear').addEventListener('click', clear);
document.querySelector('#decimal').addEventListener('click', decimal);
document.querySelector('#plusMinus').addEventListener('click', plusMinus);
document.querySelector('#delete').addEventListener('click',backSpace);
document.addEventListener('keydown', inputScreen); 


function operatorStore(e){
        clearIndicator =1;
        decimalIndicator = 1;
        operator = e.target.getAttribute('id');
        if(screen.textContent===""){
            firstNumber = 0;
        }
        else {
            firstNumber = parseFloat(screen.textContent);
        }
        operatorIndicator = 1;
}

function store(e){
    if(operatorIndicator ===0){
        operatorStore(e)
        operatorIndicator = 1;
    }
    else{
        equal();
        operatorStore(e);
    }
}

//function when operator act as an equal operator ex. 12 + 7 - 5 * 3 =
function equal(){
    if(firstNumber === undefined) return;
    if (clearIndicator == 1){
    secondNumber = parseFloat(screen.textContent);
    screen.textContent=operate(firstNumber, secondNumber, operator);
    clearIndicator = 0;
    decimalIndicator = 1;
    i=0; 
    }
    else{
    firstNumber = operate(firstNumber, secondNumber, operator);
    screen.textContent=operate(firstNumber, secondNumber, operator);
    i=0;
    }
    equation.textContent=`${firstNumber} ${convertOperator(operator)} ${secondNumber} =`;
}

//function when equals button is pressed
function equals(){
    equal();
    operatorIndicator=0;
}

function clear(e){
    firstNumber = undefined;
    secondNumber = undefined;
    operator = undefined;
    clearIndicator = 1;
    screen.textContent="";
    equation.textContent="";
}

function decimal(e){
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
    screen.textContent = parseFloat(screen.textContent)*-1;
}

function backSpace(e){
    let array = screen.textContent.split("")
    if (array.length >0){
        array.pop();
        screen.textContent = array.join("");
    }
    else return;
}

function operate(firstNumber, secondNumber, operator){
    console.log(firstNumber);
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
    if(Math.round((a/b)*100000)/100000 === Infinity){
        alert('Error');
        clear();
    }
    else return Math.round((a/b)*100000)/100000;
}

function convertOperator(operator) {
    if (operator === "division") return "÷";
    if (operator  === "multiply") return "×";
    if (operator  === "subtract") return "−";
    if (operator  === "add") return "+";
  }

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
        console.log(operator);
        if(operator!=undefined){
            switch(i){
                case 0:
                    screen.textContent = "";
                    screen.textContent += e.target.getAttribute('data-number');
                    i += 1;
                    break;
                case 1:
                    screen.textContent += e.target.getAttribute('data-number');
                    break;
            }
        }
        else{
            screen.textContent += e.target.getAttribute('data-number');
        }
    }
}

buttons.forEach(buttons => buttons.addEventListener('transitionend', removeTransition));

function removeTransition(e){
    if (e.propertyName !== 'transform') return;
    else{
        let typeButton = e.target.getAttribute("class");
        if (typeButton.includes('others')){
            e.target.classList.remove('selectedOthers');
        }
        else if (typeButton.includes('operators') || typeButton.includes('equals')){
            e.target.classList.remove('selectedOperators');
        }
        else if (typeButton.includes('numbers')){
            e.target.classList.remove('selectedNumbers');
        }
        else if(typeButton.includes('decimal')){
            e.target.classList.remove('selectedNumbers');
    }
    }
}

function inputScreen(e){
    let x=e.which||e.keyCode;
    if ((x >= 48 && x <= 57) || (x >= 96 && x <= 105)) { 
        console.log(String.fromCharCode(x));
        let y = String.fromCharCode(x);
        document.querySelector(`div[data-number="${y}"]`).classList.add('selectedNumbers');
        if(operator!=undefined){
            switch(i){
                case 0:
                    screen.textContent = "";
                    screen.textContent += y;
                    i += 1;
                    break;
                case 1:
                    screen.textContent += y;
                    break;
            }
        }
        else{
            screen.textContent += y;
        }
      }
if(x===27){
    clear();
}
}

