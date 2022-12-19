import {userNameElement, userJobElement, inputProfileNameElement, inputJobElement} from './constants.js';
import Card from './card.js';


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

function createCard(cardData, templateSelector, handleCardImgClick) {
  const card = new Card(cardData, templateSelector, handleCardImgClick);
  const cardElem = card.generate();
  return cardElem;
}

function prependCard(card, cardContainer) {
  cardContainer.prepend(card);
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


export {updateProfileInfo, setProfileInfoToTheInputs, getCardData, createCard, prependCard, openPopup, closePopup};