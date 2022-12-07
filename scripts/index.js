import cardsData from './cardsData.js';

const profileInfoElement = document.querySelector('.profile__info');
const userNameElement = profileInfoElement.querySelector('.profile__name');
const userJobElement = profileInfoElement.querySelector('.profile__desc');

const cardsListElement = document.querySelector('.cards__list');
const cardTemplateItemElement = document.querySelector('.card-template').content.querySelector('.card');

/* -------- profile popup -------- */
const profilePopupElement = document.querySelector('.popup_content_edit-profile');
const editProfileFormElement =  profilePopupElement.querySelector('.form_type_edit-profile');
const inputProfileNameElement = editProfileFormElement.querySelector('.form__input_content_name');
const inputJobElement = editProfileFormElement.querySelector('.form__input_content_job');
/* -------- -------------- -------- */

/* -------- add-card popup -------- */
const addCardPopupElement = document.querySelector('.popup_content_add-card');
const addCardFormElement = addCardPopupElement.querySelector('.form_type_add-card');
const inputCardNameElement = addCardFormElement.querySelector('.form__input_content_card-name');
const inputCardLinkElement = addCardFormElement.querySelector('.form__input_content_card-link');
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


function openPopup(popupElement) {
  popupElement.classList.add('popup_open');
}

function closePopup(targetElement) {
  const popup = targetElement.closest('.popup');
  popup.classList.remove('popup_open');
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


function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
}

function isInputValid(inputElement) {
  return inputElement.validity.valid;
}

function isFormValid(inputList) {
  return !inputList.some(input => !isInputValid(input));
}

function toggleInputError(formElement, inputElement) {
  !isInputValid(inputElement) ? 
    showInputError(formElement, inputElement, inputElement.validationMessage) : 
    hideInputError(formElement, inputElement);
}


function makeSubmitBtnActive(submitBtnElement) {
 submitBtnElement.classList.remove('form__submit-btn_disabled');
}

function makeSubmitBtnDisabled(submitBtnElement) {
  submitBtnElement.classList.add('form__submit-btn_disabled');
}

function toggleSubmitBtnState(submitBtnElement, inputList) {
  isFormValid(inputList) ? 
    makeSubmitBtnActive(submitBtnElement) :
    makeSubmitBtnDisabled(submitBtnElement);
}


function setEventListeners(formElement, inputList, submitBtnElement) {
  toggleSubmitBtnState(submitBtnElement, inputList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleInputError(formElement, inputElement);
      toggleSubmitBtnState(submitBtnElement, inputList);
    });
  });
};


function handleProfileFormSubmit() {
  updateProfileInfo();
}

function handleCardFormSubmit() {
  const card = createCard(inputCardNameElement.value, inputCardLinkElement.value);
  prependCard(card, cardsListElement);
  addCardFormElement.reset();
}

const formSettings = {
  editProfile: {
    handleSubmit: handleProfileFormSubmit,
  },
  addCard: {
    handleSubmit: handleCardFormSubmit,
  }
}


function enableValidation(settings) {
  const forms = [...document.forms];

  forms.forEach(formElement => {
    const inputList = [...formElement.elements];
    const submitBtnElement = formElement.elements['submit-btn'];
    const {handleSubmit} = settings[formElement.name];

    setEventListeners(formElement, inputList, submitBtnElement);

    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (isFormValid(inputList)) {
        handleSubmit();
        closePopup(evt.target);
        toggleSubmitBtnState(submitBtnElement, inputList);
      }
    });
  })
}


function openProfilePopup() {
  setProfileInfoToTheInputs();
  openPopup(profilePopupElement);
}

function openCardPopup() {
  openPopup(addCardPopupElement);
}

function openImgPopup(targetElement) {
  setImgInfo(imgElement, imgHeadingElement, targetElement);
  openPopup(photoPopupElement);
}


/* ----------- default cards ----------- */
cardsData.forEach(card => prependCard(createCard(card.name, card.link), cardsListElement));
/* ----------- ----- ----------- */

setProfileInfoToTheInputs();
enableValidation(formSettings);

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

  if (targetElement.classList.contains('popup__close-btn')) {
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

  if (targetElement.classList.contains('popup')) {
    closePopup(targetElement);
    return;
  }
})

document.addEventListener('keydown', (evt) => {
  if (evt.code !== 'Escape') return;

  const popup = document.querySelector('.popup_open');
  if (popup) closePopup(popup);
})