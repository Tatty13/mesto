const profileInfoElement = document.querySelector('.profile__info');
const userNameElement = profileInfoElement.querySelector('.profile__name');
const userJobElement = profileInfoElement.querySelector('.profile__desc');

const cardsListElement = document.querySelector('.cards__list');

const profileEditBtn = profileInfoElement.querySelector('.profile__edit-btn'); 
const cardAddBtn = document.querySelector('.profile__add-btn'); 


/** -------- all popups --------  */
const popups = document.querySelectorAll('.popup');


/** -------- profile popup -------- */
const profilePopupElement = document.querySelector('.popup_content_edit-profile');
const profileEditFormElement =  profilePopupElement.querySelector('.form_type_edit-profile');
const inputProfileNameElement = profileEditFormElement.querySelector('.form__input_content_name');
const inputJobElement = profileEditFormElement.querySelector('.form__input_content_job');


/** -------- add-card popup -------- */
const cardPopupElement = document.querySelector('.popup_content_add-card');
const cardFormElement = cardPopupElement.querySelector('.form_type_add-card');
const inputCardNameElement = cardFormElement.querySelector('.form__input_content_card-name');
const inputCardLinkElement = cardFormElement.querySelector('.form__input_content_card-link');


/** -------- photo popup --------  */
const photoPopupElement = document.querySelector('.popup_content_photo');
const imgElement = photoPopupElement.querySelector('.popup__img');
const imgHeadingElement  = photoPopupElement.querySelector('.popup__img-heading');


export {userNameElement, userJobElement, 
  cardsListElement, profileEditBtn, cardAddBtn,
  popups,
  profilePopupElement, profileEditFormElement, inputProfileNameElement, inputJobElement,
  cardPopupElement, cardFormElement, inputCardNameElement, inputCardLinkElement,
  photoPopupElement, imgElement, imgHeadingElement};