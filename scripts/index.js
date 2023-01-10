import {profileEditBtn, cardAddBtn} from './constants.js';
import {updateProfileInfo, setProfileInfoToTheInputs, createCard} from './utils.js';
import cardsData from './cardsData.js';
import formsConfig from './formsConfigData.js';

import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import FormValidator from './FormValidator.js';



const profilePopup = new PopupWithForm('.popup_content_edit-profile', handleProfileFormSubmit);
profilePopup.setEventListeners();
const cardPopup = new PopupWithForm('.popup_content_add-card', handleCardFormSubmit);
cardPopup.setEventListeners();


function openProfilePopup() {
  setProfileInfoToTheInputs();
  profilePopup.open();
}

function openCardPopup() {
  cardPopup.open();
}


/**
 * @param {object} inputValues - key - input-name: value - input.value
 * @param {string} inputValues.name
 * @param {string} inputValues.job
 */
function handleProfileFormSubmit({'profile-name': name, 'profile-job': job}) {
  updateProfileInfo(name, job);
  profilePopup.close();
}


/**
 * @param {string} name - image title
 * @param {string} link - image url
 * @todo optimize obj {name, link}
 */
function handleCardImgClick(name, link) {
  const imagePopup = new PopupWithImage({name: name, link: link}, '.popup_content_photo');
  imagePopup.setEventListeners();
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

function handleCardFormSubmit({'card-name': name, 'card-link': link}) {
  const cardsSection = new Section({items: [{name, link}], renderer: renderCards}, '.cards__list');
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