const profileEditBtn = document.querySelector('.profile__edit-btn'); 
const cardAddBtn = document.querySelector('.profile__add-btn'); 


/* -------- profile popup -------- */
const profileEditFormElement =  document.querySelector('.form_type_edit-profile');
const inputProfileNameElement = profileEditFormElement.querySelector('.form__input_content_name');
const inputJobElement = profileEditFormElement.querySelector('.form__input_content_job');


export {
  inputProfileNameElement, inputJobElement, 
  profileEditBtn, cardAddBtn
};