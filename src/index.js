document.addEventListener("DOMContentLoaded", function () {
  console.log("Ready!!");
  getCountries();

  // const button = document.querySelector('#formCheckout')
  const form = document.forms["formCheckout"];
  form.addEventListener("submit", save);

  // const phone = form["txtPhone"];
  // phone.addEventListener("input", setInput);
  // console.log('button ', button.submit())
});

async function getCountries() {
  const response = await fetch("https://restcountries.eu/rest/v2/all");
  const json = await response.json();
  const countries = json.map((country) => country.name);

  const select = document.querySelector("#selCountry");

  countries.map((country) => {
    const option = document.createElement("option");
    option.innerHTML = country;
    select.appendChild(option);
  });
}

function save(e) {
  e.preventDefault();

  const {
    txtEmail,
    txtPhone,
    txtName,
    txtAddress,
    txtCity,
    selCountry,
    txtPostal,
  } = e.target;

  validate(txtEmail, "#errorEmail", "Enter your email");
  validate(txtPhone, "#errorPhone", "Enter your phone");
  validate(txtName, "#errorName", "Enter your name");
  validate(txtAddress, "#errorAddress", "Enter your adress");
  validate(txtCity, "#errorCity", "Enter your city");
  validate(selCountry, "#errorCountry", "Enter your country");
  validate(txtPostal, "#errorPostal", "Enter your postal code");

  const values = {
    email: txtEmail.value,
    phone: txtPhone.value,
    name: txtName.value,
    address: txtAddress.value,
    city: txtCity.value,
    country: selCountry.value,
    postal: txtPostal.value,
  };
  console.log("save:values ", values);
}

function shownError(name = "", message = "") {
  small = document.querySelector(name);
  small.innerHTML = message;
}

function validate(control = "", small = "", message = "") {
  // console.log('validate:control ', control, control.value)
  if (control && !control.value) {
    shownError(small, message);
    return;
  }
  shownError(small);
}

function setInput() {
  const { value, oldValue } = this;
  if (onlyNumbers(value)) {
    this.oldValue = value;
    this.oldSelectionStart = this.selectionStart;
    this.oldSelectionEnd = this.selectionEnd;
  } else if (this.hasOwnProperty("oldValue")) {
    this.value = oldValue;
    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
  } else {
    this.value = "";
  }
}

function onlyNumbers(value) {
  return /^\d*\.?\d*$/.test(value);
}