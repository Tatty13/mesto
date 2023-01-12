import './index.css';

import {profileEditBtn, cardAddBtn} from '../utils/constants.js';
import {setProfileInfoToTheInputs, createCard} from '../utils/utils.js';
import cardsData from '../utils/cardsData.js';
import formsConfig from '../utils/formsConfigData.js';

import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';



const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__desc'});


/**
 * @param {object} inputValues - key - input-name: value - input.value
 * @param {string} inputValues.name
 * @param {string} inputValues.job
 */
function handleProfileFormSubmit({'profile-name': name, 'profile-job': job}) {
  userInfo.setUserInfo(name, job);
  profilePopup.close();
}

const profilePopup = new PopupWithForm('.popup_content_edit-profile', handleProfileFormSubmit);
profilePopup.setEventListeners();



const imagePopup = new PopupWithImage('.popup_content_photo');
imagePopup.setEventListeners();

/**
 * @param {string} name - image title
 * @param {string} link - image url
 */
function handleCardImgClick(name, link) {
  imagePopup.open(name, link);
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

/**
 * @param {object} cardData 
 * @param {string} cardData.name - 'name' attribute value of input with image title
 * @param {string} cardData.link - name' attribute value of input with image url
 */
function handleCardFormSubmit({'card-name': name, 'card-link': link}) {
  const cardsSection = new Section({items: [{name, link}], renderer: renderCards}, '.cards__list');
  cardsSection.renderItems();
  cardPopup.close();
}

const cardPopup = new PopupWithForm('.popup_content_add-card', handleCardFormSubmit);
cardPopup.setEventListeners();



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


function openProfilePopup() {
  setProfileInfoToTheInputs(userInfo.getUserInfo());
  profilePopup.open();
}

function openCardPopup() {
  cardPopup.open();
}


profileEditBtn.addEventListener('click', openProfilePopup); 
cardAddBtn.addEventListener('click', openCardPopup); 