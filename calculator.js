let runTotal = 0;
let buffer = "0";
let prevOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if (isNaN(value)){
        handleSymbol(value);
    }
    else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symb){
    switch (symb){
        case "C":
            buffer = "0";
            runTotal = 0;
            break;
        case "=":
            if (prevOperator === null){
                return;
            }
            flushOperation(parseInt(buffer));
            buffer = runTotal;
            prevOperator = null;
            runTotal = 0;
            break;
        case '←' :
            if(buffer.length === 1){
                buffer = "0";
            }else{
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case "+":
        case "-":
        case "×":
        case "÷":
            handleMath(symb);
            break;
    }
}

function handleMath(symb){
    if (buffer === "0"){
        return;
    }

    const intBuffer = parseInt(buffer);
    
    if (runTotal === 0){
        runTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }

    prevOperator = symb;

    buffer = "0";
}

function flushOperation(intBuffer){
    switch (prevOperator){
        case "+":
            runTotal += intBuffer;
            break;
        case "-":
            runTotal -= intBuffer;
            break;
        case "×":
            runTotal *= intBuffer;
            break;
        case "÷":
            runTotal /= intBuffer;
            break;
    }
}

function handleNumber(numString){
    if (buffer == "0"){
        buffer = numString;
    }else{
        buffer += numString;
    }
}

function init(){
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event){
        buttonClick (event.target.innerText);
    })
}

init();