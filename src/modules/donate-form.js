import { settings } from '../core/constants/settings'

export class DonateForm {
    static textObject = {
        InputLabel: `Введите сумму в ${settings.currency}`
    }
    constructor(totalAmount, createNewDonate) {
        this.totalAmount = totalAmount
        this.createNewDonate = createNewDonate
    }

    updateTotalAmount(newAmount) {
        this.totalAmountHTML.textContent = `${newAmount}${settings.currency}`
    }

    onCreateNewDonateSubmit(event) {
        event.preventDefault()
        const newDonateValue = Number(event.target.amount.value)
        if (newDonateValue && this.createNewDonate) {
            const newDonate = {
                date: new Date(),
                amount: newDonateValue,
            }
            this.createNewDonate(newDonate)
            event.target.amount.value = ''
        }
    }

    render() {
        const formContainer = document.createElement('form')
        formContainer.className = 'donate-form'
        formContainer.addEventListener('submit', this.onCreateNewDonateSubmit.bind(this))

        this.totalAmountHTML = document.createElement('h1')
        this.totalAmountHTML.id = 'total-amount'
        this.updateTotalAmount(this.totalAmount)

        const labelContainer = document.createElement('label')
        labelContainer.textContent = DonateForm.textObject.InputLabel
        labelContainer.className = 'donate-form__input-label'

        const inputDonateForm = document.createElement('input')
        inputDonateForm.className = 'donate-form__donate-input'
        inputDonateForm.name = 'amount'
        inputDonateForm.type = 'number'
        inputDonateForm.max = 100
        inputDonateForm.min = 1
        inputDonateForm.required = ''

        labelContainer.append(inputDonateForm)

        const buttonDonate = document.createElement('button')
        buttonDonate.className = 'donate-form__submit-button'
        buttonDonate.type = 'submit'
        buttonDonate.textContent = 'Задонатить'

        formContainer.append(this.totalAmountHTML, labelContainer, buttonDonate)

        return formContainer
    }
}