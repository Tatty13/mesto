import {userNameElement, userJobElement, inputProfileNameElement, inputJobElement} from './constants.js';


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


function clearInputErrors(popupElement, errorClass) {
  const errorElements = popupElement.querySelectorAll(`.${errorClass}`);
  errorElements.forEach(error => error.textContent = '');
}

function handleEscapeKey(evt) {
  if (evt.code !== 'Escape') return;
  const popupElement = document.querySelector('.popup_open');
  closePopup(popupElement);
  clearInputErrors(popupElement, 'form__input-error_active');
}


function openPopup(popupElement) {
  popupElement.classList.add('popup_open');
  document.addEventListener('keydown', handleEscapeKey);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_open');
  document.removeEventListener('keydown', handleEscapeKey);
}


export {updateProfileInfo, setProfileInfoToTheInputs, getCardData, clearInputErrors, prependCard, openPopup, closePopup};