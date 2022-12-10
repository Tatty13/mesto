function isInputValid(inputElement) {
  return inputElement.validity.valid;
}

function isFormValid(inputList) {
  return !inputList.some(input => !isInputValid(input));
}


function showInputError(formElement, inputElement, errorMessage, errorClass, inputErrorClassPrefix) {
  const errorElement = formElement.querySelector(`.${inputElement.name}${inputErrorClassPrefix}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, errorClass, inputErrorClassPrefix) {
  const errorElement = formElement.querySelector(`.${inputElement.name}${inputErrorClassPrefix}`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function toggleInputError(formElement, inputElement, errorClass, inputErrorClassPrefix) {
  !isInputValid(inputElement) ? 
  showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClassPrefix) : 
  hideInputError(formElement, inputElement, errorClass, inputErrorClassPrefix);
}


function makeSubmitBtnActive(submitBtnElement, inactiveButtonClass) {
  submitBtnElement.disabled = false;
  submitBtnElement.classList.remove(inactiveButtonClass);
 }
 
 function makeSubmitBtnDisabled(submitBtnElement, inactiveButtonClass) {
  submitBtnElement.disabled = true;
  submitBtnElement.classList.add(inactiveButtonClass);
 }
 
 function toggleSubmitBtnState(submitBtnElement, inactiveButtonClass, inputList) {
   isFormValid(inputList) ? 
     makeSubmitBtnActive(submitBtnElement, inactiveButtonClass) :
     makeSubmitBtnDisabled(submitBtnElement, inactiveButtonClass);
 }


function setEventListeners(formElement, inputList, submitBtnElement, restConfig) {
  const {errorClass, inputErrorClassPrefix, inactiveButtonClass} = restConfig;

  toggleSubmitBtnState(submitBtnElement, inactiveButtonClass, inputList);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleInputError(formElement, inputElement, errorClass, inputErrorClassPrefix);
      toggleSubmitBtnState(submitBtnElement, inactiveButtonClass, inputList);
    });
  });
};


function enableValidation(config) {
  const {formSelector, inputSelector, submitButtonSelector, ...restConfig} = config;
  const formElement = document.querySelector(formSelector);
  const inputList = [...formElement.querySelectorAll(inputSelector)];
  const submitBtnElement = formElement.querySelector(submitButtonSelector);

  formElement.addEventListener('submit', (evt) => evt.preventDefault());
  setEventListeners(formElement, inputList, submitBtnElement, restConfig);
}


//валидацию сразу на все формы
/*
function enableValidation(config) {
  const {formSelector, inputSelector, submitButtonSelector, ...restConfig} = config;

  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach(formElement => {
    const inputList = [...formElement.querySelectorAll(inputSelector)];
    const submitBtnElement = formElement.querySelector(submitButtonSelector);

    formElement.addEventListener('submit', (evt) => evt.preventDefault());
    setEventListeners(formElement, inputList, submitBtnElement, restConfig);
  });
}
enableValidation(formsConfig)
*/

export {makeSubmitBtnDisabled, enableValidation};