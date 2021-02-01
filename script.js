let firstNumber;
let secondNumber;
let operand;
let i =0; //indicator for the secondNumber
let clearIndicator =1; //clear the values Indicator
let decimalIndicator =1; //indicator to allow input of decimal
let operandIndicator = 0;

let screen = document.querySelector('#screen p');
screen.textContent="";
let buttons = Array.from(document.querySelectorAll('#buttons div'));

let operatorButton = Array.from(document.querySelectorAll('#buttons .operators'));
operatorButton.forEach(button => button.addEventListener('click', store));


document.querySelector('#equals').addEventListener('click', equals);
document.querySelector('#clear').addEventListener('click', clear);
document.querySelector('#decimal').addEventListener('click', decimal);
document.querySelector('#plusMinus').addEventListener('click', plusMinus);
document.querySelector('#delete').addEventListener('click',backSpace);
document.addEventListener('keydown', inputScreen); //input


function store(e){
    if(operandIndicator ===0){
        clearIndicator =1;
        decimalIndicator = 1;
        operand = e.target.getAttribute('id');
        console.log(operand);
        if(screen.textContent===""){
            firstNumber = 0;
        }
        else {
            firstNumber = parseFloat(screen.textContent);
        }
        operandIndicator = 1;
    }
    else{
        equal();
        clearIndicator =1;
        decimalIndicator = 1;
        operand = e.target.getAttribute('id');
        console.log(operand);
        if(screen.textContent===""){
            firstNumber = 0;
        }
        else {
            firstNumber = parseFloat(screen.textContent);
        }
    }
}


function equals(){
    equal();
    operandIndicator=0;
}

function equal(){
    if (clearIndicator == 1){
    secondNumber = parseFloat(screen.textContent);
    screen.textContent=operate(firstNumber, secondNumber, operand);
    clearIndicator = 0;
    decimalIndicator = 1;
    i=0; 
    }
    else{
    firstNumber = operate(firstNumber, secondNumber, operand);
    screen.textContent=operate(firstNumber, secondNumber, operand);
    i=0;
    }
}


function operate(firstNumber, secondNumber, operand){
    console.log(firstNumber);
    let result;
    switch(operand){
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

function clear(e){
    firstNumber = undefined;
    secondNumber = undefined;
    operand = undefined;
    clearIndicator = 1;
    screen.textContent="";
}

function decimal(e){
    if(decimalIndicator === 1){
    screen.textContent += "."
    decimalIndicator = 0;
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
        console.log(operand);
        if(operand!=undefined){
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
        if(operand!=undefined){
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