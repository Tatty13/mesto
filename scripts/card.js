import {photoPopupElement, imgElement, imgHeadingElement} from './constants.js';
import {openPopup} from './utils.js';

class Card {
  constructor(data, templateSelector) {
    this._templateSelector = templateSelector; //'.card-template'
    this._link = data.link;
    this._name = data.name;
  }

  _getElement() {
    return document.querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);
  }

  _toggleLikeBtn(likeBtnElement) {
    likeBtnElement.classList.toggle('card__like-btn_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _setImgInfo(targetImg, targetHeading, currImg) {
    targetImg.src = currImg.src;
    targetImg.alt = currImg.alt;
    targetHeading.textContent = currImg.alt;
  }

  _openImgPopup(targetElement) {
    this._setImgInfo(imgElement, imgHeadingElement, targetElement);
    openPopup(photoPopupElement);
  }

  _setEventListaners() {
    this._cardImgElement.addEventListener('click', () => this._openImgPopup(this._cardImgElement));

    const likeBtn = this._element.querySelector('.card__like-btn');
    likeBtn.addEventListener('click', () => this._toggleLikeBtn(likeBtn));

    const deleteBtn = this._element.querySelector('.card__delete-btn');
    deleteBtn.addEventListener('click', () => this._deleteCard());
  }


  generate() {
    this._element = this._getElement();

    this._cardImgElement = this._element.querySelector('.card__img');
    this._cardImgElement.src = this._link;
    this._cardImgElement.alt = this._name;

    this._element.querySelector('.card__title').textContent = this._name;

    this._setEventListaners();
    return this._element;
  }
}

export default Card;