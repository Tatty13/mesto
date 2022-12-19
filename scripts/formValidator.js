class FormValidator {
  constructor(config, formElement) {
    ({inputSelector: this._inputSelector, 
      submitButtonSelector: this._submitButtonSelector,
      inactiveButtonClass: this._inactiveButtonClass,
      inputErrorClassPrefix: this._inputErrorClassPrefix,
      errorClass: this._errorClass} = config);

    this._formElement = formElement;
  }

  _isInputValid(inputElement) {
    return inputElement.validity.valid;
  }

  _isFormValid() {
    return this._inputList.every(input => this._isInputValid(input));
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}${this._inputErrorClassPrefix}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}${this._inputErrorClassPrefix}`);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _toggleInputError(inputElement) {
    !this._isInputValid(inputElement) ? 
    this._showInputError(inputElement, inputElement.validationMessage) : 
    this._hideInputError(inputElement);
  }

  _makeSubmitBtnActive(submitBtnElement) {
    submitBtnElement.disabled = false;
    submitBtnElement.classList.remove(this._inactiveButtonClass);
   }

  _makeSubmitBtnDisabled(submitBtnElement) {
    submitBtnElement.disabled = true;
    submitBtnElement.classList.add(this._inactiveButtonClass);
  }

  _toggleSubmitBtnState() {
    this._isFormValid() ? 
      this._makeSubmitBtnActive(this._submitBtnElem) :
      this._makeSubmitBtnDisabled(this._submitBtnElem);
  }

  _resetValidation() {
    this._toggleSubmitBtnState();
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
  }

  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => evt.preventDefault());
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => this._resetValidation(), 0)
    })
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleInputError(inputElement);
        this._toggleSubmitBtnState();
      });
    });
  };

  enableValidation() {
    this._inputList =  [...this._formElement.querySelectorAll(this._inputSelector)];
    this._submitBtnElem = this._formElement.querySelector(this._submitButtonSelector);

    this._setEventListeners();
    this._toggleSubmitBtnState();
  }
}

export default FormValidator;