import {userNameElement, userJobElement, inputProfileNameElement, inputJobElement} from './constants.js';
import Card from './Card.js';


function getProfileInfo() {
  const profileInfo = {
    userName: userNameElement.textContent,
    userJob: userJobElement.textContent
  };
  return profileInfo;
}

function updateProfileInfo() {
  const name = inputProfileNameElement.value;
  const job = inputJobElement.value;

  userNameElement.textContent = name;
  userJobElement.textContent = job;
}

function setProfileInfoToTheInputs() {
  const profileInfo = getProfileInfo();
  inputProfileNameElement.value = profileInfo.userName;
  inputJobElement.value = profileInfo.userJob;
}


function getCardData(nameInput, linkInput) { 
  return { 
    name: nameInput.value, 
    link: linkInput.value 
  };   
} 

function createCard(cardData, templateSelector, handleCardImgClick) {
  const card = new Card(cardData, templateSelector, handleCardImgClick);
  const cardElem = card.generate();
  return cardElem;
}


export {updateProfileInfo, setProfileInfoToTheInputs, getCardData, createCard};