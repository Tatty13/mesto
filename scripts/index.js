import {openPopup, closePopup, clearInputErrors} from './utils.js';
import cardsData from './cardsData.js';
import Card from './card.js';
import formsConfig from './formsConfigData.js';
import {enableValidation} from './validate.js';


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
/* -------- -------------- -------- */

/** -------- add-card popup -------- */
const cardPopupElement = document.querySelector('.popup_content_add-card');
const cardFormElement = cardPopupElement.querySelector('.form_type_add-card');
const inputCardNameElement = cardFormElement.querySelector('.form__input_content_card-name');
const inputCardLinkElement = cardFormElement.querySelector('.form__input_content_card-link');
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


function getCardData(nameInput, linkInput) { 
  return { 
    name: nameInput.value, 
    link: linkInput.value 
  };   
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


function handleProfileFormSubmit() {
  updateProfileInfo();
  closePopup(profilePopupElement);
}

function handleCardFormSubmit() {
  const cardData = getCardData(inputCardNameElement, inputCardLinkElement);
  const card = new Card(cardData, '.card-template');
  const cardElem = card.generate();
  prependCard(cardElem, cardsListElement);
  closePopup(cardPopupElement);
}

/** create default cards */
cardsData.forEach(data => {
  const card = new Card(data, '.card-template');
  const cardElem = card.generate();
  prependCard(cardElem, cardsListElement)
});


enableValidation(formsConfig.editProfile);
enableValidation(formsConfig.addCard);


profileEditBtn.addEventListener('click', openProfilePopup); 
cardAddBtn.addEventListener('click', openCardPopup); 

profileEditFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

popups.forEach(popupElement => popupElement.addEventListener('mousedown', (evt) => {
  if (evt.target === popupElement || evt.target.classList.contains('popup__close-btn')) {
    closePopup(popupElement);
    clearInputErrors(popupElement, 'form__input-error_active');
  }
}));