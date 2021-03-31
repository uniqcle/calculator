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
        if( number === '.' && this.curOperand.includes('.')) return
        this.curOperand = this.curOperand.toString() + number.toString() ;
    }

    updateDisplay(){
        this.curOperandTextElement.innerText = this.curOperand;
        this.prevOperandTextElement.innerText = this.prevOperand;
    }

    chooseOperation(operation){
        if( this.curOperand === '' ) return;
        if( this.prevOperand !== '') this.compute();
        this.operation = operation;
        this.prevOperand = this.curOperand;
        this.curOperand = ''
    }

    compute(){
        let computation;
        const prev = parseFloat( this.prevOperand );
        const cur = parseFloat( this.curOperand );
        if( isNaN(prev) || isNaN(cur)) return;
        switch( this.operation ){
            case '+':
                computation = prev + cur;
                break;
            case '-':
                computation = prev - cur;
                break;
            case '*':
                computation = prev * cur;
                break;
            case '%':
                computation = prev / cur;
                break;
            default:
                return;
        }
        this.curOperand = computation;
        this.operation = undefined;
        this.prevOperand = ''
    }

    delete(){
        this.curOperand = this.curOperand.toString().slice(0, -1);
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
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

operationButtons.forEach( button => {
    button.addEventListener('click', ()=> {
        calculator.chooseOperation( button.innerText );
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay()
});

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', ()=> {
    calculator.delete();
    calculator.updateDisplay();
});

