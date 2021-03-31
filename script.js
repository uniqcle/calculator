class Calculator{
    constructor(prevOperandTextElement, curOperandTextElement){
        this.prevOperandTextElement = prevOperandTextElement;
        this.curOperandTextElement = curOperandTextElement;
        this.clear();
    }

    clear(){
        this.prevOperand = '';
        this.curOperand = '';
        this.operation = undefined;
    }

    appendNumber(number){

        this.curOperand = this.curOperand.toString() + number.toString() ;
    }

    updateDisplay(){
        this.curOperandTextElement.innerText = this.curOperand;
    }

    chooseOperation(){

    }

    compute(){

    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const prevOperandTextElement = document.querySelector('[data-previous-operand]');
const curOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(prevOperandTextElement, curOperandTextElement)

numberButtons.forEach( button => {
    button.addEventListener('click', ()=> {
        calculator.appendNumber( button.innerText );
        calculator.updateDisplay();
    })
});

