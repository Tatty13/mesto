const formsConfig = {
  editProfile: {
    formSelector: '.form_type_edit-profile',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_disabled',
    inputErrorClassPrefix: '-input-error',
    errorClass: 'form__input-error_active'
  },

  addCard: {
    formSelector: '.form_type_add-card',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_disabled',
    inputErrorClassPrefix: '-input-error',
    errorClass: 'form__input-error_active'
  }
}


// Если потребуется в функции enableValidation навесить валидацию сразу на все формы
/*
const formsConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClassPrefix: '-input-error',
  errorClass: 'form__input-error_active'
}
*/


export default formsConfig;