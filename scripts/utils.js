function clearInputErrors(popupElement, errorClass) {
  const errorElements = popupElement.querySelectorAll(`.${errorClass}`);
  errorElements.forEach(error => error.textContent = '');
}

function handleEscapeKey(evt) {
  if (evt.code !== 'Escape') return;
  const popupElement = document.querySelector('.popup_open');
  closePopup(popupElement);
  clearInputErrors(popupElement, 'form__input-error_active');
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_open');
  document.addEventListener('keydown', handleEscapeKey);
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_open');
  document.removeEventListener('keydown', handleEscapeKey);
}

export {openPopup, closePopup, clearInputErrors};