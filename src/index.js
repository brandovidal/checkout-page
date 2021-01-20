document.addEventListener("DOMContentLoaded", function () {
  getCountries();

  const form = document.forms["formCheckout"];
  form.addEventListener("submit", save);

  const button = document.querySelector("#btnSave");
  const country = form["selCountry"];
  country.addEventListener("change", function () {
    button.click();
  });
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

  const validates = [
    {
      control: txtEmail,
      error: "#errorEmail",
      message: "Enter your email",
      validate: false,
    },
    {
      control: txtPhone,
      error: "#errorPhone",
      message: "Enter your phone",
      validate: false,
    },
    {
      control: txtName,
      error: "#errorName",
      message: "Enter your name",
      validate: false,
    },
    {
      control: txtAddress,
      error: "#errorAddress",
      message: "Enter your adress",
      validate: false,
    },
    {
      control: txtCity,
      error: "#errorCity",
      message: "Enter your city",
      validate: false,
    },
    {
      control: selCountry,
      error: "#errorCountry",
      message: "Enter your country",
      validate: false,
    },
    {
      control: txtPostal,
      error: "#errorPostal",
      message: "Enter your postal code",
      validate: false,
    },
  ];

  validates.map(validate);

  const validatesAll = validates.filter((line) => line.validate).length === validates.length;
  // const validatesAll = true;
  console.info("save:validatesAll ", validatesAll);

  if (!validatesAll) {
    return;
  }
  document.querySelector("#btnAlert").click();

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

function validate(line) {
  const { control = "", error = "", message = "" } = line;
  // console.log('validate:control ', control, this)
  if (control && !control?.value) {
    shownError(error, message);
    line.validate = false;
  } else {
    shownError(error);
    line.validate = true;
  }
}

function shownError(name = "", message = "") {
  small = document.querySelector(name);
  small.innerHTML = message;
}

function setInput() {
  const { value, oldValue } = this;
  console.info("setInput ", value, oldValue);
  console.info("setInput:hasOwnProperty ", this.hasOwnProperty("oldValue"));
  // const only = onlyNumbers(value)
  // console.info('setInput:only ', only)

  // if (only) {
  //   this.oldValue = value;
  //   this.oldSelectionStart = this.selectionStart;
  //   this.oldSelectionEnd = this.selectionEnd;
  // } else if (this.hasOwnProperty("oldValue")) {
  //   this.value = oldValue;
  //   this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
  // } else {
  //   this.value = "";
  // }
}

function onlyNumbers(value) {
  return /^\d*\.?\d*$/.test(value);
}
