import {profileEditBtn, cardAddBtn, 
  popups, 
  profilePopupElement, profileEditFormElement, 
  cardPopupElement, cardFormElement, inputCardNameElement, inputCardLinkElement,
  photoPopupElement, imgElement, imgHeadingElement} from './constants.js';
import {updateProfileInfo, setProfileInfoToTheInputs, getCardData, createCard, openPopup, closePopup} from './utils.js';

import Section from './Section.js';
import cardsData from './cardsData.js';
import formsConfig from './formsConfigData.js';
import FormValidator from './FormValidator.js';


function openProfilePopup() {
  profileEditFormElement.reset();
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

/**
 * @param {object} cardData
 * @param {string} cardData.link - image url
 * @param {string} cardData.name - image title
 */
function renderCards(cardData) {
  const cardElem = createCard(cardData, '.card-template', handleCardImgClick);
  this.addItem(cardElem);
}

function handleCardFormSubmit() {
  const cardData = getCardData(inputCardNameElement, inputCardLinkElement);
  const cardsSection = new Section({items: [cardData], renderer: renderCards}, '.cards__list');
  cardsSection.renderItems();
  closePopup(cardPopupElement);
}


/** create default cards */
const defaultCards = new Section({items: cardsData, renderer: renderCards}, '.cards__list');
defaultCards.renderItems();


/** enable validation for all forms with '.form' selector when _resetValidation method is private*/
document.querySelectorAll(formsConfig.formSelector).forEach(form => {
  const formValidator = new FormValidator(formsConfig, form);
  formValidator.enableValidation();
});


/** enable validation for all forms with '.form' selector when resetValidation method is public
 * 
const formValidators = {};
function enableValidation(config) {
  const formList = [...document.querySelectorAll(config.formSelector)];
  formList.forEach(form => {
    const formValidator = new FormValidator(config, form);
    const formName = form.name;
    formValidators[formName] = formValidator;
    formValidator.enableValidation();
  });
}
enableValidation(formsConfig);
*/


profileEditBtn.addEventListener('click', openProfilePopup); 
cardAddBtn.addEventListener('click', openCardPopup); 

profileEditFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

popups.forEach(popupElement => popupElement.addEventListener('mousedown', (evt) => {
  if (evt.target === popupElement || evt.target.classList.contains('popup__close-btn')) {
    closePopup(popupElement);
  }
}));