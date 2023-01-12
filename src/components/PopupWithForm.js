import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  /**
   * @param {string} popupSelector
   * @param {function} handleFormSubmit
   */
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputs = [...this._form.querySelectorAll('.form__input')];
  }

  _getInputValues() {
    return this._inputs.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;