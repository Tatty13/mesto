const profileInfoElement = document.querySelector('.profile__info');
const userNameElement = profileInfoElement.querySelector('.profile__name');
const userJobElement = profileInfoElement.querySelector('.profile__desc');
const profileEditBtn = profileInfoElement.querySelector('.profile__edit-btn');

function getProfileInfo() {
  const profileInfo = {};
  profileInfo.userName = userNameElement.textContent;
  profileInfo.userJob = userJobElement.textContent;
  return profileInfo;
}

function updateProfileInfo() {
  const name = inputNameElement.value;
  const job = inputJobElement.value;

  userNameElement.textContent = name;
  userJobElement.textContent = job;
}


const popupElement = document.querySelector('.popup');
const closePopupBtn = popupElement.querySelector('.popup__close-btn');
const editFormElement =  popupElement.querySelector('.edit-form');
const inputNameElement = editFormElement.querySelector('.edit-form__input_content_name');
const inputJobElement = editFormElement.querySelector('.edit-form__input_content_job');

function openPopup() {
  const profileInfo = getProfileInfo();
  inputNameElement.value = profileInfo.userName;
  inputJobElement.value = profileInfo.userJob;

  popupElement.classList.add('popup_open');
}

function closePopup() {
  popupElement.classList.remove('popup_open');
}

function formSubmitHandler(evt) {
  evt.preventDefault(); 
  updateProfileInfo();
  closePopup();
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


profileEditBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
editFormElement.addEventListener('submit', formSubmitHandler);