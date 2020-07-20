let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let hours = [
  "12",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
];

let now = new Date();
let day = days[now.getDay()];
let hour = hours[now.getHours()];
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let time = document.querySelector("#current-day");
time.innerHTML = `${day}, ${hour}:${minutes}`;

function searchCity(inputCity) {
  let apiKey = "093e071e943ff87f9fc6c8107074ad0a";
  let apiSource = "api.openweathermap.org/data/2.5/weather?q=";
  let apiUrl = `https://${apiSource}${inputCity}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayLocationTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-to-search").value;
  searchCity(inputCity);
}

function displayLocationTemp(response) {
  fahrenheitTemp = response.data.main.temp;
  highTemp = response.data.main.temp_max;
  lowTemp = response.data.main.temp_min;
  speedImperial = response.data.wind.speed;
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#emoji-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemp);
  document.querySelector("#highMajor").innerHTML = Math.round(highTemp);
  document.querySelector("#lowMajor").innerHTML = Math.round(lowTemp);
  document.querySelector("#percent").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#speed").innerHTML = Math.round(speedImperial);
  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", `http://openweathermap.org/img/wn/02d@2x.png`);
}

function getCurrent(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "093e071e943ff87f9fc6c8107074ad0a";
  let apiSource = "api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `https://${apiSource}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayLocationTemp);
}

function currentLocation(event) {
  navigator.geolocation.getCurrentPosition(getCurrent);
}

function displayCelciusTemp(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(
    ((fahrenheitTemp - 32) * 5) / 9
  );
  document.querySelector("#highMajor").innerHTML = Math.round(
    ((highTemp - 32) * 5) / 9
  );
  document.querySelector("#lowMajor").innerHTML = Math.round(
    ((lowTemp - 32) * 5) / 9
  );
  document.querySelector("#speed").innerHTML = Math.round(
    speedImperial * 1.609
  );
  document.querySelector("#speed-unit").innerHTML = "kph";
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemp);
  document.querySelector("#highMajor").innerHTML = Math.round(highTemp);
  document.querySelector("#lowMajor").innerHTML = Math.round(lowTemp);
  document.querySelector("#speed").innerHTML = Math.round(speedImperial);
  document.querySelector("#speed-unit").innerHTML = "mph";
}

let fahrenheitTemp = null;
let highTemp = null;
let lowTemp = null;
let speedImperial = null;

let celciusLink = document.querySelector("#unit-c");
celciusLink.addEventListener("click", displayCelciusTemp);

let fahrenheitLink = document.querySelector("#unit-f");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let showCity = document.querySelector("#city-search-form");
showCity.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentLocation);

searchCity("New York");
