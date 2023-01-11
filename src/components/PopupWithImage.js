import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  /**
   * @param {object} obj 
   * @param {string} obj.name - image title
   * @param {string} obj.link - image url
   * @param {string} popupSelector 
   */
  constructor({name, link}, popupSelector) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._image = this._popup.querySelector('.popup__img');
    this._imgTitle = this._popup.querySelector('.popup__img-heading');
  }

  open() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._imgTitle.textContent = this._name;
    super.open();
  }
}

export default PopupWithImage;