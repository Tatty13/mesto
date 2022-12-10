import cardsData from './cardsData.js';
import formsConfig from './formsConfigData.js';
import {makeSubmitBtnDisabled, enableValidation} from './validate.js';


const profileInfoElement = document.querySelector('.profile__info');
const userNameElement = profileInfoElement.querySelector('.profile__name');
const userJobElement = profileInfoElement.querySelector('.profile__desc');

const cardsListElement = document.querySelector('.cards__list');
const cardTemplateItemElement = document.querySelector('.card-template').content.querySelector('.card');

/* -------- profile popup -------- */
const profilePopupElement = document.querySelector('.popup_content_edit-profile');
const profileEditFormElement =  profilePopupElement.querySelector('.form_type_edit-profile');
const inputProfileNameElement = profileEditFormElement.querySelector('.form__input_content_name');
const inputJobElement = profileEditFormElement.querySelector('.form__input_content_job');
/* -------- -------------- -------- */

/* -------- add-card popup -------- */
const cardPopupElement = document.querySelector('.popup_content_add-card');
const cardFormElement = cardPopupElement.querySelector('.form_type_add-card');
const inputCardNameElement = cardFormElement.querySelector('.form__input_content_card-name');
const inputCardLinkElement = cardFormElement.querySelector('.form__input_content_card-link');
const cardFormSubmitBtmElement = cardFormElement.querySelector('.form__submit-btn');
/* -------- -------------- -------- */

/* -------- photo-popup -------- */
const photoPopupElement = document.querySelector('.popup_content_photo');
const imgElement = photoPopupElement.querySelector('.popup__img');
const imgHeadingElement  = photoPopupElement.querySelector('.popup__img-heading');
/* -------- -------------- -------- */


function getProfileInfo() {
  const profileInfo = {};
  profileInfo.userName = userNameElement.textContent;
  profileInfo.userJob = userJobElement.textContent;
  return profileInfo;
}

function updateProfileInfo() {
  const name = inputProfileNameElement.value;
  const job = inputJobElement.value;

  userNameElement.textContent = name;
  userJobElement.textContent = job;
}

function setProfileInfoToTheInputs() {
  const profileInfo = getProfileInfo();
  inputProfileNameElement.value = profileInfo.userName;
  inputJobElement.value = profileInfo.userJob;
}


function toggleLikeBtn(targetElement) {
  targetElement.classList.toggle('card__like-btn_active');
}

function deleteCard(targetElement) {
  targetElement.closest('.card').remove();
}


function setImgInfo(targetImg, targetHeading, currImg) {
  targetImg.src = currImg.src;
  targetImg.alt = currImg.alt;
  targetHeading.textContent = currImg.alt;
}


function handleEscapeKey(evt) {
  if (evt.code !== 'Escape') return;
  const popupElement = document.querySelector('.popup_open');
  closePopup(popupElement);
}


function openPopup(popupElement) {
  popupElement.classList.add('popup_open');
  document.addEventListener('keydown', handleEscapeKey);
}

function closePopup(targetElement) {
  const popupElement = targetElement.closest('.popup');
  popupElement.classList.remove('popup_open');
  document.removeEventListener('keydown', handleEscapeKey);
}


function createCard(cardName, cardLink) {
  const cardElement = cardTemplateItemElement.cloneNode(true);
  const cardImgElement = cardElement.querySelector('.card__img');
  cardImgElement.src = cardLink;
  cardImgElement.alt = cardName;
  cardElement.querySelector('.card__title').textContent = cardName;
  return cardElement;
}

function prependCard(card, cardContainer) {
  cardContainer.prepend(card);
}


function openProfilePopup() {
  setProfileInfoToTheInputs();
  openPopup(profilePopupElement);
}

function openCardPopup() {
  cardFormElement.reset();
  openPopup(cardPopupElement);
}

function openImgPopup(targetElement) {
  setImgInfo(imgElement, imgHeadingElement, targetElement);
  openPopup(photoPopupElement);
}


function handleProfileFormSubmit(evt) {
  updateProfileInfo();
  closePopup(evt.target);
}

function handleCardFormSubmit(evt) {
  const card = createCard(inputCardNameElement.value, inputCardLinkElement.value);
  prependCard(card, cardsListElement);
  closePopup(evt.target);
  cardFormElement.reset();
  makeSubmitBtnDisabled(cardFormSubmitBtmElement, formsConfig.addCard.inactiveButtonClass);
}


/* ----------- default cards ----------- */
cardsData.forEach(card => prependCard(createCard(card.name, card.link), cardsListElement));
/* ----------- ----- ----------- */

setProfileInfoToTheInputs();
enableValidation(formsConfig.editProfile);
enableValidation(formsConfig.addCard);

profileEditFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);


cardsListElement.addEventListener('click', (evt) => {
  const targetElement = evt.target;

  if (targetElement.classList.contains('card__like-btn')) {
    toggleLikeBtn(targetElement);
    return;
  }

  if (targetElement.classList.contains('card__delete-btn')) {
    deleteCard(targetElement);
    return;
  }

  if (targetElement.classList.contains('card__img')) {
    openImgPopup(targetElement);
    return;
  }
})


document.addEventListener('click', (evt) => {
  const targetElement = evt.target;

  if (targetElement.classList.contains('popup__close-btn') || targetElement.classList.contains('popup')) {
    closePopup(targetElement);
    return;
  }

  if (targetElement.classList.contains('profile__edit-btn')) {
    openProfilePopup();
    return;
  }

  if (targetElement.classList.contains('profile__add-btn')) {
    openCardPopup();
    return;
  }
})