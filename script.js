class Calculator{
    constructor(prevOperandElement, curOperandElement){
        this.prevOperandElement = prevOperandElement;
        this.curOperandElement = curOperandElement;
        this.clear();
    }

    clear(){
        this.prevOperand = '';
        this.curOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.curOperand = this.curOperand.toString().slice(0, -1);
    }

    chooseOperation(operation){
        if( this.curOperand === '') return;
        if( this.prevOperand !== '') this.compute();
        this.operation = operation;
        this.prevOperand = this.curOperand;
        this.curOperand = '';
    }

    appendNumber(number){
        if( number === '.' && this.curOperand.includes('.') ) return;
        this.curOperand = this.curOperand.toString() + number.toString();
    }

    compute(){
        let computation;
        let prev = parseFloat( this.prevOperand );
        let cur = parseFloat( this.curOperand );
        switch( this.operation ){
            case '+':
                computation = prev + cur;
                break;
            case '-':
                computation = prev - cur;
                break;
            case '%':
                computation = prev / cur;
                break;
            case '*':
                computation = prev * cur;
                break;
            default: return;
        }

        this.curOperand = computation;
        this.operation = undefined;
        this.prevOperand = '';

    }

    updateDisplay(){
        this.curOperandElement.innerText = this.curOperand;
        this.prevOperandElement.innerText = this.prevOperand;
    }


}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const prevOperandElement = document.querySelector('[data-previous-operand]');
const curOperandElement = document.querySelector('[data-current-operand]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');

const calculator = new Calculator(prevOperandElement, curOperandElement);

numberButtons.forEach(button => {
    button.addEventListener('click', ()=> {
        calculator.appendNumber( button.innerText );
        calculator.updateDisplay();
    });
});

operationButtons.forEach( button => {
    button.addEventListener('click', button=> {
        calculator.chooseOperation( button.innerText );

    })
})

allClearButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

