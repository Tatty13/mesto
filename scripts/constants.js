const profileInfoElement = document.querySelector('.profile__info');
const userNameElement = profileInfoElement.querySelector('.profile__name');
const userJobElement = profileInfoElement.querySelector('.profile__desc');

const profileEditBtn = profileInfoElement.querySelector('.profile__edit-btn'); 
const cardAddBtn = document.querySelector('.profile__add-btn'); 


/* -------- profile popup -------- */
const profileEditFormElement =  document.querySelector('.form_type_edit-profile');
const inputProfileNameElement = profileEditFormElement.querySelector('.form__input_content_name');
const inputJobElement = profileEditFormElement.querySelector('.form__input_content_job');


/* -------- add-card popup -------- */
const cardFormElement = document.querySelector('.form_type_add-card');
const inputCardNameElement = cardFormElement.querySelector('.form__input_content_card-name');
const inputCardLinkElement = cardFormElement.querySelector('.form__input_content_card-link');


export {userNameElement, userJobElement, 
  profileEditBtn, cardAddBtn,
  profileEditFormElement, inputProfileNameElement, inputJobElement,
  cardFormElement, 
  inputCardNameElement, inputCardLinkElement};