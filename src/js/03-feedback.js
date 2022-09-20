import throttle from 'lodash.throttle';

const FEEDBACK_ENUM = 'feedback-form-state';
const UPDATE_FREQUENCY = 500;
const formElement = document.querySelector('form');
(window.onload = () => {
  const formData = checkDataInCache();
  if (!formData) return;
  Object.keys(formData).forEach(
    elementName =>
      (formElement.elements[elementName].value = formData[elementName])
  );
})();
const saveForm = form => {
  localStorage.setItem(FEEDBACK_ENUM, JSON.stringify(form));
};

const clearForm = () => {
  localStorage.removeItem(FEEDBACK_ENUM);
  formElement.reset();
};
const parseFormElements = target => {
  const {
    elements: {
      email: { value: email },
      message: { value: message },
    },
  } = target;
  return { email, message };
};
const onFormChange = e => {
  try {
    const formObject = parseFormElements(e.currentTarget);
    saveForm(formObject);
  } catch (err) {
    // console.error(err);
  }
};
const handleSubmit = event => {
  event.preventDefault();
  console.log(parseFormElements(event.currentTarget));
  clearForm();
};
const throttled = throttle(onFormChange, UPDATE_FREQUENCY);

function checkDataInCache() {
  return JSON.parse(localStorage.getItem(FEEDBACK_ENUM)) || null;
}

formElement.addEventListener('input', throttled);
formElement.addEventListener('submit', handleSubmit);
