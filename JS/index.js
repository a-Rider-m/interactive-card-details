//Botones
const confirmButton = document.querySelector('.main-button');
const continueButton = document.querySelector('#continue-button');

//Contenedores principales
const formContainer = document.querySelector('.form-container');
const successContainer = document.querySelector('.success-container');

//Inputs formulario
const inputName = document.querySelector('.card-holder-name');
const cardName = document.querySelector('.card-container__name');
const inputNumber = document.querySelector('.card-number');
const cardNumber = document.querySelector('.card-container__number');
const inputMonth = document.querySelector('.input-month');
const cardMonth = document.querySelector('.card-container__month');
const inputYear = document.querySelector('.input-year');
const cardYear = document.querySelector('.card-container__year');
const inputCvc = document.querySelector('.input-cvc');
const cardCvc = document.querySelector('.card-container__segurity-code');

const cleave = new Cleave('.card-number', {
    creditCard: true,
});

confirmButton.addEventListener('click', toggleFormInactive);
continueButton.addEventListener('click', refreshSite);

function toggleFormInactive() {
    const isFormInactive = formContainer.classList.contains('inactive');

    if (!isFormInactive) {
        formContainer.classList.add('inactive');
        successContainer.classList.toggle('inactive');
    }
}

function refreshSite() {
    document.location.reload();
}

inputName.addEventListener('input', () => {
    cardName.innerText = inputName.value;

    if(inputName.value.length === 0) {
        cardName.innerText = "Jane Appleseed";
    }
});

inputNumber.addEventListener('input', () => {
    cardNumber.innerText = inputNumber.value;

    if(inputNumber.value.length === 0) {
        cardNumber.innerText = "0000 0000 0000 0000";
    }
});

inputMonth.addEventListener('input', () => {
    cardMonth.innerText = inputMonth.value;

    if(inputMonth.value.length === 0) {
        cardMonth.innerText = "00";
    }
});

inputYear.addEventListener('input', () => {
    cardYear.innerText = inputYear.value;

    if(inputYear.value.length === 0) {
        cardYear.innerText = "00";
    }
});

inputCvc.addEventListener('input', () => {
    cardCvc.innerText = inputCvc.value;

    if(inputCvc.value.length === 0) {
        cardCvc.innerText = "000";
    }
});

