class Popup {
  /**
   * @param {string} popupSelector 
   */
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.code === 'Escape')
      this.close.call(this);
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popup || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    })
  }

  open() {
    const currThis = this;
    this._popup.classList.add('popup_open');
    document.addEventListener('keydown', this._handleEscClose.bind(currThis));
  }

  close() {
    this._popup.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}

export default Popup;