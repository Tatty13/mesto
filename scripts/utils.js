import {userNameElement, userJobElement, inputProfileNameElement, inputJobElement} from './constants.js';
import Card from './Card.js';


function getProfileInfo() {
  const profileInfo = {
    userName: userNameElement.textContent,
    userJob: userJobElement.textContent
  };
  return profileInfo;
}


/**
 * set values from the form inputs to the profile
 * @param {string} name - user name
 * @param {string} job - user job/occupation
 */
function updateProfileInfo(name, job) {
  userNameElement.textContent = name;
  userJobElement.textContent = job;
}

function setProfileInfoToTheInputs() {
  const profileInfo = getProfileInfo();
  inputProfileNameElement.value = profileInfo.userName;
  inputJobElement.value = profileInfo.userJob;
}


function createCard(cardData, templateSelector, handleCardImgClick) {
  const card = new Card(cardData, templateSelector, handleCardImgClick);
  const cardElem = card.generate();
  return cardElem;
}


export {updateProfileInfo, setProfileInfoToTheInputs, createCard};