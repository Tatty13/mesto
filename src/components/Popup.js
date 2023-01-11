class Popup {
  /**
   * @param {string} popupSelector 
   */
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.code === 'Escape')
      this.close();
  }

  // ----------------- version 2 -------------------- //
  // _handleEscClose() {
  //   const closeByEsc = (evt) => {
  //     if (evt.code === 'Escape') {
  //       this.close();
  //       document.removeEventListener('keydown', closeByEsc);
  //     }
  //   }
  //   document.addEventListener('keydown', closeByEsc);
  // }
  // ------------------------------------------------- //

  setEventListeners() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popup || evt.target.classList.contains('popup__close-btn')) {
        this.close();
      }
    })
  }

  open() {
    this._popup.classList.add('popup_open');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    // this._handleEscClose();
  }

  close() {
    this._popup.classList.remove('popup_open');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}

export default Popup;