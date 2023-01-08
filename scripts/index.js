import {profileEditBtn, cardAddBtn, 
  profileEditFormElement, 
  cardFormElement, 
  inputCardNameElement, inputCardLinkElement,
  imgElement, imgHeadingElement} from './constants.js';
import {updateProfileInfo, setProfileInfoToTheInputs, getCardData, createCard} from './utils.js';

import Section from './Section.js';
import Popup from './Popup.js';
import FormValidator from './FormValidator.js';
import cardsData from './cardsData.js';
import formsConfig from './formsConfigData.js';


const profilePopup = new Popup('.popup_content_edit-profile');
profilePopup.setEventListeners();
const cardPopup = new Popup('.popup_content_add-card');
cardPopup.setEventListeners();
const imagePopup = new Popup('.popup_content_photo');
imagePopup.setEventListeners();

function openProfilePopup() {
  profileEditFormElement.reset();
  setProfileInfoToTheInputs();
  profilePopup.open();
}

function openCardPopup() {
  cardFormElement.reset();
  cardPopup.open();
}

function handleProfileFormSubmit() {
  updateProfileInfo();
  profilePopup.close();
}

function handleCardImgClick(name, link) {
  imgElement.src = link;
  imgElement.alt = name;
  imgHeadingElement.textContent = name;
  imagePopup.open();
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
  cardPopup.close();
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