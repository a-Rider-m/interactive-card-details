const formulario = document.querySelector('.form-container');

//Botones
const confirmButton = document.querySelector('.main-button');
const continueButton = document.querySelector('#continue-button');

//Contenedores principales
const formContainer = document.querySelector('.form-container');
const successContainer = document.querySelector('.success-container');

const everyInput = document.querySelectorAll('.form-container__input')
const expresiones = {
    name: /^[A-Za-zÁ-Úá-úüÜñÑ]+(?:\s[A-Za-zÁ-Úá-úüÜñÑ]+)*$/, 
    number: /^\d(?:\s?\d){15}$/,
    month: /^(0[1-9]|1[0-2])$/,
    year: /^\d{2}$/,
    cvc: /^\d{3}$/
}


//corregir y agregar una clase individual para cada etiquta P de error
function validarFormulario(e) {
    switch(e.target.name) {
        case "card-holder":
            validarCampo('name-card', "name", expresiones.name, e.target);
        break;
        case "card-number":
            validarCampo('number-card', "number", expresiones.number, e.target);
        break;
        case "card-month":
            validarCampo('date-month', "date", expresiones.month, e.target);
        break;
        case "card-year":
            validarCampo('date-year', "", expresiones.year, e.target);
        break;
        case "card-cvc":
            validarCampo('segurity-code', "cvc", expresiones.cvc, e.target);
        break;
    }
};

function validarCampo(idName, className, expresion, input) {
    if(expresion.test(input.value)) {
        document.getElementById(idName).classList.remove('form-container__error-format');
        document.getElementById(idName).classList.add('form-container__input-correct');
        document.querySelector(`.error-text--${className}`).classList.remove('error-text--active'); 
    }else {
        document.getElementById(idName).classList.add('form-container__error-format');
        document.getElementById(idName).classList.remove('form-container__input-correct'); 
        document.querySelector(`.error-text--${className}`).classList.add('error-text--active'); 
    }
}

everyInput.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

formulario.addEventListener('submit', (e)=> {
    e.preventDefault();

    let formValido = true;
    let mensaje = "";

    everyInput.forEach((input) => {
        if(!input.value) {
            formValido = false;
            mensaje += "Por favor, completar el campo " + input.name + "\n";
        } else if (input.classList.contains('form-container__error-format')) {
            formValido = false;
            mensaje += "Por favor, corregir el campo " + input.name + "\n";
        }
    });

    if(!formValido) {
        alert(mensaje);
    }else {
        exitoFormulario();
    }

});  

//Formato de tarjeta bancaria
const cleave = new Cleave('.card-number', {
    creditCard: true,
});

//Funcion para actualizar en tiempo real los datos de tarjeta
function updateCardInfo (inputSelector, outPutSelector, defaulText) {
    const input = document.querySelector(inputSelector);
    const outPutCard = document.querySelector(outPutSelector);

    input.addEventListener('input', () => {
        outPutCard.innerText = input.value;
    
        if(input.value.length === 0) {
            outPutCard.innerText = defaulText;
        }
    });
}

updateCardInfo('.card-holder-name', '.card-container__name', "Jane appleseed");
updateCardInfo('.card-number', '.card-container__number', "0000 0000 0000 0000");
updateCardInfo('.input-month', '.card-container__month', "00");
updateCardInfo('.input-year', '.card-container__year', "00");
updateCardInfo('.input-cvc', '.card-container__segurity-code', "000");

function exitoFormulario() {
    const isFormInactive = formContainer.classList.contains('inactive');

    if (!isFormInactive) {
        formContainer.classList.add('inactive');
        successContainer.classList.toggle('inactive');
    }
}

continueButton.addEventListener('click', () => {
    document.location.reload();
});