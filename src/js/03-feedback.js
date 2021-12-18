import throttle from 'lodash.throttle';

const FORM_STATE_KEY = 'feedback-form-state';

const el = {
  form: document.querySelector('.feedback-form'),
  mail: document.querySelector('.feedback-form input[name="email"]'),
  text: document.querySelector('.feedback-form textarea[name="message"]'),
  btn: document.querySelector('.feedback-form button'),
};

const trotlledSaveText = throttle((e) => onFormChanged(e), 500);

el.form.addEventListener('input', trotlledSaveText);

function onSubmit(e) {
    e.preventDefault();

    localStorage.removeItem(FORM_STATE_KEY);
    el.form.reset();
}

el.form.addEventListener('submit', onSubmit);

let newFormValues = {
    email: '',
    message: ''
};

function onFormChanged(e) {
  if (e.srcElement.name === 'message') {
    newFormValues.message = e.srcElement.value;
  }

  if (e.srcElement.name === 'email') {
    newFormValues.email = e.srcElement.value;
  }

  localStorage.setItem(FORM_STATE_KEY, JSON.stringify(newFormValues));
}

function populateDataOnFormFromStorage() {
  try {
    let data = localStorage.getItem(FORM_STATE_KEY);
    let dataToPopulate = JSON.parse(data);

    el.mail.value = dataToPopulate.email;
    el.text.value = dataToPopulate.message;

    newFormValues = dataToPopulate;
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

populateDataOnFormFromStorage();
