document.addEventListener("DOMContentLoaded", function () {
  getCountries();

  form();

  cart();
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

  let local = localStorage.getItem("checkout");
  if (!local) {
    return;
  }

  const { country = "" } = JSON.parse(local);
  select.value = country;
}

function form() {
  const form = document.forms["formCheckout"];
  form.addEventListener("submit", save);
  getLocalStorage(form);

  const btnSave = document.querySelector("#btnSave");
  const country = form["selCountry"];
  country.addEventListener("change", () => btnSave.click());
}

function cart() {
  const [counter1, counter2] = document.querySelectorAll(".counter");
  const [btnMinus1, btnSum1, btnMinus2, btnSum2] = document.querySelectorAll(
    ".secondary"
  );

  btnMinus1.addEventListener("click", () => minus(counter1));
  btnSum1.addEventListener("click", () => sum(counter1));

  btnMinus2.addEventListener("click", () => minus(counter2));
  btnSum2.addEventListener("click", () => sum(counter2));
}

function save(e) {
  e.preventDefault();

  const { email, phone, name, address, city, country, postal } = getControls(
    e.target
  );

  const validates = [
    {
      control: email,
      error: "#errorEmail",
      message: "Enter your email",
      validate: false,
      value: "",
    },
    {
      control: phone,
      error: "#errorPhone",
      message: "Enter your phone",
      validate: false,
      value: "",
    },
    {
      control: name,
      error: "#errorName",
      message: "Enter your name",
      validate: false,
      value: "",
    },
    {
      control: address,
      error: "#errorAddress",
      message: "Enter your adress",
      validate: false,
      value: "",
    },
    {
      control: city,
      error: "#errorCity",
      message: "Enter your city",
      validate: false,
      value: "",
    },
    {
      control: country,
      error: "#errorCountry",
      message: "Enter your country",
      validate: false,
      value: "",
    },
    {
      control: postal,
      error: "#errorPostal",
      message: "Enter your postal code",
      validate: false,
      value: "",
    },
  ];
  validates.map(validate);

  const validatesAll =
    validates.filter((line) => line.validate).length === validates.length;

  if (!validatesAll) {
    return;
  }
  document.querySelector("#btnAlert").click();

  const { checked } = document.querySelector("#chkSave");
  console.info("save:checked ", checked);
  if (!checked) {
    return;
  }

  const values = {
    email: txtEmail.value,
    phone: txtPhone.value,
    name: txtName.value,
    address: txtAddress.value,
    city: txtCity.value,
    country: selCountry.value,
    postal: txtPostal.value,
  };
  saveLocalStorage(values);
}

function validate(line) {
  const { control = "", error = "", message = "" } = line;
  if (control && !control?.value) {
    shownError(error, message);
    line.validate = false;
  } else {
    shownError(error);
    line.validate = true;
    line.value = control?.value;
  }
}

function shownError(name = "", message = "") {
  small = document.querySelector(name);
  small.innerHTML = message;
}

function getControls(form) {
  const {
    txtEmail: email,
    txtPhone: phone,
    txtName: name,
    txtAddress: address,
    txtCity: city,
    selCountry: country,
    txtPostal: postal,
  } = form;
  return { email, phone, name, address, city, country, postal };
}

function getLocalStorage(form) {
  let local = localStorage.getItem("checkout");
  if (!local) {
    return;
  }

  const { email, phone, name, address, city, country, postal } = getControls(
    form
  );
  local = JSON.parse(local);

  email.value = local.email || "";
  phone.value = local.phone || "";
  name.value = local.name || "";
  address.value = local.address || "";
  city.value = local.city || "";
  country.value = local.country || "";
  postal.value = local.postal || "";
}

function saveLocalStorage(value) {
  localStorage.setItem("checkout", JSON.stringify(value));
}

function minus(counter) {
  let value = Number(counter.innerHTML);
  if (value <= 1) {
    value = 1;
  } else {
    value -= 1;
  }
  counter.innerHTML = String(value);
  calculate();
}

function sum(counter) {
  let value = Number(counter.innerHTML);
  if (value >= 100) {
    value = 100;
  } else {
    value += 1;
  }
  counter.innerHTML = String(value);
  calculate();
}

function calculate() {
  const [ofert1, ofert2] = document.querySelectorAll(".ofert .value");
  const [counter1, counter2] = document.querySelectorAll(".counter");
  const shipping = Number(document.querySelector(".shipping").innerHTML);

  const products = [
    { id: 1, price: Number(ofert1.innerHTML) * Number(counter1.innerHTML) },
    { id: 2, price: Number(ofert2.innerHTML) * Number(counter2.innerHTML) },
  ];

  const total = document.querySelector(".total");
  const amount = Number(
    Number(products.reduce((line, { price }) => (price += line.price))).toFixed(
      2
    )
  );
  total.innerHTML = Number(amount + shipping).toFixed(2);
}
