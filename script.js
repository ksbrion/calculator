let firstNumber;
let secondNumber;
let screen = document.querySelector('#screen #operation');
let equation  = document.querySelector('#screen #equation');
let text = "0";
let operator = "";
let equalActive = false;
let operatorActive = false;
screen.textContent=text;
equation.textContent="";


//Keydown Events
document.addEventListener('keydown', inputEvent); 

//Click Events
let buttons = Array.from(document.querySelectorAll('#buttons'));
let operatorButton = Array.from(document.querySelectorAll('#buttons .operators'));
buttons.forEach(button => button.addEventListener('click', inputEvent));
buttons.forEach(button => button.addEventListener('transitionend', removeTransition));
document.querySelector('#plusMinus').addEventListener('click', plusMinus);
document.querySelector('#delete').addEventListener('click',backSpace);


function inputEvent(e){
let x = e.key || e.target.getAttribute('data-key');
        if ((x >= 0 && x <= 9) || x ===".") { 
            document.querySelector(`div[data-key="${x}"]`).classList.add('selectedNumbers');
            operatorButton.forEach(button => button.classList.remove('selectedOperators'));

            screen.textContent = textAppend(x);
            if(firstNumber != undefined){
                operatorActive = true;
            }
          }
        else if(x === "Escape"){
            document.querySelector(`div[data-key="${x}"]`).classList.add('selectedOthers');
            operatorButton.forEach(button => button.classList.remove('selectedOperators'));

            clear();
        }
        else if(x === "Backspace"){
            document.querySelector(`div[data-key="${x}"]`).classList.add('selectedOthers');
            operatorButton.forEach(button => button.classList.remove('selectedOperators'));

            backSpace();
        }
        else if(x=== "=" || x=== "Enter"){
            x ="Enter";
            document.querySelector(`div[data-key="${x}"]`).classList.add('selectedEquals');
            operatorButton.forEach(button => button.classList.remove('selectedOperators'));

            operatorActive = false;
            text = "0";
            if(equalActive){
                firstNumber = parseFloat(screen.textContent.replace(/,/g, ''));
            }
            else{
                secondNumber = parseFloat(screen.textContent.replace(/,/g, ''));
                equalActive = true;
            }
            result = operate(firstNumber, secondNumber, operator);
            screen.textContent = textAppend(result);
            text = "0";
        }
        else if(x ==="*" || x==="-" || x==="/" || x==="+"){
            operatorButton.forEach(button => button.classList.remove('selectedOperators'));
            document.querySelector(`div[data-key="${x}"]`).classList.add('selectedOperators');

            equalActive = false;
            operator = x;
            text = "0";
            if(operatorActive){
                secondNumber = parseFloat(screen.textContent.replace(/,/g, ''));
                result = operate(firstNumber, secondNumber, operator);
                firstNumber = result;
                screen.textContent = textAppend(result);
                text = "0";
            }
            else{
                firstNumber = parseFloat(screen.textContent.replace(/,/g, ''));
                // operatorActive = true;
            }
        }
    }

function textAppend(x){
    switch(x){
        case ".":
            if(text.includes(".")){
                text += "";
            }
            else{
                text += ".";
            }
            break;
        default:
                if (text === "0"){
                    text = "";
                    text = x;
                }
                else{
                    text += x;
                }
            break;
    }
    var parts = text.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

function operate(firstNumber, secondNumber, operator){
if(firstNumber === undefined || secondNumber === undefined || operator === "") return;

    let result;
    switch(operator){
        case '+':
            result = add(firstNumber,secondNumber);
            break;
        case '-':
            result = subtract(firstNumber, secondNumber);
            break;
        case '*':
            result = multiply(firstNumber, secondNumber);
            break;
        case '/':
            result=division(firstNumber, secondNumber);
    }
    operatorActive = false;
    if(Number.isNaN(result) || result === Infinity){
        clear();
        equation.textContent="";
        return "Error";
    }
    else{
        equation.textContent=`${firstNumber} ${operator} ${secondNumber} =`;
        return result
        
    }
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

function removeTransition(e){
    if (e.propertyName !== 'transform') return;
    else{
        let typeButton = e.target.getAttribute("class");
        if (typeButton.includes('others')){
            e.target.classList.remove('selectedOthers');
        }
        else if (typeButton.includes('numbers')|| typeButton.includes('decimal')){
            e.target.classList.remove('selectedNumbers');
        }
        else if(typeButton.includes('decimal')){
            e.target.classList.remove('selectedNumbers');
        }
        else if(typeButton.includes('equals')){
        e.target.classList.remove('selectedEquals');
        }
    }
}

function clear(e){
    text="0";
    screen.textContent="0";
    equation.textContent="";
    operatorActive = false;
    equalActive = false;
    firstNumber = undefined;
    secondNumber =undefined;
}

function plusMinus(e){
    operatorButton.forEach(button => button.classList.remove('selectedOperators'));
    if(screen.textContent===""){
        return;
    }
    else{
    screen.textContent = parseFloat(screen.textContent)*-1;
    text = screen.textContent;
    }
}

function backSpace(e){
    operatorButton.forEach(button => button.classList.remove('selectedOperators'));
    let array = screen.textContent.split("")
    if (array.length >0){
        array.pop();
        screen.textContent = array.join("");
        text=screen.textContent;
    }
    else return;
}



