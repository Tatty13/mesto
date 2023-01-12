import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  /**
   * @param {string} popupSelector 
   */
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__img');
    this._imgTitle = this._popup.querySelector('.popup__img-heading');
  }

  /**
   * @param {string} name - image title
   * @param {string} link - image url
   */
  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._imgTitle.textContent = name;
    super.open();
  }
}

export default PopupWithImage;