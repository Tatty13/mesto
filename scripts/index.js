import cardsData from './cardsData.js';

const profileInfoElement = document.querySelector('.profile__info');
const userNameElement = profileInfoElement.querySelector('.profile__name');
const userJobElement = profileInfoElement.querySelector('.profile__desc');
const profileEditBtn = profileInfoElement.querySelector('.profile__edit-btn');

const cardsListElement = document.querySelector('.cards__list');
const cardTemplateItemElement = document.querySelector('.card-template').content.querySelector('.card');
const addCardBtn = document.querySelector('.profile__add-btn');

const closePopupBtns = document.querySelectorAll('.popup__close-btn');

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


function toggleLikeBtn(evt) {
  evt.target.classList.toggle('card__like-btn_active');
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}


function setImgInfo(targetImg, targetHeading, currImg) {
  targetImg.src = currImg.src;
  targetImg.alt = currImg.alt;
  targetHeading.textContent = currImg.alt;
}


function openPopup(popupElement) {
  popupElement.classList.add('popup_open');
}

function closePopup(evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_open');
}


function createCard(cardName, cardLink) {
  const cardElement = cardTemplateItemElement.cloneNode(true);
  const cardImgElement = cardElement.querySelector('.card__img');
  cardImgElement.src = cardLink;
  cardImgElement.alt = cardName;
  
  cardElement.querySelector('.card__title').textContent = cardName;

  const likeBtn = cardElement.querySelector('.card__like-btn');
  const deleteBtn = cardElement.querySelector('.card__delete-btn');

  likeBtn.addEventListener('click', toggleLikeBtn);
  deleteBtn.addEventListener('click', deleteCard);
  cardImgElement.addEventListener('click', openImgPopup);

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

function toggleSubmitBtnState(submitBtnElement, inputList) {
  isFormValid(inputList) ? 
    submitBtnElement.classList.remove('form__submit-btn_disabled') :
    submitBtnElement.classList.add('form__submit-btn_disabled');
}

function setEventListeners(formElement) {
  const inputList = [...formElement.querySelectorAll('.form__input')];
  const submitBtnElement = formElement.querySelector('.form__submit-btn');
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

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const card = createCard(inputCardNameElement.value, inputCardLinkElement.value);
  prependCard(card, cardsListElement);
  closePopup(evt);
}

const formSettings = {
  editProfile: {
    formElement: editProfileFormElement,
    handleSubmit: handleProfileFormSubmit,
  }
}


function enableValidation(settings) {
  const {formElement, handleSubmit} = settings;
  setEventListeners(formElement);
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (isFormValid([...formElement.elements])) {
      handleSubmit();
      closePopup(evt);
    }
  });
}


function openProfilePopup() {
  const profileInfo = getProfileInfo();
  inputProfileNameElement.value = profileInfo.userName;
  inputJobElement.value = profileInfo.userJob;
  enableValidation(formSettings.editProfile);
  openPopup(profilePopupElement);
}

function openCardPopup() {
  addCardFormElement.reset();
  openPopup(addCardPopupElement);
}

function openImgPopup(evt) {
  setImgInfo(imgElement, imgHeadingElement, evt.target);
  openPopup(photoPopupElement);
}


/* ----------- default cards ----------- */
cardsData.forEach(card => prependCard(createCard(card.name, card.link), cardsListElement));
/* ----------- ----- ----------- */


profileEditBtn.addEventListener('click', openProfilePopup);
addCardBtn.addEventListener('click', openCardPopup);

closePopupBtns.forEach(btn => btn.addEventListener('click', closePopup));

addCardFormElement.addEventListener('submit', addCardFormSubmitHandler);