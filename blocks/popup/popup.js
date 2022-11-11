import { profileEditBtn, getProfileInfo, updateProfileInfo } from '../profile/__info/profile__info.js';

const popupElement = document.querySelector('.popup');
const closePopupBtn = popupElement.querySelector('.popup__close-btn');
const editFormElement =  popupElement.querySelector('.edit-form');
const inputNameElement = editFormElement.querySelector('.edit-form__input_content_name');
const inputJobElement = editFormElement.querySelector('.edit-form__input_content_job');

function openPopup() {
  let profileInfo = getProfileInfo();
  inputNameElement.value = profileInfo.userName;
  inputJobElement.value = profileInfo.userJob;

  popupElement.classList.add('popup_open');
}

function closePopup() {
  popupElement.classList.remove('popup_open');
}

function formSubmitHandler(evt) {
  evt.preventDefault(); 
  updateProfileInfo(inputNameElement, inputJobElement);
  closePopup();
}

profileEditBtn.addEventListener('click', openPopup);
closePopupBtn.addEventListener('click', closePopup);
editFormElement.addEventListener('submit', formSubmitHandler);

export {};