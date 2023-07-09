function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const closeBtn = document.querySelectorAll(".close");
const modalBtn = document.querySelectorAll(".modal-btn");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

/// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

const form = document.querySelector("form[name='reserve']");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const errorFields = document.querySelectorAll(".error-message");
  errorFields.forEach((field) => (field.textContent = ""));

  validate();
});


// Validation form
function validate() {
  const formData = document.querySelectorAll(".formData");

  const formDataValues = {};

  let isValid = true;

  formData.forEach((element) => {
    const input = element.querySelector("input, select");
    const name = input.name;
    const value = input.value;
    formDataValues[name] = value;
  });

  if (formDataValues.first.trim().length < 2) {
    isValid = false;
    displayErrorMessage("first", "Le prénom doit contenir au moins 2 caractères.");
    document.getElementById("first").classList.add("error-border");
  } else {
    document.getElementById("first").classList.remove("error-border");
  }

  if (formDataValues.last.trim().length < 2) {
    isValid = false;
    displayErrorMessage("last", "Le nom de famille doit contenir au moins 2 caractères.");
    document.getElementById("last").classList.add("error-border");
  } else {
    document.getElementById("last").classList.remove("error-border");
  }

  if (!isValidEmail(formDataValues.email)) {
    isValid = false;
    displayErrorMessage("email", "Veuillez entrer une adresse email valide.");
    document.getElementById("email").classList.add("error-border");
  } else {
    document.getElementById("email").classList.remove("error-border");
  }

  if (formDataValues.birthdate.length < 1) {
    isValid = false;
    displayErrorMessage("birthdate", "Veuillez entrer une date de naissance.");
    document.getElementById("birthdate").classList.add("error-border");
  } else {
    document.getElementById("birthdate").classList.remove("error-border");
  }

  if (isNaN(formDataValues.quantity) || formDataValues.quantity.length < 1) {
    isValid = false;
    displayErrorMessage("quantity", "Veuillez entrer une valeur numérique pour le nombre de concours.");
    document.getElementById("quantity").classList.add("error-border");
  } else {
    document.getElementById("quantity").classList.remove("error-border");
  }

  const locationInputs = document.getElementsByName("location");
  const locationChecked = Array.from(locationInputs).some((input) => input.checked);
  if (!locationChecked) {
    isValid = false;
    displayErrorMessage("location", "Veuillez sélectionner un lieu.");
  }

  if (!formDataValues.checkbox1) {
    isValid = false;
    displayErrorMessage("checkbox1", "Vous devez accepter les conditions générales.");
  }

  if (isValid) {
    return displaySuccessMessage();
  }
}


// Error Message
function displayErrorMessage(fieldName, errorMessage) {
  const errorField = document.getElementById(`${fieldName}-error`);
  const inputField = document.getElementById(fieldName);

  errorField.textContent = errorMessage;
  inputField.classList.add('error-border');
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Success Message
function displaySuccessMessage() {
  const formContainer = document.querySelector(".form-container");
  const successMessage = document.getElementById("success-message");

  successMessage.textContent = "Le formulaire a été soumis avec succès !";
  successMessage.style.display = "block";

  formContainer.classList.add("hideForm");

  return false;
}



