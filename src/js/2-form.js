document.addEventListener('DOMContentLoaded', () => {
  const formData = { email: "", message: "" };

  const savedData = JSON.parse(localStorage.getItem("feedback-form-state")) || formData;

  const emailInput = document.querySelector('[name="email"]');
  emailInput.value = savedData.email;

  const messageTextarea = document.querySelector('[name="message"]');
  messageTextarea.value = savedData.message;

  emailInput.classList.add('input-field');
  messageTextarea.classList.add('textarea-field');

  document.querySelectorAll('label').forEach(label => {
    label.classList.add('label-field');
  });

  const submitButton = document.querySelector('.feedback-form button[type="submit"]');
  submitButton.classList.add('submit-button');

  emailInput.setAttribute('placeholder', 'Type your email');
  messageTextarea.setAttribute('placeholder', 'Type your message');

  emailInput.placeholder = '';
  messageTextarea.placeholder = '';

  function handleFocus(event) {
    const input = event.target;
    if (input.value.trim() === '') {
      input.setAttribute('placeholder', input === emailInput ? 'Type your email' : 'Type your message');
    }
    input.classList.add('focused-input'); 
  }

  function handleBlur(event) {
    const input = event.target;
    if (input.value.trim() === '') {
      input.setAttribute('placeholder', ''); 
    }
    input.classList.remove('focused-input'); 
  }

  emailInput.addEventListener('focus', handleFocus);
  emailInput.addEventListener('blur', handleBlur);

  messageTextarea.addEventListener('focus', handleFocus);
  messageTextarea.addEventListener('blur', handleBlur);

  document.querySelector('.feedback-form').addEventListener('input', event => {
    formData[event.target.name] = event.target.value.trim();
    localStorage.setItem("feedback-form-state", JSON.stringify(formData)); 
  });

  document.querySelector('.feedback-form').addEventListener('submit', event => {
    event.preventDefault();

    if (!formData.email || !formData.message) {
      alert("Заповніть, будь ласка, всі поля!"); 
      return;
    }

    console.log("Форма відправлена:", formData);

    localStorage.removeItem("feedback-form-state");
    document.querySelector('.feedback-form').reset();
  });
});
