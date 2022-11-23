const profileInfoElement = document.querySelector('.profile__info');
const userNameElement = profileInfoElement.querySelector('.profile__name');
const userJobElement = profileInfoElement.querySelector('.profile__desc');
const profileEditBtn = profileInfoElement.querySelector('.profile__edit-btn');

const cardsListElement = document.querySelector('.cards__list');
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


function getCardData() {
  return {
    name: inputCardNameElement.value,
    link: inputCardLinkElement.value
  };  
}

function toggleLikeBtn(evt) {
  evt.target.classList.toggle('card__like-btn_active');
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}


function setImgInfo(currImg) {
  imgElement.src = currImg.src;
  imgElement.alt = currImg.alt;
  imgHeadingElement.textContent = currImg.alt;
}


function openPopup(popupElement) {
  if (popupElement === profilePopupElement) {
    const profileInfo = getProfileInfo();
    inputProfileNameElement.value = profileInfo.userName;
    inputJobElement.value = profileInfo.userJob;
  }

  if (popupElement === addCardPopupElement) {
    inputCardNameElement.value = '';
    inputCardLinkElement.value = '';
  }

  popupElement.classList.add('popup_open');
}

function closePopup(evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_open');
}


function createCard(cardData) {
  const cardTemplate = cardsListElement.querySelector('.cards__template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImgElement = cardElement.querySelector('.card__img');
  cardImgElement.src = cardData.link;
  cardImgElement.alt = cardData.name;
  
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const likeBtn = cardElement.querySelector('.card__like-btn');
  const deleteBtn = cardElement.querySelector('.card__delete-btn');

  likeBtn.addEventListener('click', toggleLikeBtn);
  deleteBtn.addEventListener('click', deleteCard);
  cardImgElement.addEventListener('click', (evt) => {
    setImgInfo(evt.target);
    openPopup(photoPopupElement);
  });

  cardsListElement.prepend(cardElement);
}


function editProfileFormSubmitHandler(evt) {
  evt.preventDefault(); 
  updateProfileInfo();
  closePopup(evt);
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const cardData = getCardData();
  createCard(cardData);
  closePopup(evt);
}


/* ----------- default cards ----------- */

const cardsData = [
  {
    name: 'Шлиссельбург',
    link: './images/place-oreshek.jpg'
  },
  {
    name: 'Рускеала, Карелия',
    link: './images/place-ruskeala.jpg'
  },
  {
    name: 'Ленинградская область',
    link: './images/place-yastrebinoe.jpg'
  },
  {
    name: 'Санкт-Петербур',
    link: './images/place-spb.jpg'
  },
  {
    name: 'Великие Луки',
    link: './images/place-velikie-luki.jpg'
  },
  {
    name: 'Вологодская область',
    link: './images/place-vologodskaya.jpg'
  },
]

cardsData.forEach(card => createCard(card));

/* ----------- ----- ----------- */


profileEditBtn.addEventListener('click', () => openPopup(profilePopupElement));
addCardBtn.addEventListener('click', () => openPopup(addCardPopupElement));

closePopupBtns.forEach(btn => btn.addEventListener('click', closePopup));

editProfileFormElement.addEventListener('submit', editProfileFormSubmitHandler);
addCardFormElement.addEventListener('submit', addCardFormSubmitHandler);