//Botones
const confirmButton = document.querySelector('.main-button');
const continueButton = document.querySelector('#continue-button');

//Contenedores principales
const formContainer = document.querySelector('.form-container');
const successContainer = document.querySelector('.success-container');


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

function updateCardInfo (inputSelector, outPutSelector, defaulText) {
    const inputs = document.querySelector(inputSelector);
    const outPutCard = document.querySelector(outPutSelector);

    inputs.addEventListener('input', () => {
        outPutCard.innerText = inputs.value;
    
        if(inputs.value.length === 0) {
            outPutCard.innerText = defaulText;
        }
    });
}

updateCardInfo('.card-holder-name', '.card-container__name', "Jane appleseed");
updateCardInfo('.card-number', '.card-container__number', "0000 0000 0000 0000");
updateCardInfo('.input-month', '.card-container__month', "00");
updateCardInfo('.input-year', '.card-container__year', "00");
updateCardInfo('.input-cvc', '.card-container__segurity-code', "000");