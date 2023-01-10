import {inputProfileNameElement, inputJobElement} from './constants.js';
import Card from './Card.js';


function setProfileInfoToTheInputs({name, job}) {
  inputProfileNameElement.value = name;
  inputJobElement.value = job;
}


function createCard(cardData, templateSelector, handleCardImgClick) {
  const card = new Card(cardData, templateSelector, handleCardImgClick);
  const cardElem = card.generate();
  return cardElem;
}


export {setProfileInfoToTheInputs, createCard};