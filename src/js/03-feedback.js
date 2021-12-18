import throttle from 'lodash.throttle';

const FORM_STATE_KEY = 'feedback-form-state';

const el = {
  form: document.querySelector('.feedback-form'),
  mail: document.querySelector('.feedback-form input[name="email"]'),
  text: document.querySelector('.feedback-form textarea[name="message"]'),
};

function onFormChanged(e) {
  setValueForInput('email', e);
  setValueForInput('message', e);

  localStorage.setItem(FORM_STATE_KEY, JSON.stringify(newFormValues));
}

function setValueForInput(name, event) {
  if (event.srcElement.name === name) {
    newFormValues[name] = event.srcElement.value;
  }
}

const throtlledOnFormChanged = throttle(e => onFormChanged(e), 500);
el.form.addEventListener('input', throtlledOnFormChanged);

let newFormValues = {
  email: '',
  message: '',
};

function populateDataOnFormFromStorage() {
  try {
    let data = localStorage.getItem(FORM_STATE_KEY);
    if (!data) {
      return;
    }

    newFormValues = JSON.parse(data);

    el.mail.value = newFormValues.email;
    el.text.value = newFormValues.message;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

populateDataOnFormFromStorage();

function onSubmit(e) {
  e.preventDefault();

  el.form.reset();
  localStorage.removeItem(FORM_STATE_KEY);

  newFormValues.email = '';
  newFormValues.message = '';
}

el.form.addEventListener('submit', onSubmit);
