const profileInfoElement = document.querySelector('.profile__info');
const userNameElement = profileInfoElement.querySelector('.profile__name');
const userJobElement = profileInfoElement.querySelector('.profile__desc');

const profileEditBtn = profileInfoElement.querySelector('.profile__edit-btn'); 
const cardAddBtn = document.querySelector('.profile__add-btn'); 


/* -------- profile popup -------- */
const profileEditFormElement =  document.querySelector('.form_type_edit-profile');
const inputProfileNameElement = profileEditFormElement.querySelector('.form__input_content_name');
const inputJobElement = profileEditFormElement.querySelector('.form__input_content_job');


export {userNameElement, userJobElement,
  inputProfileNameElement, inputJobElement, 
  profileEditBtn, cardAddBtn};