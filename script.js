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
        if( this.prevOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.prevOperand = this.curOperand;
        this.curOperand = '';
    }

    appendNumber(number){
        if( number === '.' && this.curOperand.includes('.') ) return;
        this.curOperand = this.curOperand.toString() + number.toString();
    }

    compute(){
        let computation
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.curOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.curOperand = computation
        this.operation = undefined
        this.prevOperand = ''

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.curOperandElement.innerText =
            this.getDisplayNumber(this.curOperand)
        if (this.operation != null) {
            this.prevOperandElement.innerText =
                `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`
        } else {
            this.prevOperandElement.innerText = ''
        }
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
    button.addEventListener('click', ()=> {
        calculator.chooseOperation( button.innerText );
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', (button)=>{
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', (button) => {
    calculator.delete();
    calculator.updateDisplay();
})


equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})


