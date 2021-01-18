document.addEventListener("DOMContentLoaded", function () {
  console.log("Ready!!");
  getCountries();
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
