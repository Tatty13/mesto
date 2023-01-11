import {inputProfileNameElement, inputJobElement} from './constants.js';
import Card from '../components/Card.js';


/**
 * 
 * @param {object} profileInfo
 * @param {string} profileInfo.name
 * @param {string} profileInfo.job
 */
function setProfileInfoToTheInputs({name, job}) {
  inputProfileNameElement.value = name;
  inputJobElement.value = job;
}


/**
 * @param {object} cardData - objects with image data: name and link;
 * @param {string} templateSelector - card template selector
 * @param {function} handleCardImgClick 
 * @returns 
 */
function createCard(cardData, templateSelector, handleCardImgClick) {
  const card = new Card(cardData, templateSelector, handleCardImgClick);
  const cardElem = card.generate();
  return cardElem;
}


export {setProfileInfoToTheInputs, createCard};