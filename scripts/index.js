import {cardsListElement, profileEditBtn, cardAddBtn, 
  popups, 
  profilePopupElement, profileEditFormElement, 
  cardPopupElement, cardFormElement, inputCardNameElement, inputCardLinkElement,
  photoPopupElement, imgElement, imgHeadingElement} from './constants.js';
import {updateProfileInfo, setProfileInfoToTheInputs, getCardData, clearInputErrors, prependCard, openPopup, closePopup} from './utils.js';

import cardsData from './cardsData.js';
import Card from './card.js';
import formsConfig from './formsConfigData.js';
import FormValidator from './formValidator.js';


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

function handleCardImgClick(name, link) {
  imgElement.src = link;
  imgElement.alt = name;
  imgHeadingElement.textContent = name;
  openPopup(photoPopupElement);
}

function handleCardFormSubmit() {
  const cardData = getCardData(inputCardNameElement, inputCardLinkElement);
  const card = new Card(cardData, '.card-template', handleCardImgClick);
  const cardElem = card.generate();
  prependCard(cardElem, cardsListElement);
  closePopup(cardPopupElement);
}


/** create default cards */
cardsData.forEach(data => {
  const card = new Card(data, '.card-template', handleCardImgClick);
  const cardElem = card.generate();
  prependCard(cardElem, cardsListElement)
});


/** enable validation for all forms with '.form' selector */
document.querySelectorAll(formsConfig.formSelector).forEach(form => {
  const formValidator = new FormValidator(formsConfig, form);
  formValidator.enableValidation();
});

/** enable validation for each form separately
 * const profileFormValidator = new FormValidator(formsConfig, profileEditFormElement);
 * profileFormValidator.enableValidation();
 * const cardFormValidator = new FormValidator(formsConfig, cardFormElement);
 * cardFormValidator.enableValidation();
 */


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