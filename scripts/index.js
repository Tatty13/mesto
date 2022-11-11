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

profileEditBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
editFormElement.addEventListener('submit', formSubmitHandler);