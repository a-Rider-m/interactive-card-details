const form = document.querySelector('.form-container');

//Botones
const confirmButton = document.querySelector('.main-button');
const continueButton = document.querySelector('#continue-button');

//Contenedores principales
const formContainer = document.querySelector('.form-container');
const successContainer = document.querySelector('.success-container');

const everyInput = document.querySelectorAll('.form-container__input')
const expressions = {
    name: /^[A-Za-zÁ-Úá-úüÜñÑ]+(?:\s[A-Za-zÁ-Úá-úüÜñÑ]+)*$/, 
    cardNumber: /^\d(?:\s?\d){15}$/,
    month: /^(0[1-9]|1[0-2])$/,
    year: /^\d{2}$/,
    cvc: /^\d{3}$/
}

//Formato de tarjeta bancaria
const cleave = new Cleave('.card-number', {
    creditCard: true,
});

function validateForm(e) {
    switch(e.target.name) {
        case "card-holder":
            validateField('name-card', "name", expressions.name, e.target);
        break;
        case "card-number":
            validateField('number-card', "number", expressions.cardNumber, e.target);
        break;
        case "card-month":
            validateField('date-month', "date", expressions.month, e.target);
        break;
        case "card-year":
            validateField('date-year', "", expressions.year, e.target);
        break;
        case "card-cvc":
            validateField('segurity-code', "cvc", expressions.cvc, e.target);
        break;
    }
};

//Validacion de la informacion en cada uno de los campos
function validateField(idName, className, expresion, input) {
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
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
})


//Se verifica que todos los campos sean correctos
form.addEventListener('submit', (e)=> {
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

//Funcion que marca como exitosa la informacion en cada campo
function exitoFormulario() {
    const isFormInactive = formContainer.classList.contains('inactive');

    if (!isFormInactive) {
        formContainer.classList.add('inactive');
        successContainer.classList.toggle('inactive');
    }
}

//Boton que reinicia la pagina
continueButton.addEventListener('click', () => {
    document.location.reload();
});