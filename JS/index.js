const confirmButton = document.querySelector('.main-button');
const continueButton = document.querySelector('.continue-button');

const formContainer = document.querySelector('.form-container');
const successContainer = document.querySelector('.success-container');

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