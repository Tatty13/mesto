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

function openProfilePopup() {
  const profileInfo = getProfileInfo();
  inputProfileNameElement.value = profileInfo.userName;
  inputJobElement.value = profileInfo.userJob;
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


function editProfileFormSubmitHandler(evt) {
  evt.preventDefault(); 
  updateProfileInfo();
  closePopup(evt);
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const card = createCard(inputCardNameElement.value, inputCardLinkElement.value);
  prependCard(card, cardsListElement);
  closePopup(evt);
}

/* ----------- default cards ----------- */
cardsData.forEach(card => prependCard(createCard(card.name, card.link), cardsListElement));
/* ----------- ----- ----------- */


profileEditBtn.addEventListener('click', openProfilePopup);
addCardBtn.addEventListener('click', openCardPopup);

closePopupBtns.forEach(btn => btn.addEventListener('click', closePopup));

editProfileFormElement.addEventListener('submit', editProfileFormSubmitHandler);
addCardFormElement.addEventListener('submit', addCardFormSubmitHandler);