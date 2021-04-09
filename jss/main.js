

const calculator = document.querySelector('.theCalculator');
const theCalcKeys = document.querySelector('.theCalculatorKeys');

const display = document.querySelector('.theCalculatorDisplay');


theCalcKeys.addEventListener('click', e =>{

    if(e.target.matches('button')){

        const theCalcKey = e.target;
        const action = theCalcKey.dataset.attr;

        const keyContent = theCalcKey.textContent;
        const numberDisplay = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType

        Array.from(theCalcKey.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'));

        if(!action){
            console.log('number key!');
            if(numberDisplay === '0' || previousKeyType ==='operator'){
                display.textContent = keyContent;
            }else{
                display.textContent = numberDisplay + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }

        if(action === 'decimal'){
            if(!numberDisplay.includes('.')){
            display.textContent = numberDisplay + '.';
        }else if(previousKeyType === 'operator' ||
          previousKeyType === 'calculate'){
            display.textContent = '0.';
        }
        calculator.dataset.previousKeyType ='decimal';
       }
        if(action === 'add' || 
             action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        
        ){


            const valueOne = calculator.dataset.valueOne
            const  operator = calculator.dataset.operator;
            const valueTwo = numberDisplay;


            if(
                valueOne && 
                operator && 
                previousKeyType !== 'operator' && 
                previousKeyType !== 'calculate'
            ){
                const calculatedVal = calculate(valueOne,operator,valueTwo);
                display.textContent = calculatedVal;
                calculator.dataset.valueOne = calculatedVal;
            }else{
                calculator.dataset.valueOne = numberDisplay;
            }
            console.log('operator key!');
            theCalcKey.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
           
        
        }

      
        if(action === 'clear'){
            console.log('clear key!');
            if(theCalcKey.textContent === 'CLS'){
                calculator.dataset.valueOne = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = '';

            }else{
                theCalcKey.textContent ='CLS';
            }
            display.textContent = 0;
            calculator.dataset.previousKeyType = 'clear';
        }

        if(action !=='clear'){
            const clrButton = calculator.querySelector('[data-attr=clear]');
            clrButton.textContent = 'CE';
        }
        if(action === 'calculate'){
           let valueOne = calculator.dataset.valueOne;
           const operator = calculator.dataset.operator;
           let valueTwo = numberDisplay;
            
            if(valueOne){
                if(previousKeyType === 'calculate'){
                    valueOne = numberDisplay;
                    valueTwo = calculator.dataset.modValue;
                }

                display.textContent = calculate(valueOne,operator,valueTwo);
            }

           calculator.dataset.modValue = valueTwo;
           calculator.dataset.previousKeyType = 'calculate';
        }

       
    }
});


const calculate = (number1,operator, number2) =>{
    let result = '';
    if(operator === 'add'){
        result = parseFloat(number1) + parseFloat(number2);

    }else if(operator === 'subtract'){
        result = parseFloat(number1) - parseFloat(number2);
    }else if(operator === 'multiply'){
        result = parseFloat(number1) * parseFloat(number2);
    }else if(operator === 'divide'){
        result = parseFloat(number1) / parseFloat(number2);
    }
    return result;
}
