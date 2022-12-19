class Card {
  constructor(data, templateSelector, handleCardImgClick) {
    this._templateSelector = templateSelector;
    this._link = data.link;
    this._name = data.name;
    this._handleCardImgClick = handleCardImgClick;
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

  _setEventListaners() {
    this._cardImgElement.addEventListener('click', () => this._handleCardImgClick(this._name, this._link));

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