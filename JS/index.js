const formulario = document.querySelector('.form-container');

//Botones
const confirmButton = document.querySelector('.main-button');
const continueButton = document.querySelector('#continue-button');

//Contenedores principales
const formContainer = document.querySelector('.form-container');
const successContainer = document.querySelector('.success-container');

const everyInput = document.querySelectorAll('.form-container__input')
const expresiones = {
    name: /^[a-zA-Z\ ]{2,30}$/, //letras, espacios
    number: /^3[47][0-9]{13}$/,
    month: /^[1-12]$/,
}


//corregir y agregar una clase individual para cada etiquta P de error
function validarFormulario(e) {
    switch(e.target.name) {
        case "card-holder":
            validarCampo('name-card', expresiones.name, e.target);
        break;
        case "card-number":
            validarCampo('number-card', expresiones.name, e.target);
        break;
        case "card-month":
            validarCampo('date-month', expresiones.month, e.target);
        break;
        case "card-year":
            validarCampo('number-card', expresiones.name, e.target);
        break;
        case "card-cvc":
            validarCampo('number-card', expresiones.name, e.target);
        break;
    }
};

function validarCampo(className, expresion, input) {
    if(expresion.test(input.value)) {
        document.getElementById(className).classList.remove('form-container__error-format');
        document.getElementById(className).classList.add('form-container__input-correct');
        document.querySelector('.form-container__container__errortext').classList.remove('form-container__container__errortext--activo'); 
    }else {
        document.getElementById(className).classList.add('form-container__error-format');
        document.getElementById(className).classList.remove('form-container__input-correct'); 
        document.querySelector('.form-container__container__errortext').classList.add('form-container__container__errortext--activo'); 
    }
}

everyInput.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

formulario.addEventListener('submit', (e)=> {
    e.preventDefault();
});  

//Formato de tarjeta bancaria
const cleave = new Cleave('.card-number', {
    creditCard: true,
});

//Funcion para actualizar en tiempo real los datos de tarjeta
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

//Funciones para botones
confirmButton.addEventListener('click', () => {
    const isFormInactive = formContainer.classList.contains('inactive');

    if (!isFormInactive) {
        formContainer.classList.add('inactive');
        successContainer.classList.toggle('inactive');
    }
});

continueButton.addEventListener('click', () => {
    document.location.reload();
});

