import cardsData from './cardsData.js';
import formsConfig from './formsConfigData.js';
import {makeSubmitBtnDisabled, enableValidation} from './validate.js';


const profileInfoElement = document.querySelector('.profile__info');
const userNameElement = profileInfoElement.querySelector('.profile__name');
const userJobElement = profileInfoElement.querySelector('.profile__desc');

const cardsListElement = document.querySelector('.cards__list');
const cardTemplateItemElement = document.querySelector('.card-template').content.querySelector('.card');

const profileEditBtn = profileInfoElement.querySelector('.profile__edit-btn'); 
const cardAddBtn = document.querySelector('.profile__add-btn'); 

/** -------- all popups --------  */
const popups = document.querySelectorAll('.popup');

/** -------- profile popup -------- */
const profilePopupElement = document.querySelector('.popup_content_edit-profile');
const profileEditFormElement =  profilePopupElement.querySelector('.form_type_edit-profile');
const inputProfileNameElement = profileEditFormElement.querySelector('.form__input_content_name');
const inputJobElement = profileEditFormElement.querySelector('.form__input_content_job');
/* -------- -------------- -------- */

/** -------- add-card popup -------- */
const cardPopupElement = document.querySelector('.popup_content_add-card');
const cardFormElement = cardPopupElement.querySelector('.form_type_add-card');
const inputCardNameElement = cardFormElement.querySelector('.form__input_content_card-name');
const inputCardLinkElement = cardFormElement.querySelector('.form__input_content_card-link');
const cardFormSubmitBtmElement = cardFormElement.querySelector('.form__submit-btn');
/* -------- -------------- -------- */

/** -------- photo-popup -------- */
const photoPopupElement = document.querySelector('.popup_content_photo');
const imgElement = photoPopupElement.querySelector('.popup__img');
const imgHeadingElement  = photoPopupElement.querySelector('.popup__img-heading');
/* -------- -------------- -------- */


function getProfileInfo() {
  const profileInfo = {
    userName: userNameElement.textContent,
    userJob: userJobElement.textContent
  };
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


function toggleLikeBtn(likeBtnElement) {
  likeBtnElement.classList.toggle('card__like-btn_active');
}

function deleteCard(card) {
  card.remove();
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

function closePopup(popupElement) {
  popupElement.classList.remove('popup_open');
  document.removeEventListener('keydown', handleEscapeKey);
}


function getCardData(nameInput, linkInput) { 
  return { 
    name: nameInput.value, 
    link: linkInput.value 
  };   
} 

function createCard(cardData) {
  const cardElement = cardTemplateItemElement.cloneNode(true);
  const cardImgElement = cardElement.querySelector('.card__img');
  cardImgElement.src = cardData.link;
  cardImgElement.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
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


function handleProfileFormSubmit() {
  updateProfileInfo();
  closePopup(profilePopupElement);
}

function handleCardFormSubmit() {
  const card = createCard(getCardData(inputCardNameElement, inputCardLinkElement));
  prependCard(card, cardsListElement);
  closePopup(cardPopupElement);
  makeSubmitBtnDisabled(cardFormSubmitBtmElement, formsConfig.addCard.inactiveButtonClass);
}

/** default cards */
cardsData.forEach(card => prependCard(createCard(card), cardsListElement));

/** call setProfileInfoToTheInputs function to make submit btn in the profile popup active for the first popup opening */
setProfileInfoToTheInputs();
enableValidation(formsConfig.editProfile);
enableValidation(formsConfig.addCard);


profileEditBtn.addEventListener('click', openProfilePopup); 
cardAddBtn.addEventListener('click', openCardPopup); 

profileEditFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

popups.forEach(popupElement => popupElement.addEventListener('click', (evt) => {
  if (evt.target === popupElement || evt.target.classList.contains('popup__close-btn')) closePopup(popupElement);
}));


cardsListElement.addEventListener('click', (evt) => {
  const targetElement = evt.target;

  if (targetElement.classList.contains('card__like-btn')) {
    toggleLikeBtn(targetElement);
    return;
  }

  if (targetElement.classList.contains('card__delete-btn')) {
    const card = targetElement.closest('.card');
    deleteCard(card);
    return;
  }

  if (targetElement.classList.contains('card__img')) {
    openImgPopup(targetElement);
    return;
  }
});