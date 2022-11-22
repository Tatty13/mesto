const profileInfoElement = document.querySelector('.profile__info');
const userNameElement = profileInfoElement.querySelector('.profile__name');
const userJobElement = profileInfoElement.querySelector('.profile__desc');
const profileEditBtn = profileInfoElement.querySelector('.profile__edit-btn');

const profilePopupElement = document.querySelector('.popup_content_edit-profile');
const editProfileFormElement =  profilePopupElement.querySelector('.form_type_edit-profile');
const inputProfileNameElement = editProfileFormElement.querySelector('.form__input_content_name');
const inputJobElement = editProfileFormElement.querySelector('.form__input_content_job');

const closePopupBtns = document.querySelectorAll('.popup__close-btn');


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

function openPopup(popupElement) {
  if (popupElement === profilePopupElement) {
    const profileInfo = getProfileInfo();
    inputProfileNameElement.value = profileInfo.userName;
    inputJobElement.value = profileInfo.userJob;
  }
  popupElement.classList.add('popup_open');
}

function closePopup(evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_open');
}

function formSubmitHandler(evt) {
  evt.preventDefault(); 
  updateProfileInfo();
  closePopup(evt);
}


/* ----------- cards ----------- */

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

const cardsListElement = document.querySelector('.cards__list');
const addCardBtn = document.querySelector('.profile__add-btn');

const addCardPopupElement = document.querySelector('.popup_content_add-card');
const addCardFormElement = addCardPopupElement.querySelector('.form_type_add-card');
const inputCardNameElement = addCardFormElement.querySelector('.form__input_content_card-name');
const inputCrdLinkElement = addCardFormElement.querySelector('.form__input_content_card-link');


function createCard(cardData) {
  const cardTemplate = cardsListElement.querySelector('.cards__template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImgElement = cardElement.querySelector('.card__img');
  cardImgElement.src = cardData.link;
  cardImgElement.alt = cardData.name;
  
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardsListElement.prepend(cardElement);
}

cardsData.forEach(card => createCard(card));

/* ----------- ----- ----------- */


profileEditBtn.addEventListener('click', () => openPopup(profilePopupElement));
addCardBtn.addEventListener('click', () => openPopup(addCardPopupElement));

closePopupBtns.forEach(btn => btn.addEventListener('click', closePopup));

editProfileFormElement.addEventListener('submit', formSubmitHandler);